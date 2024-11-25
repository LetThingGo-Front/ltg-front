import React from "react";
import Image from "next/image";

export default function SearchNav() {
  return (
    <div className="max-lg:hidden">
      <input
        type="text"
        placeholder="필요한 물품을 검색하세요."
        className="mb-[16px] h-[40px] w-[444px] rounded-[10px] bg-[#f0f0f0] py-[12px] text-center text-[#969696]"
      />
      <div className="flex w-[444px] gap-[28px]">
        <div className="flex w-[93px] cursor-pointer py-[4px] pe-[8px] ps-[13px]">
          <p className="me-[8px] w-[23px] text-[12px]">지역</p>
          <Image
            src="/assets/images/dropdown_category.png"
            alt="dropdown"
            width={6.7}
            height={3.3}
            className="mt-[9px] h-[3.3px] w-[6.7px]"
          />
        </div>
        <div className="flex w-[93px] cursor-pointer py-[4px] pe-[8px] ps-[13px]">
          <p className="me-[8px] w-[45px] text-[12px]">카테고리</p>
          <Image
            src="/assets/images/dropdown_category.png"
            alt="dropdown"
            width={6.7}
            height={3.3}
            className="mt-[9px] h-[3.3px] w-[6.7px]"
          />
        </div>
        <div className="flex w-[93px] cursor-pointer py-[4px] pe-[8px] ps-[13px]">
          <p className="me-[8px] w-[45px] text-[12px]">물품선택</p>
          <Image
            src="/assets/images/dropdown_category.png"
            alt="dropdown"
            width={6.7}
            height={3.3}
            className="mt-[9px] h-[3.3px] w-[6.7px]"
          />
        </div>
        <div className="flex w-[93px] cursor-pointer py-[4px] pe-[8px] ps-[13px]">
          <p className="me-[8px] w-[45px] text-[12px]">나눔요일</p>
          <Image
            src="/assets/images/dropdown_category.png"
            alt="dropdown"
            width={6.7}
            height={3.3}
            className="mt-[9px] h-[3.3px] w-[6.7px]"
          />
        </div>
      </div>
    </div>
  );
}
