import Image from "next/image";
import React from "react";
import { isIOS, isTablet, isSafari } from "react-device-detect";

type Props = {
  id?: string;
};
export default function FullScreenTextButton({ id = "map" }: Props) {
  const mapElement = document.getElementById(id); // html element tag id
  const element = document.documentElement;
  const fullScreen = () => {
    if (isIOS) {
      alert("iOS에서는 지원하지 않는 기능입니다.");
      return;
    }

    if (isIOS && isTablet && !isSafari) {
      alert("해당 디바이스에서는 safari에서만 지원하는 기능입니다.");
      return;
    }

    if (mapElement) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        mapElement.requestFullscreen();
      }
    }
  };

  return (
    <button
      className="flex h-9 w-[8.9375rem] gap-2 rounded-[10px] bg-white/80 px-5 py-[0.625rem] backdrop-blur-[30px] sm:h-[2.6875rem] sm:w-[12.25rem]"
      onClick={fullScreen}
      type="button"
    >
      <Image
        className="h-4 w-4 sm:h-[23px] sm:w-[23px]"
        src="/assets/images/button/map.svg"
        width={23}
        height={23}
        alt="fullscreen"
      />
      <p className="font-bold max-sm:text-xxs">지도에서 위치 확인</p>
    </button>
  );
}
