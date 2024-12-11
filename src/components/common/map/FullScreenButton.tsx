import Image from "next/image";
import React from "react";
import { isIOS, isMobile, isTablet, isSafari } from "react-device-detect";
import { useMap } from "react-naver-maps";

type Props = {
  id?: string;
  isFullScreen?: boolean;
  setIsFullScreen: () => void;
  setZoom: (zoom: number) => void;
};
export default function FullScreenButton({
  id = "map",
  isFullScreen,
  setIsFullScreen,
  setZoom,
}: Props) {
  const mapElement = document.getElementById(id); // html element tag id
  const fullScreen = () => {
    if (isIOS && isMobile && !isTablet) {
      if (isFullScreen) {
        setZoom(17);
      } else {
        setZoom(18);
      }
      setIsFullScreen();
      return;
    }

    if (isIOS && isTablet && !isSafari) {
      alert("사파리 브라우저에서 확대가 가능해요!");
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
      className="absolute right-0 z-10 m-3 h-[1.5625rem] w-[1.5625rem] rounded bg-[#303030]/50 p-1 text-center text-xs font-bold text-white backdrop-blur-sm"
      onClick={fullScreen}
      type="button"
    >
      <Image
        src={`${document.fullscreenElement || isFullScreen ? "/assets/images/button/minimisescreen.svg" : "/assets/images/button/fullscreen.svg"}`}
        width={25}
        height={25}
        alt="fullscreen"
      />
    </button>
  );
}
