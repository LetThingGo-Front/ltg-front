"use client";

import MainMap from "@/components/MainMap";
import LandingModal from "@/components/modal/Landing";
import { useEffect, useRef } from "react";

export default function Page() {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleVisualViewPortResize = () => {
      const currentVisualViewport = Number(window.visualViewport?.height);
      if (divRef) {
        divRef.current!.style.height = `${currentVisualViewport - 64}px`;
        window.scrollTo(0, 32);
      }
      if (window.visualViewport) {
        window.visualViewport.onresize = handleVisualViewPortResize;
      }
    };
    window.visualViewport?.addEventListener(
      "resize",
      handleVisualViewPortResize,
    );
  }, []);

  return (
    <div
      className="mx-5 flex h-[calc(100%-9.875rem)] items-center justify-center pt-[4.25rem] sm:mx-10"
      ref={divRef}
    >
      <div className="h-full min-h-[32.5rem] w-full rounded-[1.875rem]">
        <MainMap />
      </div>
      <LandingModal />
    </div>
  );
}
