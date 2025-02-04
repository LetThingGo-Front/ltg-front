"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import SearchCategroyButton from "./SearchCategroyButton";
import useExploreStore from "@/store/exploreStore";

export default function SearchNav() {
  const setSearchInput = useExploreStore.use.actions().setSearchInput;
  const clearSearchInput = useExploreStore.use.actions().clearSearchInput;
  const setItemList = useExploreStore.use.actions().setItemList;
  const setIsSearch = useExploreStore.use.actions().setIsSearch;
  const searchInputValue = useExploreStore.use.searchInput();

  const getSearchItemList = () => {
    setItemList([]);
    setIsSearch(true);
  };

  useEffect(() => {
    return () => {
      clearSearchInput();
      setIsSearch(false);
    };
  }, [clearSearchInput, setIsSearch]);
  return (
    <div className="flex flex-col items-center gap-3 bg-gradient-to-b from-white from-30% to-transparent to-100% pb-2 backdrop-blur-[3.75rem] sm:min-w-[27.75rem] sm:gap-4 max-sm:px-5">
      <div className="relative flex w-full items-center justify-center">
        <button onClick={getSearchItemList}>
          <Image
            src="/assets/images/magnify.svg"
            alt="search"
            width={16}
            height={16}
            className="absolute left-2 top-2 sm:left-[0.875rem] sm:top-3"
          />
        </button>
        <input
          type="text"
          placeholder="필요한 물품을 검색하세요."
          className="h-8 w-full rounded-[0.625rem] bg-black/5 px-8 py-2 text-grey-500 outline-none placeholder:text-center sm:h-10 sm:px-10 sm:py-3 max-sm:text-xs"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInputValue}
          onKeyDown={(e) => {
            e.key === "Enter" && getSearchItemList();
          }}
        />
        {searchInputValue && (
          <button
            onClick={clearSearchInput}
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
      <div className="flex w-full items-center justify-between sm:gap-7 max-xl:max-w-[27.75rem]">
        <SearchCategroyButton categoryName="지역" />
        <SearchCategroyButton categoryName="카테고리" />
        <SearchCategroyButton categoryName="물품선택" />
        <SearchCategroyButton categoryName="나눔요일" />
      </div>
    </div>
  );
}
