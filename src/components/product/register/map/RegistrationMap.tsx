"use client";

import FullScreenButton from "@/components/common/map/FullScreenButton";
import FullScreenTextButton from "@/components/common/map/FullScreenTextButton";
import MoveCenter from "@/components/common/map/MoveCenter";
import ZoomControl from "@/components/common/map/ZoomControl";
import axios from "axios";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Container as MapDiv, Marker, useNavermaps } from "react-naver-maps";
import Maps from "./Maps";
import { isMobile } from "react-device-detect";
import Image from "next/image";
import clsx from "clsx";
import AddressModal from "../AddressModal";

export type Latlng = {
  y: number;
  _lat: number;
  x: number;
  _lng: number;
};

type Props = {
  address?: string;
  setAddress?: (address: string) => void;
  coordinate: { lat: number; lng: number };
  setCoordinate?: (coord: { lat: number; lng: number }) => void;
  locationId: string;
  setSimpleAddr?: (address: string) => void;
  disableFullscreen?: boolean;
  isTodayShare?: boolean;
  progressStatus?: "register" | "complete";
  setIsFullScreen?: (isFullScreen: boolean) => void;
  isFullScreen?: boolean;
};

type SearchLocationInfo = {
  address: string;
  simpleAddr: string;
  coordinate: { lat: number; lng: number };
};

const markerIconList = {
  marker: {
    url: "/assets/images/marker/marker.png",
    size: { width: 68, height: 68 },
    scaledSize: { width: 68, height: 68 },
    anchor: { x: 34, y: 34 },
  },
  markerSm: {
    url: "/assets/images/marker/marker_sm.png",
    size: { width: 126, height: 64 },
    scaledSize: { width: 126, height: 64 },
    anchor: { x: 63, y: 32 },
  },
  thunderMarker: {
    url: "/assets/images/marker/thunder_marker.png",
    size: { width: 126, height: 96 },
    scaledSize: { width: 126, height: 96 },
    anchor: { x: 63.2, y: 56 },
  },
  thunderMarkerSm: {
    url: "/assets/images/marker/thunder_marker_sm.png",
    size: { width: 126, height: 73 },
    scaledSize: { width: 126, height: 73 },
    anchor: { x: 63, y: 41 },
  },
};

const INIT_SEARCH_LOCATION_INFO = {
  address: "",
  simpleAddr: "",
  coordinate: { lat: 0, lng: 0 },
};

