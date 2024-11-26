import React from "react";
import Image from "next/image";

export default function ItemCard() {
  return (
    <div className="group/card h-[7rem] w-[19.5rem] cursor-pointer rounded-[1.25rem] bg-black/[16%] hover:bg-black/40">
      <div className="flex h-[92px] p-[10px]">
        <div className="me-[14px] flex h-[92px] w-[92px] rounded-[0.625rem] bg-white"></div>
        <div className="">
          <div className="flex">
            <p className="h-[2.5rem] w-[10.25rem] text-sm font-bold group-hover/card:text-white">
              세상에서 가장 쉬운 코딩책
            </p>
            <Image
              src="/images/empty_star.png"
              alt="empty_star"
              width={13}
              height={13}
              className="m-[0.2894rem] h-[0.8125rem] w-[0.8125rem]"
            />
          </div>
          <div className="mb-[0.625rem] flex">
            <div className="me-[0.25rem] flex rounded-[0.5rem] bg-white/70 p-[0.25rem] px-[0.5rem] text-[0.625rem] font-semibold text-grey-900 group-hover/card:bg-green-400">
              <Image
                src="/images/icons/Thunder.png"
                alt="thunder"
                width={6.18}
                height={7.87}
                className="mx-[0.375rem] my-[0.25rem] h-[0.4938rem] w-[0.3875rem]"
              />
              오늘 번개 가능
            </div>
            <div className="flex rounded-[0.5rem] bg-black/30 p-[0.25rem] px-[0.5rem] text-[0.625rem] font-semibold text-white group-hover/card:bg-white/70 group-hover/card:text-grey-700">
              일정 제안 받음
            </div>
          </div>
          <div className="flex gap-3">
            <div className="relative flex gap-[0.0625rem] text-xxs text-grey-700">
              <Image
                src="/assets/images/marker/location_marked.svg"
                alt="pin"
                width={16}
                height={16}
                className="group-hover/card:opacity-0"
              />
              <Image
                src="/assets/images/marker/location_marked_white.svg"
                alt="white pin"
                width={16}
                height={16}
                className="absolute inset-0 opacity-0 group-hover/card:opacity-100"
              />
              <p className="text-xxs font-bold text-grey-800 group-hover/card:text-white">
                역삼동
              </p>
            </div>
            <div className="text-xxs text-grey-800 group-hover/card:text-white">
              오늘 등록됨
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
