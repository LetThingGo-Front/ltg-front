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
    <div
      className={clsx(
        "w-full",
        isOpen &&
          "fixed left-0 top-[calc(env(safe-area-inset-top)+4rem)] z-20 h-[calc(100dvh-env(safe-area-inset-top))] overflow-y-auto overscroll-none scrollbar-hide",
      )}
    >
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
      {isOpen && <div className="h-dvh bg-grey-50"></div>}
    </div>
  );
}
