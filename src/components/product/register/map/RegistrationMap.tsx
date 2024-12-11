"use client";

import LoadingMapSpinner from "@/components/common/LoadingMapSpinner";
import FullScreenButton from "@/components/common/map/FullScreenButton";
import FullScreenTextButton from "@/components/common/map/FullScreenTextButton";
import MoveCenter from "@/components/common/map/MoveCenter";
import ZoomControl from "@/components/common/map/ZoomControl";
import axios from "axios";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Container as MapDiv, Marker, useNavermaps } from "react-naver-maps";
import debounce from "debounce";
import Maps from "./Maps";

type Latlng = {
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
  const [isEnabled, setIsEnabled] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(1920);
  const [viewportHeight, setViewportHeight] = useState<number>(1080);
  const [zoom, setZoom] = useState<number>(17);
  const navermaps = useNavermaps();
  const searchAddressToCoordinate = (address: string) => {
    if (!address) {
      alert("주소를 입력하세요.");
      return;
    }
    navermaps.Service.geocode(
      {
        query: address,
      },
      (status: number, response: any) => {
        if (status === 200) {
          if (response.v2.meta.totalCount === 0) {
            console.log("searchAddressToCoordinate 검색 결과가 없습니다.");
          } else {
            const { x, y } = response.v2.addresses[0];
            if (setCoordinate) {
              setCoordinate({ lat: y, lng: x });
            }
          }
        }
      },
    );
  };

  const searchCoordinateToAddress = (latlng: Latlng) => {
    navermaps.Service.reverseGeocode(
      {
        coords: latlng,
        orders: [navermaps.Service.OrderType.ROAD_ADDR].join(","),
      },
      (status: number, response: any) => {
        if (status === 200) {
          if (response.v2.status.code === 0) {
            const address = response.v2.results[0];
            console.log(address);
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
          if (response.v2.status.code === 3) {
            alert("해당 위치의 정확한 주소를 모르겠어요. 😥");
          }
          if (response.v2.status.code === 100) {
            alert("요청 정보를 다시 확인해주세요. ☹️");
          }
          if (response.v2.status.code === 900) {
            alert("알 수 없는 오류가 발생했어요. 😳");
          }
        }
      },
    );
  };

  const getMarkerIcon = useMemo(() => {
    return windowWidth < 640
      ? isTodayShare
        ? markerIconList.thunderMarkerSm
        : markerIconList.markerSm
      : isTodayShare
        ? markerIconList.thunderMarker
        : markerIconList.marker;
  }, [windowWidth, isTodayShare]);

  const getWindowSize = debounce(() => {
    setWindowWidth(window.innerWidth);
  }, 100);

  useEffect(() => {
    window.visualViewport?.addEventListener("resize", () => {
      console.log("뷰포트 높이:", window.visualViewport?.height);
      console.log("뷰포트 너비:", window.visualViewport?.width);
      console.log("창 높이:", window.innerHeight);
      console.log("창 너비:", window.innerWidth);
      alert(
        `뷰포트 높이: ${window.visualViewport?.height}
        뷰포트 너비: ${window.visualViewport?.width}
        창 높이: ${window.innerHeight}
        창 너비: ${window.innerWidth}`,
      );
      setViewportHeight(window.visualViewport?.height ?? 0);

      if (
        window.visualViewport &&
        window.visualViewport.height < window.innerHeight
      ) {
        console.log("키보드가 열렸습니다.");
      } else {
        console.log("키보드가 닫혔습니다.");
      }
    });
    return () => {
      window.visualViewport?.removeEventListener("resize", getWindowSize);
    };
  }, [viewportHeight]);

  useEffect(() => {
    window.addEventListener("resize", getWindowSize);
    return () => {
      window.removeEventListener("resize", getWindowSize);
    };
  }, [getWindowSize]);

  useEffect(() => {
    if (address) {
      searchAddressToCoordinate(address);
    }
  }, [address]);

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

  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [isEnabled, isFullScreen]);

  return (
    <MapDiv
      style={{
        height: "100%",
        borderRadius: isFullScreen ? "0" : "0.625rem",
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
      <Maps
        coordinate={coordinate}
        isEnabled={isEnabled}
        isFullScreen={isFullScreen}
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
        {(isEnabled ||
          progressStatus === "complete" ||
          address ||
          isFullScreen) && (
          <Marker
            position={coordinate}
            draggable={isEnabled || isFullScreen}
            icon={getMarkerIcon}
            onDragend={(e) => {
              searchCoordinateToAddress(e.coord);
            }}
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
  );
});
