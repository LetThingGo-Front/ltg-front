'use client';

import Image from 'next/image';
import React from 'react';
import PopupDetail from './PopupDetail';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination, Navigation, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css/pagination';

type Props = {
  setRequestPopup: (isPopup: boolean) => void;
  requestPopup: boolean;
};
export default function RequestPopup({ setRequestPopup, requestPopup }: Props) {
  return (
    <div
      className={`${requestPopup ? 'max-sm:translate-x-0 sm:block' : 'max-sm:translate-x-full sm:hidden'} fixed duration-500 z-[11] w-[calc(100%-10px)]  sm:w-[1140px] h-[calc(100%-44px)] sm:h-[calc(100%-21px)] bottom-0 right-0 bg-white rounded-tl-3xl`}
    >
      <div className="w-full">
        <div className="flex justify-between items-center max-sm:pl-5 max-sm:pr-[10px] sm:px-[45px] py-5 sm:py-10 max-sm:h-10 max-sm:mb-[26px] max-sm:mt-[10px]">
          <button className="w-[23px] sm:w-[72px] sm:h-[72px]" onClick={() => setRequestPopup(false)}>
            <Image src="/assets/images/button/arrow_left.svg" alt="close" width={72} height={72} />
          </button>
          <p className=" font-semibold text-sm sm:font-bold sm:text-[28px]">나눔신청</p>
          <div className="w-[23px] sm:w-[72px]"></div>
        </div>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          onSwiper={swiper => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          <SwiperSlide>
            <div className="flex flex-col justify-center items-center w-full h-full overflow-y-scroll">
              <PopupDetail />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col justify-center items-center w-full h-full overflow-y-scroll">
              <PopupDetail />
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="flex justify-center items-center w-full opacity-50">
          <div className="flex w-[235px] h-[58px] pl-2 pr-6 py-2 bg-gradient-to-r from-grey-400 to-green-300 rounded-full shadow border border-white backdrop-blur-[30px] gap-2">
            <Image src="/assets/images/sample/profile.png" alt="프로필" width={42} height={42} />
            <div className="flex flex-col justify-start items-start gap-2">
              <div className="flex justify-start items-center gap-0.5">
                <div className="px-2 py-0.5 bg-green-400 rounded backdrop-blur-sm justify-start items-center gap-4 flex">
                  <div className="text-grey-900 text-[10px] font-bold">나눔 장소 A</div>
                </div>
                <div className="text-grey-700 text-xs font-bold">에서</div>
              </div>
              <div className="flex h-4 rounded-full justify-center items-center gap-px">
                <div className="text-grey-700 text-xs font-semibold">바쁜 날다람쥐</div>
                <div className="text-grey-700 text-xs font-semibold">님에게 나눔 신청</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
