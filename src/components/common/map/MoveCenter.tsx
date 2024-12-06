"use client";

import { useEffect } from "react";
import { useMap } from "react-naver-maps";

type Props = {
  lat: number;
  lng: number;
  isEnabled: boolean;
  isFullScreen?: boolean;
};

export default function MoveCenter({
  lat,
  lng,
  isEnabled,
  isFullScreen,
}: Props) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map?.panTo({ lat, lng }, { duration: 300 });
    }
  }, [lat, lng, map, isEnabled, isFullScreen]);
  return null;
}
