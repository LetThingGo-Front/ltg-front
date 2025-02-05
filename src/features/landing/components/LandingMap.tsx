"use client";

import React from "react";
import { Container as MapDiv, NaverMap } from "react-naver-maps";

export default function LandingMap() {
  return (
    <MapDiv
      style={{
        height: "100%",
        borderRadius: "30px",
        overflow: "hidden",
      }}
    >
      <NaverMap
        defaultCenter={{
          lat: 37.498337,
          lng: 127.127151,
        }}
        disableDoubleClickZoom
        disableDoubleTapZoom
        disableTwoFingerTapZoom
        zoomControl={false}
        draggable={false}
        scaleControl={false}
        mapTypeControl={false}
        scrollWheel={false}
        zoom={13}
      ></NaverMap>
    </MapDiv>
  );
}
