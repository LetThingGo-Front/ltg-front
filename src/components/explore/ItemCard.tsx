import React from "react";
import Image from "next/image";

export default function ItemCard() {
  return (
    <div className="h-[112px] w-[312px] rounded-[20px] bg-[#cdcccb]">
      <div className="flex h-[92px] p-[10px]">
        <div className="me-[14px] flex h-[92px] w-[92px] rounded-[10px] bg-white"></div>
        <div className="">
          <div className="flex">
            <p className="h-[40px] w-[164px] text-[14px] font-bold">
              세상에서 가장 쉬운 코딩책
            </p>
            <Image
              src="/images/empty_star.png"
              alt="empty_star"
              width={13}
              height={13}
              className="m-[4.63px] h-[13px] w-[13px]"
            />
          </div>
          <div className="mb-[10px] flex">
            <div className="me-[4px] flex rounded-[8px] bg-white/70 p-[4px] px-[8px] text-[10px] font-semibold">
              <Image
                src="/images/icons/Thunder.png"
                alt="thunder"
                width={6.18}
                height={7.87}
                className="mx-[6px] my-[4px] h-[7.9px] w-[6.2px]"
              />
              오늘 번개 가능
            </div>
            <div className="flex rounded-[8px] bg-[#00000030] p-[4px] px-[8px] text-[10px] font-semibold text-white">
              일정 제안 받음
            </div>
          </div>
          <div className="flex">
            <div className="me-[13px] flex text-[10px] text-[#595959]">
              <Image
                src="/images/map_pin.png"
                alt="map_pin"
                width={8}
                height={9.3}
                className="me-[8px] mt-[3px] h-[9.3px] w-[8px]"
              />
              <p className="font-bold">역삼동</p>
            </div>
            <div className="text-[10px] text-[#595959]">오늘 등록됨</div>
          </div>
        </div>
      </div>
    </div>
  );
}
