import React from 'react';
import ShareMap from '../map/ShareMap';

export default function PopupDetail() {
  return (
    <div className="flex flex-col relative w-[946px] h-[704p] gap-6 px-6 pt-8 pb-9">
      <p className="w-[102px] h-[31px] rounded-lg font-bold px-3 py-1 bg-green-400">나눔 장소 A</p>
      <div className="flex w-[898px] h-[486px] gap-7">
        <div className="w-full h-[486px] rounded-xl bg-gray-100">
          <ShareMap />
        </div>
        <div className="w-full h-[486px] rounded-xl bg-gray-100">calendar</div>
      </div>
      <div className="w-full h-[47px] bg-gray-50 text-gray-400">
        <p>나눔자에게 필요한 메모는 여기에 남겨주세요. (20자 이내)</p>
      </div>
      <div className="absolute z-[-1] top-0 left-0 right-0 bottom-0 w-[946px] h-[704p] bg-gradient-to-r from-0% from-[#b7b7b7] via-100%  to-[#E1F452] to-[48%] opacity-10"></div>
    </div>
  );
}
