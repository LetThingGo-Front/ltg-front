'use client';

import Image from 'next/image';
import React from 'react';
import PopupDetail from './PopupDetail';

type Props = {
  setRequestPopup: (isPopup: boolean) => void;
  requestPopup: boolean;
};
export default function RequestPopup({ setRequestPopup, requestPopup }: Props) {
  return (
    <div
      className={`${requestPopup ? 'max-sm:translate-x-0 sm:block' : 'max-sm:translate-x-full sm:hidden'} fixed duration-500 z-[11] w-[calc(100%-10px)]  sm:w-[calc(100%-660px)] h-[calc(100%-44px)] sm:h-[calc(100%-21px)] bottom-0 max-sm:right-0 sm:left-[660px] bg-white rounded-tl-3xl`}
    >
      <div className="w-full">
        <div className="flex justify-between items-center max-sm:pl-5 max-sm:pr-[10px] sm:px-[45px] py-5 sm:py-10 max-sm:h-10 max-sm:mb-[26px] max-sm:mt-[10px]">
          <button className="w-[23px] sm:w-[72px] sm:h-[72px]" onClick={() => setRequestPopup(false)}>
            <Image src="/assets/images/button/arrow_left.svg" alt="close" width={72} height={72} />
          </button>
          <p className=" font-semibold text-sm sm:font-bold sm:text-[28px]">나눔신청</p>
          <div className="w-[23px] sm:w-[72px]"></div>
        </div>
        <div className="flex flex-col justify-center items-center w-full h-full overflow-y-scroll">
          <PopupDetail />
          <div>프로필</div>
        </div>
      </div>
    </div>
  );
}
