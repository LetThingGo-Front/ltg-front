"use client";

import { useEffect } from "react";
import { useMap } from "react-naver-maps";

type Props = {
  lat: number;
  lng: number;
  isFullScreen?: boolean;
  isEnabled?: boolean;
};

export default function MoveCenter({
  lat,
  lng,
  isFullScreen,
  isEnabled,
}: Props) {
  const map = useMap();

  useEffect(() => {
    if (lat && lng) {
      // full screen 모드에서 닫힐 때 중앙으로 이동 이벤트가 동작하지 않아 setTimeout으로 간격 주어서 이동
      setTimeout(() => {
        map?.panTo({ lat, lng }, { duration: 300 });
      }, 100);
    }
  }, [lat, lng, map, isFullScreen, isEnabled]);
  return null;
}
