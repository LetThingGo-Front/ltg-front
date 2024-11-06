"use client";

import clsx from "clsx";
import Image from "next/image";

export default function LandingModal() {
  return (
    <div
      className={clsx(
        "absolute flex h-full w-full flex-col justify-center rounded-[1.25rem] bg-white/40 backdrop-blur-lg",
        "sm:left-[calc(50%-19.5rem)] sm:top-[2.9375rem] sm:max-h-[36.625rem] sm:max-w-[32.75rem] sm:px-[5.6875rem]",
        "max-sm:left-[0.625rem] max-sm:top-[0.625rem] max-sm:h-[calc(100%-1.25rem)] max-sm:w-[calc(100%-1.25rem)] max-sm:px-6",
      )}
    >
      <div className="flex flex-col gap-8 text-center">
        <div className="flex justify-center">
          <Image
            src="/images/landing.png"
            alt="langing-image"
            width={80}
            height={110}
          />
        </div>
        <div className="flex flex-col gap-1 font-bold">
          <p className="text-2xl sm:text-3xl">Let your things go</p>
          <p className="sm:text-lg">묵혀두지 말고 보내주세요</p>
        </div>
        <div className="">
          <p className="text-xs">서울에서 나눔 가능한 물품</p>
          <p className="text-3xl font-bold text-stone-600">1000건</p>
        </div>
        <div className="flex gap-[0.625rem] rounded-xl bg-[#ebe9e8] px-[0.875rem]">
          <Image
            src="/assets/images/magnify.svg"
            width={16}
            height={16}
            alt="search"
          />
          <input
            type="text"
            placeholder="필요한 물품을 검색하세요."
            className="w-full bg-transparent px-[0.375rem] py-2 text-sm font-semibold text-[#8c8c8c] outline-none placeholder:text-center"
          />
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 text-sm">
        <button className="flex w-full items-center rounded-full bg-white px-3 py-1 shadow-lg sm:py-2">
          <Image
            src="/images/icons/Thunder.png"
            alt="thunder-icon"
            width={30}
            height={30}
          />
          <p className="ml-auto mr-5 w-full text-center">오늘 번개 나눔 보기</p>
        </button>
        <button className="flex w-full items-center rounded-full bg-white px-3 py-1 shadow-lg sm:py-2">
          <Image
            src="/images/icons/Location.png"
            alt="location-icon"
            width={30}
            height={30}
          />
          <p className="ml-auto mr-5 w-full text-center">내 주변 나눔 보기</p>
        </button>
        <button className="flex w-full items-center rounded-full bg-white px-3 py-1 shadow-lg sm:py-2">
          <Image
            src="/images/icons/Thing_Sm.png"
            alt="thing-icon"
            width={30}
            height={30}
          />
          <p className="ml-auto mr-5 w-full text-center">새 나눔 등록하기</p>
        </button>
      </div>
    </div>
  );
}
