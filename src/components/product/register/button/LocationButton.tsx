"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { useMap } from "react-naver-maps";

type Props = {
  address: string;
  myLocation?: { lat: number; lng: number };
};

export default function LocationButton({ address, myLocation }: Props) {
  const map = useMap();
  const moveMyLocation = () => {
    console.log(myLocation);
    if (myLocation)
      map?.panTo(
        { lat: myLocation.lat, lng: myLocation.lng },
        { duration: 300 },
      );
  };
  return (
    <button
      className={clsx(
        "absolute right-[0.875rem] h-9 w-9 rounded-full bg-white p-0.5 shadow-[0px_4px_34px_0px_rgb(0,0,0,0.3)]",
        address ? "bottom-[14rem]" : "bottom-5",
      )}
      type="button"
      onClick={moveMyLocation}
    >
      <Image
        src="/assets/images/button/location_red.svg"
        alt="주변 나눔 보기"
        width={50}
        height={50}
      />
    </button>
  );
}
