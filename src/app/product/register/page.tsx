"use client";

import RegistrationForm from "@/components/product/register/RegistrationForm";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [viewportHeight, setViewportHeight] = useState(0);
  const setSearchInputHeight = () => {
    if (window.visualViewport) {
      setViewportHeight(window.visualViewport.height);
      // 키보드가 올라올 때 스크롤 위치 초기화
      // if (window.innerHeight > window.visualViewport.height) {
      //   window.scrollTo(0, 0);
      // }
    }
  };
  useEffect(() => {
    setSearchInputHeight();
    window.visualViewport?.addEventListener("resize", setSearchInputHeight);
    return () => {
      window.visualViewport?.removeEventListener(
        "resize",
        setSearchInputHeight,
      );
    };
  }, []);

  return (
    <div
      className="flex justify-center overflow-y-auto px-[1.875rem] scrollbar-hide"
      style={{ height: `${viewportHeight}px` }}
    >
      <div className="w-full sm:max-w-[37.5rem]">
        <div className="mb-8 h-[4.6875rem] w-full p-5 max-sm:hidden">
          <p className="text-center text-2xl font-bold text-grey-800">
            나눔 등록
          </p>
        </div>
        <RegistrationForm />
      </div>
    </div>
  );
}
