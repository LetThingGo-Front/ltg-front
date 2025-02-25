"use client";

import React from "react";
import { Container as MapDiv, NaverMap, Marker } from "react-naver-maps";

export default function ProductLocationMap() {
  return (
    <MapDiv
      style={{
        height: "100%",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <NaverMap
        defaultCenter={{
          lat: 37.5666103,
          lng: 126.9783882,
        }}
        zoom={16}
      >
        <Marker
          position={{
            lat: 37.5666103,
            lng: 126.9783882,
          }}
          icon={{
            url: "/assets/images/sample/marker.svg",
            size: { width: 49, height: 36 },
            scaledSize: { width: 40, height: 40 },
            anchor: { x: 25, y: 25 },
          }}
        />
      </NaverMap>
    </MapDiv>
  );
}
