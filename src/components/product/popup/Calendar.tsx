import Image from "next/image";
import React from "react";

const hourOptions = [
  "5:00",
  "6:00",
  "7:00",
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
  "24:00",
];

const dayOfWeekOption = ["월", "화", "수", "목", "금", "토", "일"];

const dateOptions = ["22", "23", "24", "25", "26", "27", "28"];

export default function Calendar() {
  return (
    <div className="inline-flex shrink grow basis-0 flex-col items-center justify-start gap-10">
      <div className="flex flex-col items-center justify-start gap-3 max-sm:hidden">
        <div className="inline-flex items-center justify-start gap-2">
          <div className="flex items-center justify-start gap-px">
            <div className="flex h-[36px] w-[36px] items-center justify-center px-[6.50px] py-[5.42px]">
              <Image
                src="/assets/images/marker/marker.svg"
                alt="location"
                width={36}
                height={36}
              />
            </div>
            <div className="text-base font-bold text-grey-500">
              강남구 논현동
            </div>
          </div>
          <div className="flex items-center justify-center p-[2.67px]">
            <Image
              src="/assets/images/copy.svg"
              alt="arrow"
              width={16}
              height={16}
            />
          </div>
        </div>
        <div className="text-base font-bold text-grey-500">길안내</div>
      </div>
      <div className="flex flex-col items-center justify-start gap-4 self-stretch sm:h-[385px]">
        <div className="flex flex-col items-center justify-start gap-4 self-stretch rounded-[10px] sm:h-[385px] sm:gap-5">
          <div className="inline-flex items-center justify-between self-stretch">
            <div className="flex h-5 w-5 items-center justify-center p-2" />
            <div className="text-lg font-semibold text-grey-500 sm:text-2xl">
              4월
            </div>
            <div className="flex h-5 w-5 origin-top-left -rotate-180 items-center justify-center p-2" />
          </div>
          <div className="inline-flex h-[13px] items-center justify-start gap-1 px-[3px]">
            <div className="relative h-4 w-4">
              <Image
                src="/assets/images/calendar.svg"
                alt="arrow"
                width={16}
                height={16}
              />
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <div className="text-[10px] font-bold text-grey-500 sm:text-base">
                주중 나눔 가능
              </div>
            </div>
          </div>
          <div className="flex h-[76px] flex-col items-center justify-start gap-3 self-stretch">
            <div className="inline-flex items-start justify-between self-stretch">
              {dayOfWeekOption.map((day) => (
                <div
                  key={day}
                  className="flex h-[33px] items-center justify-center gap-2.5 rounded-full px-2 py-[5px]"
                >
                  <div className="text-center text-[8px] font-semibold text-grey-800 sm:text-base">
                    {day}
                  </div>
                </div>
              ))}
            </div>
            <div className="inline-flex items-start justify-between self-stretch">
              {dateOptions.map((date) => (
                <div
                  key={date}
                  className="flex h-[31px] items-center justify-center gap-2.5 rounded px-2 py-1"
                >
                  <div className="text-center text-[10px] font-semibold text-grey-500 sm:text-base">
                    {date}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[88px] w-full rounded-[10px] bg-black/5 sm:h-52 sm:w-[432px] max-sm:mx-5">
            <div className="absolute top-0 h-full w-full p-5">
              <div className="flex h-full w-full flex-col items-center overflow-y-scroll">
                {hourOptions.map((hour) => (
                  <div key={hour} className="flex gap-[2px]">
                    <div className="h-[13px] w-6 text-center text-[8px] font-semibold leading-[12.80px] tracking-tight text-grey-800">
                      {hour}
                    </div>
                    <div className="h-[26px] w-[176px] rounded-[4px] border border-grey-100 bg-white/70"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
