import React from "react";
import Image from "next/image";

export default function ExploreLayerControl() {
  return (
    <div className="absolute right-0 top-0 z-[1] mr-[0.875rem] mt-[5.5rem] flex flex-col gap-[1.0625rem] sm:mr-[1.875rem] sm:mt-[1.875rem] sm:gap-5">
      <button className="h-9 w-9 rounded-full bg-white p-0.5 shadow-[0px_4px_34px_0px_rgb(0,0,0,0.3)] sm:h-[3.125rem] sm:w-[3.125rem] sm:p-1.5">
        <Image
          src="/assets/images/button/location.svg"
          alt="주변 나눔 보기"
          width={50}
          height={50}
        />
      </button>
      <button className="h-9 w-9 rounded-full bg-white p-1 shadow-[0px_4px_34px_0px_rgb(0,0,0,0.3)] sm:h-[3.125rem] sm:w-[3.125rem] sm:p-2">
        <Image
          src="/assets/images/button/thunder.svg"
          alt="오늘 번개 나눔 보기"
          width={50}
          height={50}
        />
      </button>
    </div>
  );
}
