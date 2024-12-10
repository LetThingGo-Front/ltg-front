import React, { useEffect } from "react";
import { NaverMap, useNavermaps } from "react-naver-maps";

type Props = {
  children: React.ReactNode;
  coordinate: { lat: number; lng: number };
  isFullScreen?: boolean;
  isEnabled?: boolean;
};

export default function Maps({
  children,
  coordinate,
  isFullScreen,
  isEnabled,
}: Props) {
  return (
    <NaverMap
      defaultCenter={coordinate}
      defaultZoom={18}
      disableDoubleClickZoom={!isEnabled || !isFullScreen}
      disableDoubleTapZoom={!isEnabled || !isFullScreen}
      disableTwoFingerTapZoom={!isEnabled || !isFullScreen}
      draggable={isEnabled || isFullScreen}
      scrollWheel={isEnabled || isFullScreen}
    >
      {children}
    </NaverMap>
  );
}
