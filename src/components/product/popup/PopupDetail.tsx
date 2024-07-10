import React from 'react';
import ShareMap from '../map/ShareMap';
import Image from 'next/image';
import Calendar from './Calendar';

export default function PopupDetail() {
  return (
    <div className="flex flex-col items-center relative w-[946px] h-[704p] gap-9 px-6 pt-8 pb-9">
      <p className="w-[102px] h-[31px] rounded-lg font-bold px-3 py-1 bg-green-400">나눔 장소 A</p>
      <div className="flex w-[898px] h-[486px] gap-7">
        <div className="w-full h-[486px] rounded-[10px] bg-grey-100 shadow-[inset_0_4px_10px_0_rgba(0,0,0,0.10)]">
          <ShareMap />
        </div>
        <Calendar />
      </div>
      <div className="relative flex justify-center items-center gap-2 w-full h-[47px] bg-black/10 rounded-[10px]">
        <p className="text-gray-400 z-10">나눔자에게 필요한 메모는 여기에 남겨주세요. (20자 이내)</p>
        <Image src="/assets/images/button/close.svg" alt="close" width={10} height={10} />
      </div>
      <div className="absolute z-[-1] top-0 left-0 right-0 bottom-0 w-[946px] h-[704p] rounded-[20px] drop-shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] bg-gradient-to-b from-0% from-[#b7b7b7] via-100%  to-[#E1F452] to-[48%] opacity-10"></div>
    </div>
  );
}
