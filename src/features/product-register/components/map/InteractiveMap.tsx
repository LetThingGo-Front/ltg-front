"use client";

import React from "react";
import { NaverMap } from "react-naver-maps";
import debounce from "debounce";
import { Latlng } from "./LocationRegistrationMap";

type Props = {
  children: React.ReactNode;
  coordinate: { lat: number; lng: number };
  isFullScreen?: boolean;
  isEnabled?: boolean;
  searchCoordinateToAddress?: (latlng: Latlng) => void;
};

export default function InteractiveMap({
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
