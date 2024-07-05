'use client';

import Image from 'next/image';
import React from 'react';
import PopupDetail from './PopupDetail';

type Props = {
  setRequestPopup: (isPopup: boolean) => void;
};
export default function RequestPopup({ setRequestPopup }: Props) {
  return (
    <div className="fixed duration-500 w-[1260px] h-[1058px] z-[11] bottom-0 right-0 bg-white rounded-tl-3xl">
      <div>
        <div className="flex justify-between items-center px-[45px] py-10">
          <button onClick={() => setRequestPopup(false)}>
            <Image src="/assets/images/button/arrow_left.svg" alt="close" width={72} height={72} />
          </button>
          <p className="font-bold text-[28px]">나눔신청</p>
          <div className="w-[72px]"></div>
        </div>
        <div className="w-[1175px] h-[758px]">
          <PopupDetail />
          <div>프로필</div>
        </div>
      </div>
    </div>
  );
}
