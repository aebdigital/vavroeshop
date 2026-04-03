"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type HeroParallaxImageProps = {
  src: string;
};

export function HeroParallaxImage({ src }: HeroParallaxImageProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      return;
    }

    let frame = 0;

    const update = () => {
      if (layerRef.current) {
        layerRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.15}px, 0) scale(1.12)`;
      }

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
      <div
        className="absolute -inset-x-[4%] -inset-y-[15%] will-change-transform"
        ref={layerRef}
      >
        <Image
          alt=""
          className="object-cover"
          fill
          priority
          sizes="100vw"
          src={src}
        />
      </div>
    </div>
  );
}
