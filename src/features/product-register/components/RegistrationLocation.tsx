"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Line from "./Line";
import MinSemiTitle from "./MinSemiTitle";
import Image from "next/image";
import RegistrationMap from "./map/RegistrationMap";

import TextInput from "./TextInput";
import clsx from "clsx";
import Postcode from "./Postcode";
import axios from "axios";
import { motion } from "framer-motion";
import { duration } from "@/common/constants/animation/style";
import { ItemAvailabiltyDto, ItemLocationDto } from "@/models/data-contracts";
import FavoriteLocation from "./FavoriteLocation";
import { axiosAuth } from "@/lib/axios";
import { numberToDay } from "../utils/util";
import ToggleButton from "./button/ToggleButton";
import SavedFavoriteLocation from "./SavedFavoriteLocation";
import SelctDaysAndTimes from "./SelctDaysAndTimes";

type Props = {
  idx: number;
  locationCase: { locationId: string; color: string };
  onSave: (location: ItemLocationDto[]) => void;
  locationInfo: ItemLocationDto;
  locationList: ItemLocationDto[];
  isOpenLocationForm: boolean;
  setIsOpenLocationForm: (isOpen: boolean) => void;
};

export type FavoriteJuso = {
  address: string;
  description: string;
  district: string;
  dong: string;
  favoritePlaceId: number;
  latitude: number;
  longitude: number;
};

