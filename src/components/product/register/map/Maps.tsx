"use client";

import React, { useEffect } from "react";
import { NaverMap, useNavermaps } from "react-naver-maps";
import debounce from "debounce";
import { Latlng } from "./RegistrationMap";

type Props = {
  children: React.ReactNode;
  coordinate: { lat: number; lng: number };
  isFullScreen?: boolean;
  isEnabled?: boolean;
  searchCoordinateToAddress?: (latlng: Latlng) => void;
};

export default function Maps({
  children,
  coordinate,
  isFullScreen,
  isEnabled,
  searchCoordinateToAddress,
}: Props) {
  const setCoordinateToAddress = debounce((lat: number, lng: number) => {
    if (searchCoordinateToAddress)
      searchCoordinateToAddress({ _lat: lat, _lng: lng, x: lng, y: lat });
  }, 500);

  return (
    <NaverMap
      defaultCenter={coordinate}
      defaultZoom={18}
      disableDoubleClickZoom={!isEnabled || !isFullScreen}
      disableDoubleTapZoom={!isEnabled || !isFullScreen}
      disableTwoFingerTapZoom={!isEnabled || !isFullScreen}
      draggable={isEnabled || isFullScreen}
      scrollWheel={isEnabled || isFullScreen}
      onCenterChanged={(e) => {
        setCoordinateToAddress(e._lat, e._lng);
      }}
    >
      {children}
    </NaverMap>
  );
}
