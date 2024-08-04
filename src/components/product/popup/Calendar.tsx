import Image from 'next/image';
import React from 'react';

const hourOptions = [
  '5:00',
  '6:00',
  '7:00',
  '8:00',
  '9:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
  '24:00',
];

const dayOfWeekOption = ['월', '화', '수', '목', '금', '토', '일'];

const dateOptions = ['22', '23', '24', '25', '26', '27', '28'];

export default function Calendar() {
  return (
    <div className="grow shrink basis-0 flex-col justify-start items-center gap-10 inline-flex">
      <div className="max-sm:hidden flex-col justify-start items-center gap-3 flex">
        <div className="justify-start items-center gap-2 inline-flex">
          <div className="justify-start items-center gap-px flex">
            <div className="w-[26px] h-[26px] px-[6.50px] py-[5.42px] justify-center items-center flex">
              <Image src="/assets/images/location.svg" alt="location" width={26} height={26} />
            </div>
            <div className="text-grey-500 text-base font-bold">강남구 논현동</div>
          </div>
          <div className="p-[2.67px] justify-center items-center flex">
            <Image src="/assets/images/copy.svg" alt="arrow" width={16} height={16} />
          </div>
        </div>
        <div className="text-grey-500 text-base font-bold">길안내</div>
      </div>
      <div className="self-stretch sm:h-[385px] flex-col justify-start items-center gap-4 flex">
        <div className="self-stretch sm:h-[385px] rounded-[10px] flex-col justify-start items-center gap-4 sm:gap-5 flex">
          <div className="self-stretch justify-between items-center inline-flex">
            <div className="w-5 h-5 p-2 justify-center items-center flex" />
            <div className="text-grey-500 text-lg sm:text-2xl font-semibold">4월</div>
            <div className="w-5 h-5 p-2 origin-top-left -rotate-180 justify-center items-center flex" />
          </div>
          <div className="h-[13px] px-[3px] justify-start items-center gap-1 inline-flex">
            <div className="w-4 h-4 relative">
              <Image src="/assets/images/calendar.svg" alt="arrow" width={16} height={16} />
            </div>
            <div className="justify-center items-center gap-2.5 flex">
              <div className="text-grey-500 text-[10px] sm:text-base font-bold">주중 나눔 가능</div>
            </div>
          </div>
          <div className="self-stretch h-[76px] flex-col justify-start items-center gap-3 flex">
            <div className="self-stretch justify-between items-start inline-flex">
              {dayOfWeekOption.map(day => (
                <div key={day} className="h-[33px] px-2 py-[5px] rounded-full justify-center items-center gap-2.5 flex">
                  <div className="text-center text-grey-800 text-[8px] sm:text-base font-semibold">{day}</div>
                </div>
              ))}
            </div>
            <div className="self-stretch justify-between items-start inline-flex">
              {dateOptions.map(date => (
                <div key={date} className="h-[31px] px-2 py-1 rounded justify-center items-center gap-2.5 flex">
                  <div className="text-center text-grey-500 text-[10px] sm:text-base font-semibold">{date}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative w-full sm:w-[432px] h-[88px] sm:h-52 bg-black/5 rounded-[10px] max-sm:mx-5">
            <div className="absolute top-0 w-full h-full p-5">
              <div className="flex flex-col items-center w-full h-full overflow-y-scroll">
                {hourOptions.map(hour => (
                  <div key={hour} className="flex gap-[2px]">
                    <div className="w-6 h-[13px] text-center text-grey-800 text-[8px] font-semibold leading-[12.80px] tracking-tight">
                      {hour}
                    </div>
                    <div className="bg-white/70 rounded-[4px] w-[176px] h-[26px] border border-grey-100"></div>
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
