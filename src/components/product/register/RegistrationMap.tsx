"use client";

import LoadingMapSpinner from "@/components/common/LoadingMapSpinner";
import FullScreenButton from "@/components/common/map/FullScreenButton";
import FullScreenTextButton from "@/components/common/map/FullScreenTextButton";
import MoveCenter from "@/components/common/map/MoveCenter";
import ZoomControl from "@/components/common/map/ZoomControl";
import axios from "axios";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Container as MapDiv, NaverMap, Marker } from "react-naver-maps";
import debounce from "debounce";

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

const markerIconList = {
  marker: {
    url: "/assets/images/marker/marker.png",
    size: { width: 69, height: 68 },
    scaledSize: { width: 69, height: 68 },
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

export default memo(function RegisterMap({
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
  const [isMovingMarker, setIsMovingMarker] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(1920);

  const getMarkerIcon = () => {
    return windowWidth < 640
      ? isTodayShare
        ? markerIconList.thunderMarkerSm
        : markerIconList.markerSm
      : isTodayShare
        ? markerIconList.thunderMarker
        : markerIconList.marker;
  };

  const getWindowSize = debounce(() => {
    setWindowWidth(window.innerWidth);
  }, 100);

  const markerIcon = getMarkerIcon();

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
    window.addEventListener("resize", getWindowSize);
    return () => {
      window.removeEventListener("resize", getWindowSize);
    };
  }, [getWindowSize]);

  useEffect(() => {
    getMarkerIcon();
  }, [isTodayShare]);

  useEffect(() => {
    getWindowSize();
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
        } else {
          setIsEnabled(false);
        }
      });
    }
    return () => {
      if (mapElement) {
        mapElement.removeEventListener("fullscreenchange", () => {
          if (document.fullscreenElement) {
            setIsEnabled(true);
          } else {
            setIsEnabled(false);
          }
        });
      }
    };
  }, []);

  useEffect(() => {
    // 지도 화면 짤림 현상 대응
    window.dispatchEvent(new Event("resize"));
  }, [isEnabled, isFullScreen]);

  return (
    <MapDiv
      style={{
        height: "100%",
        borderRadius: "0.625rem",
        overflow: "hidden",
        position: "relative",
        border: "0.5px solid #E8E8E8",
      }}
      id={locationId}
    >
      {progressStatus === "complete" && (
        <div className="absolute m-3 h-[1.5625rem] w-[4.625rem] rounded bg-[#303030]/50 p-1 text-center text-xs font-bold text-white backdrop-blur-sm">
          {locationId}
        </div>
      )}
      <NaverMap
        defaultCenter={coordinate}
        defaultZoom={18}
        disableDoubleClickZoom={!isEnabled || !isFullScreen}
        disableDoubleTapZoom={!isEnabled || !isFullScreen}
        disableTwoFingerTapZoom={!isEnabled || !isFullScreen}
        draggable={isEnabled || isFullScreen}
        scrollWheel={isEnabled || isFullScreen}
      >
        <FullScreenButton
          id={locationId}
          isFullScreen={isFullScreen}
          setIsFullScreen={() => {
            setIsFullScreen && setIsFullScreen(!isFullScreen);
          }}
        />
        {!disableFullscreen && address && (
          <FullScreenButton
            id={locationId}
            isFullScreen={isFullScreen}
            setIsFullScreen={() => {
              setIsFullScreen && setIsFullScreen(!isFullScreen);
            }}
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
              />
            </div>
          )}
        {(isEnabled ||
          progressStatus === "complete" ||
          address ||
          isFullScreen) && (
          <Marker
            position={coordinate}
            draggable={isEnabled || isFullScreen}
            icon={markerIcon}
            onDragend={(e) => {
              setIsMovingMarker(true);
              getReverseGeoCode(e.coord.y, e.coord.x);
            }}
          />
        )}
        <MoveCenter lat={coordinate.lat} lng={coordinate.lng} />
        <ZoomControl address={address} zoom={18} />
      </NaverMap>
      {isMovingMarker && <LoadingMapSpinner />}
    </MapDiv>
  );
});
