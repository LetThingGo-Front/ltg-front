"use client";

import React, { useState } from "react";
import Line from "./Line";
import MinSemiTitle from "./MinSemiTitle";
import Image from "next/image";
import RegisterMap from "./RegisterMap";
import ToggleButton from "./ToggleButton";
import { days } from "./constants/constants";
import TextInput from "./TextInput";

type Props = {
  close: () => void;
};
export default function RegistrationLocation({ close }: Props) {
  const [isTodayShare, setIsTodayShare] = useState(false);
  const [isDayShare, setIsDayShare] = useState(false);
  const [selectDay, setSelectDay] = useState<Array<string>>([]);

  return (
    <div className="flex h-full flex-col items-center gap-[25px] rounded-[10px] bg-ltg-gradient-b px-[30px] py-[26px] sm:gap-[45px]">
      <div className="rounded-[4px] bg-green-400 px-2">
        <p className="text-center font-bold text-grey-900 max-sm:text-[10px]">
          나눔장소A
        </p>
      </div>
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-2">
          <MinSemiTitle title="나눔 장소 설정" required />
          <Line />
        </div>
        <div className="flex gap-1">
          <div className="flex items-center p-1">
            <div className="h-[10px] w-[10px] sm:h-4 sm:w-4">
              <Image
                src="/assets/images/home.svg"
                width={16}
                height={16}
                alt="home"
              />
            </div>
            <p className="text-[8px] font-bold text-grey-400 sm:text-xs">
              집근처
            </p>
          </div>
          <div className="flex items-center p-1">
            <div className="h-[10px] w-[10px] sm:h-4 sm:w-4">
              <Image
                src="/assets/images/building.svg"
                width={16}
                height={16}
                alt="company"
              />
            </div>
            <p className="text-[8px] font-bold text-grey-400 sm:text-xs">
              회사 근처
            </p>
          </div>
          <div className="flex items-center p-1">
            <div className="h-[10px] w-[10px] sm:h-4 sm:w-4">
              <Image
                src="/assets/images/location_marker.svg"
                width={16}
                height={16}
                alt="etc"
              />
            </div>
            <p className="text-[8px] font-bold text-grey-400 sm:text-xs">
              기타
            </p>
          </div>
        </div>
        <div className="relative flex h-8 rounded-[10px] border border-white bg-grey-50 backdrop-blur-[50px] sm:h-11">
          <input
            className="w-full cursor-pointer bg-transparent px-7 text-[10px] placeholder:text-center placeholder:text-[10px] placeholder:text-grey-500 sm:text-sm sm:placeholder:text-sm"
            placeholder="주소를 검색하세요"
            disabled
          />
          <div className="absolute left-3 top-[10px] sm:top-[14px]">
            <Image
              src="/assets/images/magnify.svg"
              width={12}
              height={12}
              alt="search"
            />
          </div>
        </div>
        <TextInput
          placeholder="길안내(예: 지상 강남역 12번 출구 앞)"
          clearText={() => {}}
        />
      </div>
      <div className="h-[120px] w-full sm:h-[180px]">
        <RegisterMap />
      </div>
      <div className="flex w-full flex-col gap-2">
        <MinSemiTitle title="나눔 가능 일정 선택" />
        <Line />
      </div>
      <div className="flex w-full flex-col gap-3 sm:gap-9">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-grey-800 max-sm:text-[10px]">
            오늘 번개 나눔
          </p>
          <ToggleButton
            toggle={() => setIsTodayShare(!isTodayShare)}
            on={isTodayShare}
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-grey-800 max-sm:text-[10px]">
            나눔 가능 요일 및 시간대 선택
          </p>
          <ToggleButton
            toggle={() => setIsDayShare(!isDayShare)}
            on={isDayShare}
            onText="나눔자"
            offText="신청자"
            isShort={false}
          />
        </div>
        <div className="flex justify-between">
          {days.map((day, i) => (
            <button
              key={day}
              className={`px-2 font-semibold max-sm:text-[10px] ${selectDay.includes(day) ? "text-grey-800" : "text-grey-300"}`}
              onClick={() => {
                setSelectDay((prev) =>
                  prev.includes(day)
                    ? prev.filter((d) => d !== day)
                    : [...prev, day],
                );
              }}
            >
              {day}
            </button>
          ))}
        </div>
        <div className="rounded-full bg-black/5 py-1 text-center font-semibold text-grey-300 max-sm:text-[8px]">
          시간 선택 하기
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <button className="rounded-full bg-black px-4 py-2 text-[10px] font-semibold text-white sm:text-xs">
          장소 및 일정 저장
        </button>
        <button
          className="px-4 py-2 text-[10px] font-semibold text-grey-700 sm:text-xs"
          onClick={close}
        >
          닫기
        </button>
      </div>
    </div>
  );
}
