'use client';

import React, { useState } from 'react';
import Line from './Line';
import MinSemiTitle from './MinSemiTitle';
import Image from 'next/image';
import RegisterMap from './RegisterMap';
import ToggleButton from './ToggleButton';
import { days } from './constants/constants';

type Props = {
  close: () => void;
};
export default function RegistrationLocation({ close }: Props) {
  const [isTodayShare, setIsTodayShare] = useState(false);
  const [isDayShare, setIsDayShare] = useState(false);
  return (
    <div className="flex flex-col items-center gap-[25px] sm:gap-[45px] h-full bg-gradient-to-b from-0% from-[#b7b7b7]/10 via-100%  to-[#E1F452]/10 to-[48%] rounded-[10px] px-[30px] py-[26px]">
      <div className=" bg-green-400 rounded-[4px] px-2">
        <p className="max-sm:text-[10px] text-center font-bold text-grey-900">나눔장소A</p>
      </div>
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-col gap-2">
          <MinSemiTitle title="나눔 장소 설정" required />
          <Line />
        </div>
        <div className="flex gap-1">
          <div className="flex items-center p-1">
            <div className="w-[10px] h-[10px] sm:w-4 sm:h-4">
              <Image src="/assets/images/home.svg" width={16} height={16} alt="home" />
            </div>
            <p className="text-[8px] sm:text-xs text-grey-400 font-bold">집근처</p>
          </div>
          <div className="flex items-center p-1">
            <div className="w-[10px] h-[10px] sm:w-4 sm:h-4">
              <Image src="/assets/images/building.svg" width={16} height={16} alt="company" />
            </div>
            <p className="text-[8px] sm:text-xs text-grey-400 font-bold">회사 근처</p>
          </div>
          <div className="flex items-center p-1">
            <div className="w-[10px] h-[10px] sm:w-4 sm:h-4">
              <Image src="/assets/images/Location_marked.svg" width={16} height={16} alt="etc" />
            </div>
            <p className="text-[8px] sm:text-xs text-grey-400 font-bold">기타</p>
          </div>
        </div>
        <div className="relative flex h-8 sm:h-10 bg-black/5 rounded-[10px] border border-white backdrop-blur-[50px]">
          <input
            className="w-full cursor-pointer px-7 bg-transparent text-[10px] sm:text-sm placeholder:text-[10px] sm:placeholder:text-sm placeholder:text-grey-500 placeholder:text-center"
            placeholder="주소를 검색하세요"
            disabled
          />
          <div className="absolute left-3 top-[10px] sm:top-[14px]">
            <Image src="/assets/images/magnify.svg" width={12} height={12} alt="search" />
          </div>
        </div>
        <div className="flex justify-center items-center h-8 sm:h-10 bg-black/10 rounded-[10px] backdrop-blur-[10px]">
          <input
            className="w-full cursor-pointer px-3 bg-transparent text-[10px] sm:text-sm placeholder:text-[10px] sm:placeholder:text-sm placeholder:text-grey-500"
            placeholder="길안내(예: 지상 강남역 12번 출구 앞)"
            disabled
          />
        </div>
      </div>
      <div className="h-[120px] sm:h-[180px] w-full">
        <RegisterMap />
      </div>
      <div className="flex flex-col w-full gap-2">
        <MinSemiTitle title="나눔 장소 설정" />
        <Line />
      </div>
      <div className="flex flex-col gap-3 sm:gap-9 w-full">
        <div className="flex justify-between items-center">
          <p className="max-sm:text-[10px] text-grey-800 font-semibold">오늘 번개 나눔</p>
          <ToggleButton toggle={() => setIsTodayShare(!isTodayShare)} on={isTodayShare} />
        </div>
        <div className="flex justify-between items-center">
          <p className="max-sm:text-[10px] text-grey-800 font-semibold">나눔 가능 요일 및 시간대 선택</p>
          <ToggleButton
            toggle={() => setIsDayShare(!isDayShare)}
            on={isDayShare}
            onText="신청자"
            offText="신청자"
            isShort={false}
          />
        </div>
        <div className="flex justify-between">
          {days.map((day, i) => (
            <p key={day} className="max-sm:text-[10px] text-grey-300 font-semibold text-center px-2">
              {day}
            </p>
          ))}
        </div>
        <div className="max-sm:text-[8px] py-1 text-grey-300 font-semibold text-center rounded-full bg-black/5 ">
          시간 선택 하기
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <button className="bg-black text-[10px] sm:text-xs text-white font-semibold py-2 px-4 rounded-full">
          장소 및 일정 저장
        </button>
        <button className="text-[10px] sm:text-xs text-grey-700 font-semibold py-2 px-4" onClick={close}>
          닫기
        </button>
      </div>
    </div>
  );
}
