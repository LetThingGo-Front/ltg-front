import Image from "next/image";
import React from "react";

type Props = {
  id?: string;
};
export default function FullScreenButton({ id = "map" }: Props) {
  const mapElement = document.getElementById(id); // html element tag id
  const fullScreen = () => {
    if (mapElement) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        mapElement.requestFullscreen();
      }
    }
  };
  const ButtonIcon = () => {
    if (document.fullscreenElement) {
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
