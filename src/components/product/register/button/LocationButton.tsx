"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { useMap } from "react-naver-maps";

type Props = {
  address: string;
};

export default function LocationButton({ address }: Props) {
  const map = useMap();
  const moveMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        map.panTo(
          { lat: position.coords.latitude, lng: position.coords.longitude },
          { duration: 100 },
        );
        map.setZoom(18);
      },
      (error) => {
        console.error("위치 정보를 가져오는데 실패했습니다: ", error);
      },
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
