"use client";

import { useEffect, useRef, useState } from "react";

type HeroSlideshowProps = {
  images: string[];
};

export function HeroSlideshow({ images }: HeroSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const layerRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (images.length < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 4500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [images.length]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      return;
    }

    let frame = 0;

    const update = () => {
      const translateY = window.scrollY * 0.15;

      layerRefs.current.forEach((layer) => {
        if (!layer) {
          return;
        }

        layer.style.transform = `translate3d(0, ${translateY}px, 0) scale(1.12)`;
      });

      frame = 0;
    };

    const requestUpdate = () => {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute -inset-x-[4%] -inset-y-[15%] bg-cover bg-center will-change-transform"
            ref={(element) => {
              layerRefs.current[index] = element;
            }}
            style={{ backgroundImage: `url(${image})` }}
          />
        </div>
      ))}
    </div>
  );
}