const locationVariants = {
  start: {
    opacity: 0,
    ease: "easeInOut",
    ...duration.medium,
  },
  end: {
    opacity: 1,
    ease: "easeInOut",
    ...duration.medium,
  },
  exit: { opacity: 0, ease: "easeInOut", ...duration.medium },
};
export default function RegistrationLocation({
  idx,
  locationCase,
  onSave,
  locationInfo,
  locationList,
  isOpenLocationForm,
  setIsOpenLocationForm,
}: Props) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isTodayShare, setIsTodayShare] = useState(false); // 오늘 번개 나눔 여부
  const [isDayShare, setIsDayShare] = useState(false); // 나눔 가능 요일 및 시간대 선택 여부
  const [isOpenSearchAddr, setIsOpenSearchAddr] = useState(false); // 주소 검색창 오픈 여부
  const [address, setAddress] = useState(""); // 주소
  const [addExplain, setAddExplain] = useState(""); // 장소 세부 설명
  const [coordinate, setCoordinate] = useState<{ lat: number; lng: number }>({
    lat: 37.5666103,
    lng: 126.9783882,
  });
  const [simpleAddr, setSimpleAddr] = useState(""); // 간단한 주소
  const [modifyLocation, setModifyLocation] = useState(false);
  const [selectTimeInfoList, setSelectTimeInfoList] = useState<
    ItemAvailabiltyDto[]
  >([]); // 선택된 요일 시간대
  const [favorite, setFavorite] = useState(""); // 선택된 즐겨찾기 장소
  const [isNewFavorite, setIsNewFavorite] = useState(false); // 신규 즐겨찾기 장소 버튼 여부
  const [favoriteJuso, setFavoriteJuso] = useState<FavoriteJuso>(); // 즐겨찾기 장소 정보

  const saveLocationInfo = () => {
    const newLocation: ItemLocationDto = {
      address: address,
      addressDescription: addExplain,
      district: simpleAddr.split(" ")[0],
      dong: simpleAddr.split(" ")[1],
      latitude: coordinate.lat,
      longitude: coordinate.lng,
      lightningYn: isTodayShare ? "Y" : "N",
      placeType: favorite,
      favoritePlaceId: favoriteJuso?.favoritePlaceId,
      itemAvailabilities: selectTimeInfoList,
    };
    // 인덱스 번호가 저장한 장소 정보 개수 이상일 경우 신규등록
    if (locationList.length <= idx) {
      onSave([...locationList, newLocation]);
    } else {
      // 그 외 수정단계
      const insertAndModifyList = locationList.map((loc, i) => {
        if (i === idx) {
          return newLocation;
        }
        return loc;
      });
      onSave(insertAndModifyList);
    }
    setIsOpenLocationForm(false);
    setModifyLocation(false);
  };

  const deleteLocationInfo = () => {
    const filterLocationList = locationList.filter((_, i) => i !== idx);
    onSave(filterLocationList);
    setIsOpenLocationForm(false);
    setModifyLocation(false);
  };

  const initLocationInfo = useCallback(() => {
    // save한 나눔 장소 불러오기
    if (locationInfo) {
      setFavoriteJuso(undefined);
      setAddress(locationInfo.address);
      setAddExplain(locationInfo.addressDescription ?? "");
      setSimpleAddr(`${locationInfo.district} ${locationInfo.dong}`);
      setCoordinate({
        lat: locationInfo.latitude,
        lng: locationInfo.longitude,
      });
      setIsTodayShare(locationInfo.lightningYn === "Y");
      setSelectTimeInfoList(locationInfo.itemAvailabilities ?? []);
      setFavorite(locationInfo.placeType ?? "");
    }
  }, [locationInfo]);

  const saveFavoriteLocation = () => {};

  const getFavoriteLocation = async (placeType: string) => {
    try {
      const response = await axiosAuth.get(
        `/v1/users/favorite-places/${placeType}`,
      );
      setFavoriteJuso(response.data.data[placeType]);
      setCoordinate({
        lat: response.data.data[placeType].latitude,
        lng: response.data.data[placeType].longitude,
      });
      setFavorite(placeType);
    } catch (error) {
      console.log(`get favorite location error`, error);
    }
  };

  const availableDays = useMemo(() => {
    const availableList: string[] = [];

    selectTimeInfoList.forEach((timeInfo) => {
      availableList.push(timeInfo.dayOfWeek);
    });
    const sortedList = availableList.sort((a, b) => {
      return Number(a) - Number(b);
    });

    const filteredList = [...new Set(sortedList)];
    const filteredDayList = filteredList.map((v) => numberToDay(v));
    return `${filteredDayList.join(", ")} 나눔 가능`;
  }, [selectTimeInfoList]);

  useEffect(() => {
    if (isNewFavorite) {
      setFavorite("");
    }
  }, [isNewFavorite]);

  useEffect(() => {
    initLocationInfo();
  }, [modifyLocation, locationInfo, initLocationInfo]);

  return (
    <div>
      {(isOpenLocationForm && !locationInfo?.address) || modifyLocation ? (
        <motion.div
          className={clsx(
            "flex h-full flex-col items-center gap-6 rounded-xl bg-ltg-gradient-b px-[1.875rem] py-[1.625rem] sm:gap-11",
          )}
          variants={locationVariants}
          initial="start"
          animate="end"
          exit="exit"
        >
          <div className={`rounded px-2 py-1 ${locationCase.color}`}>
            <p className="text-center font-bold text-grey-900 max-sm:text-xs">
              {locationCase.locationId}
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:gap-4">
            {/* <div className="flex flex-col gap-2">
            </div> */}
            <MinSemiTitle title="나눔 장소 설정" required />
            <Line />
            {isNewFavorite ? (
              <FavoriteLocation favorite={favorite} setFavorite={setFavorite} />
            ) : (
              <SavedFavoriteLocation
                favorite={favorite}
                getFavoriteLocation={getFavoriteLocation}
              />
            )}
            <Postcode
              addr={address}
              setAddress={setAddress}
              isOpen={isOpenSearchAddr}
              openPostcode={setIsOpenSearchAddr}
              setSimpleAddr={setSimpleAddr}
              setCoordinate={setCoordinate}
              setIsNewFavorite={setIsNewFavorite}
              favoriteJuso={favoriteJuso}
            />
            <TextInput
              placeholder="길안내 (예: 지상 강남역 12번 출구 앞)"
              clearField={() => setAddExplain("")}
              value={addExplain}
              onChange={(e) => setAddExplain(e.target.value)}
            />
          </div>
          <div
            className={clsx(
              "h-[7.5rem] w-full sm:h-[11.25rem]",
              isFullScreen
                ? "fixed left-0 top-[env(safe-area-inset-top)] z-20 h-[calc(100dvh-env(safe-area-inset-top))]"
                : "relative",
            )}
          >
            <RegistrationMap
              address={address}
              coordinate={coordinate}
              setCoordinate={setCoordinate}
              setAddress={setAddress}
              setSimpleAddr={setSimpleAddr}
              locationId={locationCase.locationId}
              isTodayShare={isTodayShare}
              setIsFullScreen={setIsFullScreen}
              isFullScreen={isFullScreen}
              setIsNewFavorite={setIsNewFavorite}
              modifyLocation={modifyLocation}
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <MinSemiTitle title="나눔 가능 일정 선택" />
            <Line />
          </div>
          <div className="flex w-full flex-col gap-3 sm:gap-9">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-grey-800 max-sm:text-xxs">
                오늘 번개 나눔
              </p>
              <ToggleButton
                toggle={() => setIsTodayShare(!isTodayShare)}
                on={isTodayShare}
              />
            </div>
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-grey-800 max-sm:text-xxs">
                  나눔 가능 요일 및 시간대 선택
                </p>
                <ToggleButton
                  toggle={() => setIsDayShare((prev) => !prev)}
                  on={isDayShare}
                  onText="나눔자"
                  offText="신청자"
                  isShort={false}
                />
              </div>
              <SelctDaysAndTimes
                isDayShare={isDayShare}
                selectTimeInfoList={selectTimeInfoList}
                setSelectTimeInfoList={setSelectTimeInfoList}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button
              className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white disabled:opacity-50 sm:text-sm"
              type="button"
              onClick={saveLocationInfo}
              disabled={
                !address || (isDayShare && selectTimeInfoList.length === 0)
              }
            >
              장소 및 일정 저장
            </button>
            <button
              className="px-4 py-2 text-xs font-semibold text-grey-700 active:text-grey-300 sm:text-sm"
              onClick={() => {
                setIsOpenLocationForm(false);
                setModifyLocation(false);
              }}
              type="button"
            >
              닫기
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="flex h-[6.875rem] flex-col gap-2 rounded-lg sm:h-[13.75rem] sm:gap-5">
          <div className="relative h-[5.625rem] sm:h-[11.25rem]">
            <RegistrationMap
              coordinate={coordinate}
              locationId={locationCase.locationId}
              setSimpleAddr={setSimpleAddr}
              disableFullscreen
              progressStatus="complete"
              isTodayShare={isTodayShare}
            />
          </div>
          <div className="flex justify-between">
            <div className="flex gap-3 text-xs font-bold text-grey-500 sm:text-sm">
              <div className="flex gap-1">
                <div className="h-4 w-4 sm:h-5 sm:w-5">
                  <Image
                    src="/assets/images/marker/location_marked.svg"
                    alt="location"
                    width={20}
                    height={21}
                  />
                </div>
                <p>{simpleAddr}</p>
              </div>
              {selectTimeInfoList.length > 0 && (
                <div className="flex gap-1">
                  <div className="h-4 w-4 sm:h-5 sm:w-5">
                    <Image
                      src="/assets/images/calendar.svg"
                      width={20}
                      height={20}
                      alt="calendar"
                    />
                  </div>
                  <p>{availableDays}</p>
                </div>
              )}
            </div>
            <div className="flex gap-2 sm:gap-6">
              <button
                type="button"
                className="text-xs font-bold text-grey-300 hover:text-grey-700 sm:text-sm"
                onClick={() => setModifyLocation(true)}
              >
                수정<span className="max-sm:hidden">하기</span>
              </button>
              <button
                type="button"
                className="text-xs font-bold text-grey-300 hover:text-grey-700 sm:text-sm"
                onClick={deleteLocationInfo}
              >
                삭제<span className="max-sm:hidden">하기</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
