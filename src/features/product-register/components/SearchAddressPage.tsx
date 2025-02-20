"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import axios from "axios";
import jusoData from "@/mocks/data/juso/jusoData.json";
import debounce from "debounce";
import utils from "@/common/utils/cmmnUtil";
import useSearchStore from "@/store/searchStore";
import { isAndroid } from "react-device-detect";
import { JusoProps } from "./AddressSearchInput";

export default function SearchAddressPage() {
  const [searchList, setSearchList] = useState<JusoProps[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const isOpenSearchAddress = useSearchStore.use.isOpen();
  const closeSearchAddress = useSearchStore.use.actions().searchClose;
  const setSearchAddress = useSearchStore.use.actions().setAddress;
  const searchAddressGlobal = useSearchStore.use.address();

  const setAddressInput = debounce((value: string) => {
    if (value !== inputRef.current?.value) return;
    if (value.length > 1) getSearchToLocation(value);
  }, 300);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value ? setAddressInput(e.target.value) : setSearchList([]);
  };

  const getSearchToLocation = useCallback(async (search: string) => {
    // 검색어로 위치 검색
    try {
      const response = await axios.get("/api/address", {
        params: { keyword: search },
      });
      // setSearchList(jusoData);
      if (response.status === 200 && response.data.results.juso) {
        setSearchList(response.data.results.juso);
      }
    } catch (error) {
      console.error(`[ERROR] getSearchToLocation: ${error}`);
    }
  }, []);

  const SelectAddressButton = (address: JusoProps) => {
    const addressNm = address.bdNm
      ? `${address.roadAddrPart1.replace(/지하\s*(\d+)/g, "$1")} (${utils.unescapeHtml(address.bdNm)})`
      : `${address.roadAddrPart1.replace(/지하\s*(\d+)/g, "$1")}`;
    return (
      <button
        className={clsx(
          "h-[2.75rem] w-full truncate px-10 text-left text-[0.875rem] active:bg-grey-200",
        )}
        onClick={() => {
          setSearchAddress(address);
          setSearchList([]);
          closeSearchAddress();
        }}
        type="button"
      >
        {addressNm}
      </button>
    );
  };

  const clearField = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setSearchList([]);
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (isOpenSearchAddress) {
      inputRef.current?.focus();
      if (searchAddressGlobal) {
        const addressNm = searchAddressGlobal.bdNm
          ? `${searchAddressGlobal.roadAddrPart1.replace(/지하\s*(\d+)/g, "$1")} (${utils.unescapeHtml(searchAddressGlobal.bdNm)})`
          : `${searchAddressGlobal.roadAddrPart1.replace(/지하\s*(\d+)/g, "$1")}`;
        if (inputRef.current) inputRef.current.value = addressNm;
      }
    }
  }, [isOpenSearchAddress, searchAddressGlobal]);

  if (!isOpenSearchAddress) return null;

  return (
    <>
      <div
        className="fixed left-0 top-[env(safe-area-inset-top)] z-30 h-[calc(100dvh-env(safe-area-inset-top))] w-full bg-white"
        onTouchStart={() => inputRef.current?.blur()}
      ></div>
      <div
        className="fixed left-0 top-[env(safe-area-inset-top)] z-40 flex h-16 w-full items-center justify-between bg-white px-5 py-[0.875rem]"
        onTouchStart={() => inputRef.current?.blur()}
      >
        <button onClick={closeSearchAddress} type="button">
          <Image
            src="/assets/images/button/arrow_left_2.svg"
            width={32}
            height={32}
            alt="뒤로가기"
          />
        </button>
        <div className="font-bold">주소 검색</div>
        <div className="h-8 w-8"></div>
      </div>
      <div className="fixed left-0 top-[calc(env(safe-area-inset-top))] z-30 h-[6.75rem] w-full overflow-y-auto overscroll-none bg-white scrollbar-hide">
        <div className="h-[calc(100%+1px)]">
          <div className="relative top-[4rem] h-[2.75rem] bg-grey-50">
            <div className={clsx("absolute left-3 top-[0.875rem] h-4 w-4")}>
              <Image
                className={clsx("pointerhover:group-hover/search:hidden")}
                src="/assets/images/magnify.svg"
                width={20}
                height={20}
                alt="search"
              />
            </div>
            <input
              className={clsx(
                "ml-10 h-11 w-[calc(100%-4.75rem)] truncate bg-transparent text-[0.875rem] font-semibold text-grey-700 outline-none placeholder:text-center placeholder:text-[0.875rem]",
              )}
              ref={inputRef}
              placeholder="주소를 검색하세요"
              onChange={handleSearchInput}
            />
            <button
              className={clsx("absolute right-3 top-4 h-3 w-3")}
              type="button"
              onClick={clearField}
            >
              <Image
                src="/assets/images/button/close_grey.svg"
                width={12}
                height={12}
                alt="close"
              />
            </button>
          </div>
        </div>
      </div>
      <div
        className="fixed left-0 top-[calc(env(safe-area-inset-top)+6.6875rem)] z-30"
        onTouchStart={() => inputRef.current?.blur()}
      >
        <div
          className={clsx(
            "max-h-[13.75rem] w-full bg-grey-50 sm:top-[2.75rem]",
          )}
        >
          {searchList.map((addr, idx) => (
            <SelectAddressButton key={idx} {...addr} />
          ))}
        </div>
      </div>
    </>
  );
}
