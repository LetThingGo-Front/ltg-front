"use client";

import { useEffect } from "react";
import { useMap } from "react-naver-maps";

type Props = {
  lat: number;
  lng: number;
  isDisabled?: boolean;
};

export default function MoveCenter({ lat, lng, isDisabled }: Props) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map?.panTo({ lat, lng }, { duration: 500 });
    }
  }, [lat, lng, map, isDisabled]);
  return null;
}
