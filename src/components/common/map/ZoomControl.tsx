"use client";

import React, { useEffect } from "react";
import { useMap } from "react-naver-maps";

type Props = {
  address?: string;
  zoom?: number;
};
export default function ZoomControl({ address, zoom }: Props) {
  const map = useMap();
  useEffect(() => {
    map.setZoom(zoom);
  }, [address, map, zoom]);
  return null;
}
