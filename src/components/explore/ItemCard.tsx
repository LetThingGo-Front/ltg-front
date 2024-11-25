import React from "react";
import Image from "next/image";

export default function ItemCard() {
  return (
    <div className="h-[7rem] w-[19.5rem] rounded-[20px] bg-[#cdcccb]">
      <div className="flex h-[92px] p-[10px]">
        <div className="me-[14px] flex h-[92px] w-[92px] rounded-[10px] bg-white"></div>
        <div className="">
          <div className="flex">
            <p className="h-[2.5rem] w-[10.25rem] text-[0.875rem] font-bold">
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
            <div className="me-[0.25rem] flex rounded-[0.5rem] bg-white/70 p-[0.25rem] px-[0.5rem] text-[0.625rem] font-semibold">
              <Image
                src="/images/icons/Thunder.png"
                alt="thunder"
                width={6.18}
                height={7.87}
                className="mx-[0.375rem] my-[0.25rem] h-[0.4938rem] w-[0.3875rem]"
              />
              오늘 번개 가능
            </div>
            <div className="flex rounded-[0.5rem] bg-[#00000030] p-[0.25rem] px-[0.5rem] text-[0.625rem] font-semibold text-white">
              일정 제안 받음
            </div>
          </div>
          <div className="flex">
            <div className="me-[0.8125rem] flex text-[0.625rem] text-[#595959]">
              <Image
                src="/images/map_pin.png"
                alt="map_pin"
                width={8}
                height={9.3}
                className="me-[0.5rem] mt-[0.1875rem] h-[0.5813rem] w-[0.5rem]"
              />
              <p className="font-bold">역삼동</p>
            </div>
            <div className="text-[0.625rem] text-[#595959]">오늘 등록됨</div>
          </div>
        </div>
      </div>
    </div>
  );
}
