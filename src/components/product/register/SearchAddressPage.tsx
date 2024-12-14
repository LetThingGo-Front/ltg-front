"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import axios from "axios";
import { JusoProps } from "./SearchInput";
import jusoData from "@/mocks/data/juso/jusoData.json";
import debounce from "debounce";
import utils from "@/utils/cmmnUtil";
import useSearchStore from "@/store/searchStore";

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
      setSearchList(jusoData);
      if (response.status === 200 && response.data.results.juso) {
        setSearchList(response.data.results.juso);
      }
    } catch (error) {
      console.error(`[ERROR] getSearchToLocation: ${error}`);
    }
  }, []);

  const AddAddressButton = (address: JusoProps) => {
    const addressNm = address.bdNm
      ? `${address.roadAddrPart1.replace(/지하\s*(\d+)/g, "$1")} (${utils.unescapeHtml(address.bdNm)})`
      : `${address.roadAddrPart1.replace(/지하\s*(\d+)/g, "$1")}`;
    return (
      <button
        className={clsx(
          "h-[2.75rem] w-full truncate px-10 text-left text-[0.875rem]",
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

  const inputUnFocused = () => {
    if (inputRef.current && inputRef.current === document.activeElement) {
      inputRef.current.blur();
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

  useEffect(() => {
    window.addEventListener("scroll", inputUnFocused);
    return () => {
      window.removeEventListener("scroll", inputUnFocused);
    };
  }, []);

  if (!isOpenSearchAddress) return null;

  return (
    <div className="fixed left-0 top-[env(safe-area-inset-top)] z-30 h-[calc(100dvh-env(safe-area-inset-top))] w-full bg-white">
      <div
        className={clsx(
          "flex h-16 w-full items-center justify-between overscroll-none bg-white px-5 py-[0.875rem]",
        )}
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
      <div className="relative h-[2.75rem] bg-grey-50">
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
        <div
          className={clsx(
            "absolute left-0 top-[2.75rem] max-h-[13.75rem] w-full bg-grey-50 sm:top-[2.75rem]",
          )}
        >
          {searchList.map((addr, idx) => (
            <AddAddressButton key={idx} {...addr} />
          ))}
        </div>
      </div>
    </div>
  );
}