export default memo(function RegistrationMap({
  address,
  setAddress,
  coordinate,
  setCoordinate,
  locationId,
  setSimpleAddr,
  disableFullscreen = false,
  isTodayShare,
  progressStatus = "register",
  setIsFullScreen,
  isFullScreen,
}: Props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [zoom, setZoom] = useState<number>(17);
  const [isDraggingMap, setIsDraggingMap] = useState(false);
  const [searchLocationInfo, setSearchLocationInfo] =
    useState<SearchLocationInfo>(INIT_SEARCH_LOCATION_INFO);
  const navermaps = useNavermaps();

  const searchCoordinateToAddress = useCallback(
    (latlng: Latlng) => {
      navermaps.Service.reverseGeocode(
        {
          coords: latlng,
          orders: [navermaps.Service.OrderType.ROAD_ADDR].join(","),
        },
        (status: number, response: any) => {
          if (status === 200) {
            if (response.v2.status.code === 0) {
              const address = response.v2.results[0];

              const { land, region } = address;
              let fullAddress = `${region.area1.alias} ${region.area2.name} ${land.name} ${land.number1} ${land.number2}`;
              const extraAddress = [region.area3.name, land.addition0.value]
                .filter((item) => item !== "")
                .join(", ");

              fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";

              const locationInfo = {
                address: fullAddress,
                simpleAddr: `${region.area2.name} ${region.area3.name}`,
                coordinate: { lat: latlng.y, lng: latlng.x },
              };
              setSearchLocationInfo(locationInfo);
            } else {
              if (response.v2.status.code === 3) {
                console.log("해당 위치의 정확한 주소를 모르겠어요. 😥");
              }
              if (response.v2.status.code === 100) {
                console.log("요청 정보를 다시 확인해주세요. ☹️");
              }
              if (response.v2.status.code === 900) {
                console.log("알 수 없는 오류가 발생했어요. 😳");
              }
            }
          }
        },
      );
    },
    [navermaps.Service],
  );

  const getMarkerIcon = useMemo(() => {
    return isMobile
      ? isTodayShare
        ? markerIconList.thunderMarkerSm
        : markerIconList.markerSm
      : isTodayShare
        ? markerIconList.thunderMarker
        : markerIconList.marker;
  }, [isTodayShare]);

  const saveLocation = () => {
    if (setAddress) {
      setAddress(searchLocationInfo.address);
    }
    if (setSimpleAddr) {
      setSimpleAddr(searchLocationInfo.simpleAddr);
    }
    if (setCoordinate) {
      setCoordinate(searchLocationInfo.coordinate);
    }
    if (setIsFullScreen) {
      setIsFullScreen(false);
    }
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    // 주소가 없는 최초의 상태에서만 현위치로 이동(위치 권한 허용시)
    if (!address) {
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
    }

    const mapElement = document.getElementById(locationId);
    if (mapElement) {
      mapElement.addEventListener("fullscreenchange", () => {
        if (document.fullscreenElement) {
          setIsEnabled(true);
          setZoom(18);
        } else {
          setIsEnabled(false);
          setZoom(17);
        }
      });
    }
    return () => {
      if (mapElement) {
        mapElement.removeEventListener("fullscreenchange", () => {
          if (document.fullscreenElement) {
            setIsEnabled(true);
            setZoom(18);
          } else {
            setIsEnabled(false);
            setZoom(17);
          }
        });
      }
    };
  }, []);
  console.log({ isEnabled, isFullScreen, addres: searchLocationInfo.address });
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
    setSearchLocationInfo(INIT_SEARCH_LOCATION_INFO);
  }, [isEnabled, isFullScreen]);

  return (
    <div
      id={locationId}
      className={clsx("relative h-full w-full", isMobile && "select-none")}
    >
      <MapDiv
        style={{
          height: "100%",
          borderRadius: isFullScreen ? "0" : "0.625rem",
          overflow: "hidden",
          position: "relative",
          border: "0.5px solid #E8E8E8",
        }}
        onMouseDown={() => {
          setIsDraggingMap(true);
        }}
        onMouseUp={() => {
          setIsDraggingMap(false);
        }}
        onTouchStart={() => {
          setIsDraggingMap(true);
        }}
        onTouchEnd={() => {
          setIsDraggingMap(false);
        }}
      >
        {progressStatus === "complete" && (
          <div className="absolute m-3 h-[1.5625rem] w-[4.625rem] rounded bg-[#303030]/50 p-1 text-center text-xs font-bold text-white backdrop-blur-sm">
            {locationId}
          </div>
        )}
        <Maps
          coordinate={coordinate}
          isEnabled={isEnabled}
          isFullScreen={isFullScreen}
          searchCoordinateToAddress={searchCoordinateToAddress}
        >
          {(document.fullscreenElement ||
            (!disableFullscreen && address) ||
            address ||
            isFullScreen) && (
            <FullScreenButton
              id={locationId}
              isFullScreen={isFullScreen}
              setIsFullScreen={() => {
                setIsFullScreen && setIsFullScreen(!isFullScreen);
              }}
              setZoom={setZoom}
            />
          )}
          {!isEnabled &&
            progressStatus === "register" &&
            !address &&
            !isFullScreen && (
              <div className="absolute inset-0 flex items-center justify-center">
                <FullScreenTextButton
                  id={locationId}
                  setIsFullScreen={() => {
                    setIsFullScreen && setIsFullScreen(true);
                  }}
                  setZoom={setZoom}
                />
              </div>
            )}
          {((address && !isEnabled && !isFullScreen) ||
            progressStatus === "complete") && (
            <Marker
              position={coordinate}
              draggable={false}
              icon={getMarkerIcon}
              // onDragend={(e) => {
              //   searchCoordinateToAddress(e.coord);
              // }}
            />
          )}
          {(isEnabled || isFullScreen) && (
            <Image
              className={clsx(
                "absolute z-10",
                // isDraggingMap && "opacity-50",
                isMobile
                  ? "left-[calc(50%-63px)] top-[calc(50%-32px)]"
                  : "left-[calc(50%-34px)] top-[calc(50%-34px)]",
              )}
              src={
                isMobile
                  ? "/assets/images/marker/marker_sm.png"
                  : "/assets/images/marker/marker.png"
              }
              width={isMobile ? 126 : 68}
              height={isMobile ? 64 : 68}
              alt="marker"
            />
          )}
          <MoveCenter
            lat={coordinate.lat}
            lng={coordinate.lng}
            isFullScreen={isFullScreen}
            isEnabled={isEnabled}
          />
          <ZoomControl address={address} zoom={zoom} />
        </Maps>
      </MapDiv>
      {(isEnabled || isFullScreen) && searchLocationInfo.address && (
        <AddressModal
          address={searchLocationInfo.address}
          saveLocation={saveLocation}
        />
      )}
    </div>
  );
});
