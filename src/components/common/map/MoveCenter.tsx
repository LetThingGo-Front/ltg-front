"use client";

import { useMap } from "react-naver-maps";

type Props = {
  lat: number;
  lng: number;
};

export default function MoveCenter({ lat, lng }: Props) {
  const map = useMap();
  map?.panTo({ lat, lng });
  return null;
}
