"use client";

import React, { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import clsx from "clsx";
import Image from "next/image";
import { isMobile, isTablet } from "react-device-detect";
import debounce from "debounce";

type Props = {
  addr: string;
  setAddress: (address: string) => void;
  isOpen: boolean;
  openPostcode: (open: boolean) => void;
  setSimpleAddr: (address: string) => void;
};

export default function Postcode({
  addr,
  setAddress,
  isOpen,
  openPostcode,
  setSimpleAddr,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full">
      <SearchInput
        addr={addr}
        isOpenMoblieView={isOpen}
        setIsOpenMoblieView={() => {
          isMobile && !isTablet && openPostcode(true);
        }}
        closeIsOpenMobileView={() => {
          isMobile && !isTablet && openPostcode(false);
        }}
        setAddress={setAddress}
        setSimpleAddr={setSimpleAddr}
        isFocused={isFocused}
        setIsFocused={setIsFocused}
      />
      <div
        className={clsx(
          "fixed left-0 top-[env(safe-area-inset-top)] z-40 flex h-16 w-full items-center justify-between overscroll-none bg-white px-5 py-[0.875rem]",
          !isOpen && "hidden",
        )}
      >
        <button
          onClick={() => {
            setIsFocused(false);
            openPostcode(false);
          }}
          type="button"
        >
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
      {isOpen && (
        <div className="fixed left-0 top-0 z-30 h-dvh w-full overflow-y-auto overscroll-none scrollbar-hide">
          <div className="h-[calc(100dvh+0.0625rem)] bg-white"></div>
        </div>
      )}
    </div>
  );
}
