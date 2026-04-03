"use client";

import type { GalleryImage } from "@/lib/site-content";

import Image from "next/image";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { createPortal } from "react-dom";

const SLIDE_TRANSITION_MS = 420;

function LightboxArrow({ direction }: { direction: "next" | "prev" }) {
  return direction === "prev" ? (
    <svg aria-hidden className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M14.5 5.5 8 12l6.5 6.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  ) : (
    <svg aria-hidden className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M9.5 5.5 16 12l-6.5 6.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function LightboxSlide({
  image,
  mode,
}: {
  image: GalleryImage;
  mode: "current" | "enter-next" | "enter-prev" | "exit-next" | "exit-prev";
}) {
  const modeClassName =
    mode === "enter-next"
      ? "lightbox-slide-enter-next"
      : mode === "enter-prev"
        ? "lightbox-slide-enter-prev"
        : mode === "exit-next"
          ? "lightbox-slide-exit-next"
          : mode === "exit-prev"
            ? "lightbox-slide-exit-prev"
            : "";

  return (
    <div className={`absolute inset-0 flex items-center justify-center p-4 sm:p-6 ${modeClassName}`}>
      <div className="relative h-full w-full">
        <Image
          alt={image.alt}
          className="object-contain select-none"
          fill
          sizes="92vw"
          src={image.src}
        />
      </div>
    </div>
  );
}

export function LightboxGallery({
  images,
  title,
}: {
  images: GalleryImage[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const transitionTimerRef = useRef<number | null>(null);
  const canUsePortal = typeof document !== "undefined";

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const clearTransition = () => {
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
  };

  function handleOpen(index: number) {
    clearTransition();
    setPreviousIndex(null);
    setActiveIndex(index);
  }

  function handleClose() {
    clearTransition();
    setPreviousIndex(null);
    setActiveIndex(null);
  }

  function transitionTo(nextIndex: number, nextDirection: 1 | -1) {
    if (activeIndex === null || images.length <= 1 || nextIndex === activeIndex) {
      return;
    }

    clearTransition();

    setDirection(nextDirection);
    setPreviousIndex(activeIndex);
    setActiveIndex(nextIndex);

    transitionTimerRef.current = window.setTimeout(() => {
      setPreviousIndex(null);
      transitionTimerRef.current = null;
    }, SLIDE_TRANSITION_MS);
  }

  function handleNavigate(step: 1 | -1) {
    if (activeIndex === null || images.length <= 1) {
      return;
    }

    transitionTo((activeIndex + step + images.length) % images.length, step);
  }

  function handleJumpTo(index: number) {
    if (activeIndex === null || index === activeIndex) {
      return;
    }

    transitionTo(index, index > activeIndex ? 1 : -1);
  }

  const onCloseFromEffect = useEffectEvent(() => {
    handleClose();
  });

  const onNavigateFromEffect = useEffectEvent((step: 1 | -1) => {
    handleNavigate(step);
  });

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    document.body.classList.add("lightbox-locked");

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseFromEffect();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNavigateFromEffect(1);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onNavigateFromEffect(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("lightbox-locked");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  const currentImage = activeIndex !== null ? images[activeIndex] : null;
  const previousImage = previousIndex !== null ? images[previousIndex] : null;
  const activeDisplayIndex = activeIndex ?? 0;

  return (
    <>
      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {images.map((image, index) => (
          <button
            className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden bg-neutral-200 text-left"
            key={image.src}
            onClick={() => handleOpen(index)}
            type="button"
          >
            <Image
              alt={image.alt || title}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              fill
              sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 100vw"
              src={image.src}
            />
            <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/12" />
          </button>
        ))}
      </div>

      {canUsePortal && currentImage
        ? createPortal(
            <div
              aria-label={`${title} galéria`}
              aria-modal="true"
              className="fixed inset-0 z-[120] flex items-center justify-center px-3 py-5 sm:px-6 sm:py-8"
              role="dialog"
            >
              <button
                aria-label="Zatvoriť galériu"
                className="lightbox-overlay-enter absolute inset-0 bg-black/88"
                onClick={handleClose}
                type="button"
              />

              <div className="relative z-10 w-full max-w-[1440px]">
                <div className="mb-4 flex items-center justify-between gap-4 text-white">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">
                      Galéria
                    </p>
                    <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-white">
                      {title}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="text-sm font-medium text-white/68">
                      {activeDisplayIndex + 1} / {images.length}
                    </p>
                    <button
                      aria-label="Zatvoriť galériu"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/14 bg-white/6 text-white transition-colors hover:bg-white/12"
                      onClick={handleClose}
                      type="button"
                    >
                      <svg aria-hidden className="h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <path
                          d="m6 6 12 12M18 6 6 18"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="1.8"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="relative w-[95vw] sm:flex sm:w-full sm:items-center sm:gap-4">
                  <button
                    aria-label="Predchádzajúca fotografia"
                    className="absolute left-3 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/14 bg-black/38 text-white backdrop-blur-sm transition-colors hover:bg-black/54 disabled:opacity-40 sm:static sm:h-12 sm:w-12 sm:shrink-0 sm:translate-y-0 sm:bg-white/6 sm:backdrop-blur-none sm:hover:bg-white/12"
                    onClick={() => handleNavigate(-1)}
                    type="button"
                  >
                    <LightboxArrow direction="prev" />
                  </button>

                  <div className="lightbox-panel-enter relative h-[min(74vh,56rem)] w-full overflow-hidden rounded-[2rem] bg-black/32 shadow-[0_32px_90px_rgba(0,0,0,0.45)] sm:flex-1">
                    {previousImage ? (
                      <LightboxSlide
                        image={previousImage}
                        mode={direction === 1 ? "exit-next" : "exit-prev"}
                      />
                    ) : null}
                    <LightboxSlide
                      image={currentImage}
                      mode={previousImage ? (direction === 1 ? "enter-next" : "enter-prev") : "current"}
                    />
                  </div>

                  <button
                    aria-label="Ďalšia fotografia"
                    className="absolute right-3 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/14 bg-black/38 text-white backdrop-blur-sm transition-colors hover:bg-black/54 disabled:opacity-40 sm:static sm:h-12 sm:w-12 sm:shrink-0 sm:translate-y-0 sm:bg-white/6 sm:backdrop-blur-none sm:hover:bg-white/12"
                    onClick={() => handleNavigate(1)}
                    type="button"
                  >
                    <LightboxArrow direction="next" />
                  </button>
                  </div>
                </div>

                {images.length > 1 ? (
                  <div className="mt-4 overflow-x-auto pb-1">
                    <div className="flex min-w-full justify-center gap-2">
                      {images.map((image, index) => (
                        <button
                          aria-label={`Otvoriť fotografiu ${index + 1}`}
                          className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-2xl border transition-colors ${
                            index === activeIndex
                              ? "border-[var(--color-accent)]"
                              : "border-white/10 opacity-70 hover:opacity-100"
                          }`}
                          key={`${image.src}-thumb`}
                          onClick={() => handleJumpTo(index)}
                          type="button"
                        >
                          <Image
                            alt={image.alt || title}
                            className="object-cover"
                            fill
                            sizes="96px"
                            src={image.src}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
