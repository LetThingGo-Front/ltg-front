import React from 'react';
import ShareMap from '../map/ShareMap';
import Image from 'next/image';
import Calendar from './Calendar';

export default function PopupDetail() {
  return (
    <div className="flex flex-col items-center relative w-full sm:w-[946px] h-full sm:h-[704p] gap-[25px] sm:gap-9 px-5 sm:px-6 pt-[26px] sm:pt-8 pb-5 sm:pb-9">
      <p className="w-[84px] sm:w-[102px] h-[21px] sm:h-[31px] max-sm:text-xs text-center rounded sm:rounded-lg font-bold px-2 sm:px-3 py-[2px] sm:py-1 bg-green-400 ">
        나눔 장소 A
      </p>
      <div className="sm:hidden flex-col justify-start items-center gap-3 flex">
        <div className="justify-start items-center gap-2 inline-flex">
          <div className="justify-start items-center gap-px flex">
            <div className="w-4 h-4 sm:w-[26px] sm:h-[26px] p-[3px] sm:p-6 justify-center items-center flex">
              <Image src="/assets/images/location.svg" alt="location" width={26} height={26} />
            </div>
            <div className="text-grey-500 text-[10px] sm:text-base font-bold">강남구 논현동</div>
          </div>
          <div className="max-sm:w-4 max-sm:h-4 p-[2.67px] flex justify-center items-center">
            <Image src="/assets/images/copy.svg" alt="arrow" width={16} height={16} />
          </div>
        </div>
        <div className="text-grey-500 text-[10px] sm:text-base font-bold">길안내</div>
      </div>
      <div className="flex max-sm:flex-col w-full sm:w-[898px] sm:h-[486px] gap-[25px] sm:gap-7 max-sm:px-5">
        <div className="w-full h-20 sm:h-[486px] rounded-[10px] bg-grey-100 shadow-[inset_0_4px_10px_0_rgba(0,0,0,0.10)]">
          <ShareMap />
        </div>
        <Calendar />
      </div>
      <div className="w-full max-sm:px-5">
        <div className="flex justify-center items-center gap-2 w-full h-[30px] sm:h-[47px] max-sm:px-3 max-sm:py-2 bg-black/10 rounded-[10px]">
          <p className="max-sm:text-[10px] text-gray-400 z-10">
            나눔자에게 필요한 메모는 여기에 남겨주세요. (20자 이내)
          </p>
          <Image src="/assets/images/button/close.svg" alt="close" width={10} height={10} />
        </div>
      </div>
      <div className="absolute z-[-1] top-0 left-0 right-0 bottom-0 w-[calc(100%-40px)] h-full max-sm:mx-[20px] sm:w-[946px] sm:h-[704p] rounded-[20px] drop-shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] bg-gradient-to-b from-0% from-[#b7b7b7] via-100%  to-[#E1F452] to-[48%] opacity-10"></div>
    </div>
  );
}
