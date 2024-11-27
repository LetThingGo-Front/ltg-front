"use client";

import React, { useState } from "react";
import Image from "next/image";
import SearchCategroyButton from "./SearchCategroyButton";

export default function SearchNav() {
  const [search, setSearch] = useState("");
  const clearField = () => {
    setSearch("");
  };
  return (
    <div className="flex flex-col items-center gap-3 bg-gradient-to-b from-white from-30% to-transparent to-100% pb-2 backdrop-blur-[3.75rem] max-sm:px-5 sm:min-w-[27.75rem] sm:gap-4">
      <div className="relative flex w-full items-center justify-center">
        <Image
          src="/assets/images/magnify.svg"
          alt="search"
          width={16}
          height={16}
          className="absolute left-2 top-2 sm:left-[0.875rem] sm:top-3"
        />
        <input
          type="text"
          placeholder="필요한 물품을 검색하세요."
          className="h-8 w-full rounded-[0.625rem] bg-black/5 px-8 py-2 text-grey-500 outline-none placeholder:text-center max-sm:text-xs sm:h-10 sm:px-10 sm:py-3"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        {search && (
          <button
            onClick={clearField}
            type="button"
            className="absolute right-[0.625rem] top-[0.625rem] sm:right-4 sm:top-[0.875rem]"
          >
            <Image
              src="/assets/images/button/close_grey.svg"
              width={12}
              height={12}
              alt="close"
            />
          </button>
        )}
      </div>
      <div className="flex w-full items-center justify-between max-xl:max-w-[27.75rem] sm:gap-7">
        <SearchCategroyButton categoryName="지역" />
        <SearchCategroyButton categoryName="카테고리" />
        <SearchCategroyButton categoryName="물품선택" />
        <SearchCategroyButton categoryName="나눔요일" />
      </div>
    </div>
  );
}
