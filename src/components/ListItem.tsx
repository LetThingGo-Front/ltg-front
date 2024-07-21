import React from 'react';
import Image from 'next/image';

export default function ListItem() {
  return (
    <div className="w-[312px] h-[112px] bg-[#cdcccb] rounded-[20px]">
      <div className="flex h-[92px] p-[10px]">
        <div className="flex bg-white w-[92px] h-[92px] rounded-[10px] me-[14px]"></div>
        <div className="">
          <div className="flex">
            <p className="w-[164px] h-[40px] font-bold text-[14px]">세상에서 가장 쉬운 코딩책</p>
            <Image
              src="/images/empty_star.png"
              alt="empty_star"
              width={13}
              height={13}
              className="w-[13px] h-[13px] m-[4.63px]"
            />
          </div>
          <div className="flex mb-[10px]">
            <div className="flex p-[4px] px-[8px] bg-white/70 text-[10px] font-semibold rounded-[8px] me-[4px] ">
              <Image
                src="/images/icons/Thunder.png"
                alt="thunder"
                width={6.18}
                height={7.87}
                className="w-[6.2px] h-[7.9px] mx-[6px] my-[4px]"
              />
              오늘 번개 가능
            </div>
            <div className="flex p-[4px] px-[8px] bg-[#00000030] text-[10px] font-semibold text-white rounded-[8px]">
              일정 제안 받음
            </div>
          </div>
          <div className="flex">
            <div className="flex me-[13px] text-[#595959] text-[10px]">
              <Image
                src="/images/map_pin.png"
                alt="map_pin"
                width={8}
                height={9.3}
                className="w-[8px] h-[9.3px] mt-[3px] me-[8px]"
              />
              <p className=" font-bold">역삼동</p>
            </div>
            <div className="text-[#595959] text-[10px]">오늘 등록됨</div>
          </div>
        </div>
      </div>
    </div>
  );
}
