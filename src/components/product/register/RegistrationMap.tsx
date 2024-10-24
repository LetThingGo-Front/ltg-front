"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import FullScreenButton from "@/components/common/map/FullScreenButton";
import MoveCenter from "@/components/common/map/MoveCenter";
import ZoomControl from "@/components/common/map/ZoomControl";
import axios from "axios";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Container as MapDiv, NaverMap, Marker } from "react-naver-maps";

type Props = {
  address?: string;
  setAddress?: (address: string) => void;
  coordinate: { lat: number; lng: number };
  setCoordinate?: (coord: { lat: number; lng: number }) => void;
  locationId: string;
  setSimpleAddr?: (address: string) => void;
};

export default memo(function RegisterMap({
  address,
  setAddress,
  coordinate,
  setCoordinate,
  locationId,
  setSimpleAddr,
}: Props) {
  const [isMovingMarker, setIsMovingMarker] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const getReverseGeoCode = useCallback(
    async (lat: number, lng: number) => {
      if (!lat || !lng) {
        alert("좌표를 불러오는데 실패했어요.");
        return;
      }
      try {
        const response = await axios.get("/api/maps/geocode/reverse", {
          params: {
            coords: `${lng},${lat}`,
          },
        });
        if (response.status === 200) {
          if (response.data.status.code === 0) {
            const address = response.data.results[0];
            const { land, region } = address;
            let fullAddress = `${region.area1.alias} ${region.area2.name} ${land.name} ${land.number1} ${land.number2}`;
            const extraAddress = [region.area3.name, land.addition0.value]
              .filter((item) => item !== "")
              .join(", ");

            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
            if (setAddress && setSimpleAddr) {
              setAddress(fullAddress);
              setSimpleAddr(`${region.area2.name} ${region.area3.name}`);
            }
          }
          if (response.data.status.code === 3) {
            alert("해당 위치의 정확한 주소를 모르겠어요. 😥");
          }
          if (response.data.status.code === 100) {
            alert("요청 정보를 다시 확인해주세요. ☹️");
          }
          if (response.data.status.code === 900) {
            alert("알 수 없는 오류가 발생했어요. 😳");
          }
        }
        setIsMovingMarker(false);
      } catch (error) {
        console.error("지오코딩 오류: ", error);
        alert("주소 정보를 불러오는데 실패했어요. 😳");
        setIsMovingMarker(false);
      }
    },
    [setAddress, setSimpleAddr],
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (setCoordinate) {
          setCoordinate({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        }
      },
      (error) => {
        console.error("위치 정보를 가져오는데 실패했습니다: ", error);
      },
    );
  }, [setCoordinate]);

  useEffect(() => {
    const mapElement = document.getElementById(locationId);
    if (mapElement) {
      mapElement.addEventListener("fullscreenchange", () => {
        if (document.fullscreenElement) {
          setIsDisabled(true);
        } else {
          setIsDisabled(false);
        }
      });
    }
    return () => {
      if (mapElement) {
        mapElement.removeEventListener("fullscreenchange", () => {
          if (document.fullscreenElement) {
            setIsDisabled(true);
          } else {
            setIsDisabled(false);
          }
        });
      }
    };
  }, [locationId]);

  return (
    <MapDiv
      style={{
        height: "100%",
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
        border: "0.5px solid #E8E8E8",
      }}
      id={locationId}
    >
      {locationId && (
        <div className="absolute m-3 h-[25px] w-[74px] rounded bg-[#303030]/50 p-1 text-center text-xs font-bold text-white backdrop-blur-sm">
          {locationId}
        </div>
      )}
      <NaverMap
        defaultCenter={coordinate}
        defaultZoom={18}
        disableDoubleClickZoom={isDisabled}
        disableDoubleTapZoom={isDisabled}
        disableTwoFingerTapZoom={isDisabled}
        draggable={isDisabled}
        scrollWheel={isDisabled}
      >
        <FullScreenButton id={locationId} />
        <Marker
          position={coordinate}
          draggable={isDisabled}
          icon={{
            url: "/assets/images/sample/marker.svg",
            size: { width: 49, height: 36 },
            scaledSize: { width: 40, height: 40 },
            anchor: { x: 25, y: 25 },
          }}
          onDragend={(e) => {
            setIsMovingMarker(true);
            getReverseGeoCode(e.coord.y, e.coord.x);
          }}
        />
        <MoveCenter
          lat={coordinate.lat}
          lng={coordinate.lng}
          isDisabled={isDisabled}
        />
        <ZoomControl address={address} zoom={18} />
      </NaverMap>
      {isMovingMarker && <LoadingSpinner />}
    </MapDiv>
  );
});
