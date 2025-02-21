"use client";

import React from "react";
import { Container as MapDiv, NaverMap } from "react-naver-maps";
import ExploreLayerControl from "./ExploreLayerControl";

export default function ExploreMap() {
  return (
    <div className="relative h-full w-full rounded-[1.875rem] sm:mx-10 sm:h-[calc(100%-5.125rem)] sm:min-h-[41.875rem]">
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
          // zoomControl={false}
          // draggable={false}
          // scaleControl={false}
          // mapTypeControl={false}
          // scrollWheel={false}
          zoom={13}
        >
          <ExploreLayerControl />
        </NaverMap>
      </MapDiv>
    </div>
  );
}
