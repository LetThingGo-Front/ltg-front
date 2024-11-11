"use client";

import clsx from "clsx";
import Image from "next/image";
import LandingButton from "./button/LandingButton";
import axios from "@/lib/axios";
import { useEffect } from "react";

export default function LandingModal() {
  const getUser = async () => {
    try {
      const response = await axios.get("/v1/group-codes/IT003/codes");
      console.log(response.data.data["IT003"]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div
      className={clsx(
        "absolute flex flex-col justify-center rounded-[1.25rem] bg-white/40 backdrop-blur-lg",
        "left-[0.625rem] top-[0.625rem] h-[calc(100%-1.25rem)] w-[calc(100%-1.25rem)] px-6",
        "sm:left-[calc(50%-16.375rem)] sm:top-[2.9375rem] sm:h-full sm:max-h-[36.625rem] sm:w-full sm:max-w-[32.75rem] sm:px-[5.6875rem]",
      )}
    >
      <div className="flex flex-col gap-8 text-center">
        <div className="flex justify-center">
          <Image
            src="/images/landing.png"
            alt="langing-image"
            width={80}
            height={105}
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
        <LandingButton
          imgSrc="/images/icons/Thunder.png"
          label="오늘 번개 나눔 보기"
          altText="thunder icon"
        />
        <LandingButton
          imgSrc="/images/icons/Location.png"
          label="내 주변 나눔 보기"
          altText="location icon"
        />
        <LandingButton
          imgSrc="/images/icons/Thing_Sm.png"
          label="새 나눔 등록하기"
          altText="thing icon"
        />
      </div>
    </div>
  );
}
