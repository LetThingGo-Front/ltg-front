"use client";

import Image from "next/image";
import React from "react";
import PopupDetail from "./PopupDetail";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Navigation, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/pagination";

type Props = {
  setRequestPopup: (isPopup: boolean) => void;
  requestPopup: boolean;
};
export default function RequestPopup({ setRequestPopup, requestPopup }: Props) {
  return (
    <div
      className={`${requestPopup ? "sm:block max-sm:translate-x-0" : "sm:hidden max-sm:translate-x-full"} fixed bottom-0 right-0 z-[11] h-[calc(100%-44px)] w-[calc(100%-10px)] rounded-tl-3xl bg-white duration-500 sm:h-[calc(100%-21px)] sm:w-[1140px]`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between py-5 sm:px-[45px] sm:py-10 max-sm:mb-[26px] max-sm:mt-[10px] max-sm:h-10 max-sm:pl-5 max-sm:pr-[10px]">
          <button
            className="w-[23px] sm:h-[72px] sm:w-[72px]"
            onClick={() => setRequestPopup(false)}
          >
            <Image
              src="/assets/images/button/arrow_left.svg"
              alt="close"
              width={72}
              height={72}
            />
          </button>
          <p className="text-sm font-semibold sm:text-[28px] sm:font-bold">
            나눔신청
          </p>
          <div className="w-[23px] sm:w-[72px]"></div>
        </div>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          <SwiperSlide>
            <div className="flex h-full w-full flex-col items-center justify-center overflow-y-auto">
              <PopupDetail />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex h-full w-full flex-col items-center justify-center overflow-y-auto">
              <PopupDetail />
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="flex w-full items-center justify-center opacity-50">
          <div className="flex h-[58px] w-[235px] gap-2 rounded-full border border-white bg-gradient-to-r from-grey-400 to-green-300 py-2 pl-2 pr-6 shadow backdrop-blur-[30px]">
            <Image
              src="/assets/images/sample/profile.png"
              alt="프로필"
              width={42}
              height={42}
            />
            <div className="flex flex-col items-start justify-start gap-2">
              <div className="flex items-center justify-start gap-0.5">
                <div className="flex items-center justify-start gap-4 rounded bg-green-400 px-2 py-0.5 backdrop-blur-sm">
                  <div className="text-[10px] font-bold text-grey-900">
                    나눔 장소 A
                  </div>
                </div>
                <div className="text-xs font-bold text-grey-700">에서</div>
              </div>
              <div className="flex h-4 items-center justify-center gap-px rounded-full">
                <div className="text-xs font-semibold text-grey-700">
                  바쁜 날다람쥐
                </div>
                <div className="text-xs font-semibold text-grey-700">
                  님에게 나눔 신청
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
