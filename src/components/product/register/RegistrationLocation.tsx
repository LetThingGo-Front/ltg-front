"use client";

import React, { useEffect, useState } from "react";
import Line from "./Line";
import MinSemiTitle from "./MinSemiTitle";
import Image from "next/image";
import RegistrationMap from "./map/RegistrationMap";
import ToggleButton from "./button/ToggleButton";
import { daysList, timeList } from "./constants/constants";
import TextInput from "./TextInput";
import clsx from "clsx";
import Postcode from "./Postcode";
import axios from "axios";
import { motion } from "framer-motion";
import { duration } from "@/constants/animation/style";
import { ItemLocationDto } from "@/models/data-contracts";
import { useQuery } from "@tanstack/react-query";
import { fetchDaysList } from "@/data/commonData";
import { Codes } from "@/types/common";
import { LONG_TIME, MIDDLE_TIME } from "@/constants/time";
import { DAYS_CODE } from "@/constants/code";
import SelctDaysAndTimes from "./SelctDaysAndTimes";
import daysData from "@/mocks/data/code/daysData.json";

type Props = {
  idx: number;
  locationCase: { locationId: string; color: string };
  onSave: (location: ItemLocationDto[]) => void;
  locationInfo: ItemLocationDto;
  locationList: ItemLocationDto[];
  isOpenLocationForm: boolean;
  setIsOpenLocationForm: (isOpen: boolean) => void;
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
  const [selectDay, setSelectDay] = useState<Array<string>>([]); // 선택된 요일
  const [openTime, setOpenTime] = useState(false); // 시간대 선택 여부
  const [selectDayTime, setSelectDayTime] = useState<Array<string>>([]); // 나눔 가능 요일 시간대
  const [isOpenSearchAddr, setIsOpenSearchAddr] = useState(false); // 주소 검색창 오픈 여부
  const [address, setAddress] = useState(""); // 주소
  const [addExplain, setAddExplain] = useState(""); // 장소 세부 설명
  const [coordinate, setCoordinate] = useState<{ lat: number; lng: number }>({
    lat: 37.5666103,
    lng: 126.9783882,
  });
  const [simpleAddr, setSimpleAddr] = useState(""); // 간단한 주소
  const [modifyLocation, setModifyLocation] = useState(false);

  // const days = useQuery({
  //   queryKey: ["days", DAYS_CODE],
  //   queryFn: ({ queryKey }) => fetchDaysList(queryKey[1]),
  //   staleTime: MIDDLE_TIME,
  //   gcTime: LONG_TIME,
  // });

  const days = { data: daysData[DAYS_CODE] };

  const toggleSelectDay = () => {
    if (isDayShare) {
      setSelectDay([]);
    }
    setIsDayShare(!isDayShare);
    setOpenTime(false);
  };

  const processItemAvailabilities = () => {
    const numberTimeList = selectDayTime.map((time) =>
      Number(time.split(":")[0]),
    );
    const min = Math.min(...numberTimeList);
    const max = Math.max(...numberTimeList);
    let newSelectDay: string[] = [];
    if (selectDay.includes("주중")) {
      newSelectDay.push("월", "화", "수", "목", "금");
    }
    if (selectDay.includes("주말")) {
      newSelectDay.push("토", "일");
    }
    const filteredDay = [
      ...newSelectDay,
      ...selectDay.filter((day) => !["주중", "주말"].includes(day)),
    ];

    const itemAvailabilities = filteredDay.map((day) => {
      return {
        dayOfWeek:
          days.data.find((d: Codes) => d.codeKorName === day)?.code ?? "0",
        startTime: min < 10 ? `0${min}00` : `${min}00`,
        endTime: max < 10 ? `0${max}59` : `${max}59`,
      };
    });
    return itemAvailabilities;
  };
  const saveLocationInfo = () => {
    const newLocation: ItemLocationDto = {
      address: address,
      addressDescription: addExplain,
      district: simpleAddr.split(" ")[0],
      dong: simpleAddr.split(" ")[1],
      latitude: coordinate.lat,
      longitude: coordinate.lng,
      lightningYn: isTodayShare ? "Y" : "N",
      itemAvailabilities: processItemAvailabilities(),
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

  const initLocationInfo = () => {
    // save한 나눔 장소 불러오기
    if (locationInfo) {
      setAddress(locationInfo.address);
      setAddExplain(locationInfo.addressDescription ?? "");
      setSimpleAddr(`${locationInfo.district} ${locationInfo.dong}`);
      setCoordinate({
        lat: locationInfo.latitude,
        lng: locationInfo.longitude,
      });
      setIsTodayShare(locationInfo.lightningYn === "Y");
      if (locationInfo.itemAvailabilities?.length) {
        setIsDayShare(true);
        const selectDayList = locationInfo.itemAvailabilities.map((item) => {
          return (
            daysList.find((d: Codes) => d.code === item.dayOfWeek)
              ?.codeKorName ?? ""
          );
        });
        setSelectDay(selectDayList);
        const selectTimelist = timeList.filter((time) => {
          if (
            Number(time.split(":")[0]) >=
              Number(
                locationInfo.itemAvailabilities?.[0].startTime?.slice(0, 2),
              ) &&
            Number(time.split(":")[0]) <=
              Number(locationInfo.itemAvailabilities?.[0].endTime?.slice(0, 2))
          ) {
            return time;
          }
        });
        setSelectDayTime(selectTimelist);
      } else {
        setIsDayShare(false);
        setSelectDay([]);
        setSelectDayTime([]);
      }
    }
  };

  useEffect(() => {
    initLocationInfo();
  }, [modifyLocation, locationInfo]);

  useEffect(() => {
    const weekly = ["월", "화", "수", "목", "금"];
    const weekend = ["토", "일"];
    if (weekly.every((day) => selectDay.includes(day))) {
      // 월 ~ 금 빼고 주중 추가
      setSelectDay([...selectDay.filter((d) => !weekly.includes(d)), "주중"]);
    }
    if (weekend.every((day) => selectDay.includes(day))) {
      // 토, 일 빼고 주말 추가
      setSelectDay([...selectDay.filter((d) => !weekend.includes(d)), "주말"]);
    }
  }, [selectDay]);

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
            <div className="flex gap-2">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 sm:h-5 sm:w-5">
                  <Image
                    src="/assets/images/home.svg"
                    width={20}
                    height={21}
                    alt="home"
                  />
                </div>
                <p className="text-xs font-bold text-grey-400 sm:text-sm">
                  집근처
                </p>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 sm:h-5 sm:w-5">
                  <Image
                    src="/assets/images/building.svg"
                    width={20}
                    height={21}
                    alt="company"
                  />
                </div>
                <p className="text-xs font-bold text-grey-400 sm:text-sm">
                  회사 근처
                </p>
              </div>
              <div className="flex items-center gap-1">
                <div className="mt-[1px] h-4 w-4 sm:h-5 sm:w-5">
                  <Image
                    src="/assets/images/marker/location_marked.svg"
                    width={20}
                    height={21}
                    alt="etc"
                  />
                </div>
                <p className="text-xs font-bold text-grey-400 sm:text-sm">
                  기타
                </p>
              </div>
            </div>
            <Postcode
              addr={address}
              setAddress={setAddress}
              isOpen={isOpenSearchAddr}
              openPostcode={setIsOpenSearchAddr}
              setSimpleAddr={setSimpleAddr}
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
              isFullScreen &&
                "fixed left-0 top-[env(safe-area-inset-top)] z-20 h-[calc(100dvh-env(safe-area-inset-top))]",
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
                  toggle={() => toggleSelectDay()}
                  on={isDayShare}
                  onText="나눔자"
                  offText="신청자"
                  isShort={false}
                />
              </div>
              <SelctDaysAndTimes isDayShare={isDayShare} />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button
              className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white disabled:opacity-50 sm:text-sm"
              type="button"
              onClick={saveLocationInfo}
              disabled={
                !address ||
                (isDayShare &&
                  (selectDay.length === 0 || selectDayTime.length === 0))
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
          <div className="h-[5.625rem] sm:h-[11.25rem]">
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
              <div className="flex gap-1">
                <div className="h-4 w-4 sm:h-5 sm:w-5">
                  <Image
                    src="/assets/images/calendar.svg"
                    width={20}
                    height={20}
                    alt="calendar"
                  />
                </div>
                <p>주중 나눔 가능</p>
              </div>
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
