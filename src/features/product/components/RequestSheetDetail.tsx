import React from "react";
import ShareMap from "./ShareMap";
import Image from "next/image";
import RequestSheetCalendar from "./RequestSheetCalendar";

export default function RequestSheetDetail() {
  return (
    <div className="relative flex h-full w-full flex-col items-center gap-[25px] px-5 pb-5 pt-[26px] sm:h-[704p] sm:w-[946px] sm:gap-9 sm:px-6 sm:pb-9 sm:pt-8">
      <p className="h-[21px] w-[84px] rounded bg-green-400 px-2 py-[2px] text-center font-bold sm:h-[31px] sm:w-[102px] sm:rounded-lg sm:px-3 sm:py-1 max-sm:text-xs">
        나눔 장소 A
      </p>
      <div className="flex flex-col items-center justify-start gap-3 sm:hidden">
        <div className="inline-flex items-center justify-start gap-2">
          <div className="flex items-center justify-start gap-px">
            <div className="flex h-4 w-4 items-center justify-center p-[3px] sm:h-[26px] sm:w-[26px] sm:p-6">
              <Image
                src="/assets/images/location.svg"
                alt="location"
                width={26}
                height={26}
              />
            </div>
            <div className="text-[10px] font-bold text-grey-500 sm:text-base">
              강남구 논현동
            </div>
          </div>
          <div className="flex items-center justify-center p-[2.67px] max-sm:h-4 max-sm:w-4">
            <Image
              src="/assets/images/copy.svg"
              alt="arrow"
              width={16}
              height={16}
            />
          </div>
        </div>
        <div className="text-[10px] font-bold text-grey-500 sm:text-base">
          길안내
        </div>
      </div>
      <div className="flex w-full gap-[25px] sm:h-[486px] sm:w-[898px] sm:gap-7 max-sm:flex-col max-sm:px-5">
        <div className="h-20 w-full rounded-[10px] bg-grey-100 shadow-[inset_0_4px_10px_0_rgba(0,0,0,0.10)] sm:h-[486px]">
          <ShareMap />
        </div>
        <RequestSheetCalendar />
      </div>
      <div className="w-full max-sm:px-5">
        <div className="flex h-[30px] w-full items-center justify-center gap-2 rounded-[10px] bg-black/10 sm:h-[47px] max-sm:px-3 max-sm:py-2">
          <p className="z-10 text-gray-400 max-sm:text-[10px]">
            나눔자에게 필요한 메모는 여기에 남겨주세요. (20자 이내)
          </p>
          <Image
            src="/assets/images/button/close.svg"
            alt="close"
            width={10}
            height={10}
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 top-0 z-[-1] h-full w-[calc(100%-40px)] rounded-[20px] bg-gradient-to-b from-[#b7b7b7] from-0% via-100% to-[#E1F452] to-[48%] opacity-10 drop-shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] sm:h-[704p] sm:w-[946px] max-sm:mx-[20px]"></div>
    </div>
  );
}
