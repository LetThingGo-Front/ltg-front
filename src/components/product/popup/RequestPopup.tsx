'use client';

import Image from 'next/image';
import React from 'react';
import PopupDetail from './PopupDetail';

type Props = {
  setRequestPopup: (isPopup: boolean) => void;
};
export default function RequestPopup({ setRequestPopup }: Props) {
  return (
    <div className="fixed duration-500 z-[11] w-[calc(100%-660px)] h-[calc(100%-21px)] bottom-0 left-[660px] bg-white rounded-tl-3xl">
      <div>
        <div className="flex justify-between items-center px-[45px] py-10">
          <button onClick={() => setRequestPopup(false)}>
            <Image src="/assets/images/button/arrow_left.svg" alt="close" width={72} height={72} />
          </button>
          <p className="font-bold text-[28px]">나눔신청</p>
          <div className="w-[72px]"></div>
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <PopupDetail />
          <div>프로필</div>
        </div>
      </div>
    </div>
  );
}
