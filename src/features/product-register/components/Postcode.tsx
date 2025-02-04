"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { isMobile, isTablet } from "react-device-detect";
import debounce from "debounce";
import { FavoriteJuso } from "./RegistrationLocation";
import SearchInput from "./SearchInput";

type Props = {
  addr: string;
  setAddress: (address: string) => void;
  isOpen: boolean;
  openPostcode: (open: boolean) => void;
  setSimpleAddr: (address: string) => void;
  setCoordinate: (coord: { lat: number; lng: number }) => void;
  setIsNewFavorite: (isNewFavorite: boolean) => void;
  favoriteJuso?: FavoriteJuso;
};

export default function Postcode({
  addr,
  setAddress,
  isOpen,
  openPostcode,
  setSimpleAddr,
  setCoordinate,
  setIsNewFavorite,
  favoriteJuso,
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
        setCoordinate={setCoordinate}
        setIsNewFavorite={setIsNewFavorite}
        favoriteJuso={favoriteJuso}
      />
    </div>
  );
}
