import Image from "next/image";
import React from "react";
import { isIOS, isTablet, isSafari } from "react-device-detect";

type Props = {
  id?: string;
  isFullScreen?: boolean;
  setIsFullScreen: () => void;
};
export default function FullScreenButton({
  id = "map",
  isFullScreen,
  setIsFullScreen,
}: Props) {
  const mapElement = document.getElementById(id); // html element tag id
  const fullScreen = () => {
    if (isIOS) {
      // alert("iOS에서는 지원하지 않는 기능입니다.");
      setIsFullScreen();
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
  const ButtonIcon = () => {
    if (document.fullscreenElement || isFullScreen) {
      return (
        <Image
          src="/assets/images/button/minimisescreen.svg"
          width={25}
          height={25}
          alt="Minimisescreen"
        />
      );
    } else {
      return (
        <Image
          src="/assets/images/button/fullscreen.svg"
          width={25}
          height={25}
          alt="fullscreen"
        />
      );
    }
  };

  return (
    <button
      className="absolute right-0 m-3 h-[1.5625rem] w-[1.5625rem] rounded bg-[#303030]/50 p-1 text-center text-xs font-bold text-white backdrop-blur-sm"
      onClick={fullScreen}
      type="button"
    >
      <ButtonIcon />
    </button>
  );
}
