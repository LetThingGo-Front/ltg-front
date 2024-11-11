"use client";

import React, { useCallback, useEffect, useState } from "react";
import Line from "./Line";
import MinSemiTitle from "./MinSemiTitle";
import Image from "next/image";
import RegistrationMap from "./RegistrationMap";
import ToggleButton from "./ToggleButton";
import { daysList, timeList } from "./constants/constants";
import TextInput from "./TextInput";
import clsx from "clsx";
import TimeList from "./TimeList";
import Postcode from "./Postcode";
import axios from "axios";
import { motion } from "framer-motion";
import { duration } from "@/constants/animation/style";
import { ItemLocationDto } from "@/models/data-contracts";
import { useQuery } from "@tanstack/react-query";
import { fetchDaysList } from "@/data/commonData";
import { Codes } from "@/types/common";

type Props = {
  idx: number;
  locationCase: { locationId: string; color: string };
  onSave: (location: ItemLocationDto[]) => void;
  locationInfo: ItemLocationDto;
  locationList: ItemLocationDto[];
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
}: Props) {
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
  const [openLocationForm, setOpenLocationForm] = useState(false);

  const days = useQuery({
    queryKey: ["days", "IT002"],
    queryFn: ({ queryKey }) => fetchDaysList(queryKey[1]),
  });

  const toggleSelectDay = () => {
    if (isDayShare) {
      setSelectDay([]);
    }
    setIsDayShare(!isDayShare);
    setOpenTime(false);
  };

  const addSelectDay = (day: string) => {
    // 주중이면 월~금 삭제
    if (day === "주중") {
      setSelectDay((prev) => prev.filter((d) => !/^(월|화|수|목|금)$/.test(d)));
    }
    // 월~금 중 하나라도 선택되어 있으면 주중 삭제
    if (/^(월|화|수|목|금)$/.test(day)) {
      setSelectDay((prev) => prev.filter((d) => d !== "주중"));
    }
    // 주말이면 토, 일 삭제
    if (day === "주말") {
      setSelectDay((prev) => prev.filter((d) => !/^(토|일)$/.test(d)));
    }
    // 토, 일 중 하나라도 선택되어 있으면 주말 삭제
    if (/^(토|일)$/.test(day)) {
      setSelectDay((prev) => prev.filter((d) => d !== "주말"));
    }
    setSelectDay((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);
      }
      return [...prev, day];
    });
  };

  const addSelectDayTime = (time: string) => {
    /**
     * 시간 선택 정책
     * 1. 선택한 시간이 선택한 시간 목록 중 최소값과 최대값 사이에 있을 경우 스킵
     * 2. 선택한 시간 목록이 없을 경우 선택한 시간으로 설정
     * 3. 최소값과 선택한 시간이 같을 경우 최소값 삭제
     * 4. 최대값과 선택한 시간이 같을 경우 최대값 삭제
     * 5. 최소값보다 작은 시간을 선택할 경우 선택한 시간값과 최대값 사이의 시간 선택
     * 6. 최대값보다 큰 시간을 선택할 경우 선택한 시간값과 최소값 사이의 시간 선택
     */
    const selectTime = parseInt(time.split(":")[0]); // 선택한 시간의 숫자 값
    const numList = selectDayTime.map((t) => parseInt(t.split(":")[0])); // 선택한 시간 목록 숫자 값
    const min = numList.length > 0 ? Math.min(...numList) : 0; // 선택한 시간 목록 중 최소값
    const max = numList.length > 0 ? Math.max(...numList) : 0; // 선택한 시간 목록 중 최대값
    let selectTimeList: string[] = [];

    if (selectTime > min && selectTime < max) return;
    if (!numList.length) {
      selectTimeList = timeList.filter(
        (t) => parseInt(t.split(":")[0]) === selectTime,
      );
    }

    if (min === selectTime) {
      selectTimeList = timeList.filter(
        (t) =>
          parseInt(t.split(":")[0]) <= max && parseInt(t.split(":")[0]) > min,
      );
    }
    if (max === selectTime) {
      selectTimeList = timeList.filter(
        (t) =>
          parseInt(t.split(":")[0]) >= min && parseInt(t.split(":")[0]) < max,
      );
    }
    if (min && selectTime < min) {
      selectTimeList = timeList.filter(
        (t) =>
          parseInt(t.split(":")[0]) >= selectTime &&
          parseInt(t.split(":")[0]) <= max,
      );
    }
    if (max && selectTime > max) {
      selectTimeList = timeList.filter(
        (t) =>
          parseInt(t.split(":")[0]) <= selectTime &&
          parseInt(t.split(":")[0]) >= min,
      );
    }
    setSelectDayTime(selectTimeList);
  };

  const getGeoCode = useCallback(async (address: string) => {
    if (!address) {
      alert("주소를 입력하세요.");
      return;
    }
    try {
      const response = await axios.get("/api/maps/geocode", {
        params: {
          query: address,
        },
      });
      if (response.status === 200 && response.data.addresses.length > 0) {
        const { x, y } = response.data.addresses[0];
        if (setCoordinate) {
          setCoordinate({ lat: y, lng: x });
        }
      } else {
        alert("검색 결과가 없습니다.");
      }
    } catch (error) {
      console.error("지오코딩 오류: ", error);
      alert("불러오는 과정에서 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }, []);

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
        dayOfWeek: days.data?.find((d: Codes) => d.codeKorName === day)?.code,
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
    setOpenLocationForm(false);
  };

  const deleteLocationInfo = () => {
    const filterLocationList = locationList.filter((_, i) => i !== idx);
    onSave(filterLocationList);
  };

  const initLocationInfo = useCallback(() => {
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
  }, [locationInfo]);

  useEffect(() => {
    if (address) {
      getGeoCode(address);
    }
  }, [address, getGeoCode]);

  useEffect(() => {
    initLocationInfo();
  }, [initLocationInfo, locationInfo]);

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

  if (!openLocationForm && !locationInfo?.address) {
    return (
      <button
        className="flex h-[6.875rem] w-full items-center justify-center rounded-lg bg-grey-50 hover:bg-grey-100 active:bg-grey-50/70 sm:h-[11.25rem]"
        onClick={() => setOpenLocationForm(true)}
        type="button"
      >
        <Image
          src="/assets/images/button/square_plus.svg"
          width={32}
          height={32}
          alt="add"
        />
      </button>
    );
  }

  return (
    <div>
      {openLocationForm ? (
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
                    height={20}
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
                    height={20}
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
                    height={20}
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
          <div className="h-[7.5rem] w-full sm:h-[12.5rem]">
            <RegistrationMap
              address={address}
              coordinate={coordinate}
              setCoordinate={setCoordinate}
              setAddress={setAddress}
              setSimpleAddr={setSimpleAddr}
              locationId={locationCase.locationId}
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <MinSemiTitle title="나눔 가능 일정 선택" />
            <Line />
          </div>
          <div className="flex w-full flex-col gap-3 sm:gap-9">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-grey-800 max-sm:text-xs">
                오늘 번개 나눔
              </p>
              <ToggleButton
                toggle={() => setIsTodayShare(!isTodayShare)}
                on={isTodayShare}
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold text-grey-800 max-sm:text-xs">
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
            <div className="flex justify-between">
              {daysList.map((d: Codes) => (
                <button
                  key={d.codeSeq}
                  className={clsx(
                    "rounded-md px-1.5 py-0.5 font-semibold max-sm:text-xs sm:px-4 sm:py-1",
                    isDayShare
                      ? selectDay.includes(d.codeKorName)
                        ? "bg-black text-white"
                        : "bg-black/5 text-black"
                      : "text-grey-300",
                    ((selectDay.includes("주중") &&
                      /^(월|화|수|목|금)$/.test(d.codeKorName)) ||
                      (selectDay.includes("주말") &&
                        /^(토|일)$/.test(d.codeKorName))) &&
                      "bg-transparent text-grey-300",
                  )}
                  onClick={() => addSelectDay(d.codeKorName)}
                  type="button"
                  disabled={
                    !isDayShare ||
                    (selectDay.includes("주중") &&
                      /^(월|화|수|목|금)$/.test(d.codeKorName)) ||
                    (selectDay.includes("주말") &&
                      /^(토|일)$/.test(d.codeKorName))
                  }
                >
                  {d.codeKorName}
                </button>
              ))}
            </div>
            <button
              className={clsx(
                "rounded-full bg-black/5 py-1 text-center font-semibold max-sm:text-xs",
                selectDay.length === 0 ? "text-grey-300" : "text-black",
                openTime && "hidden",
              )}
              disabled={selectDay.length === 0}
              onClick={() => setOpenTime(true)}
              type="button"
            >
              시간 선택 하기
            </button>
            {openTime && (
              <TimeList
                selectTime={selectDayTime}
                addSelectTime={addSelectDayTime}
              />
            )}
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
              onClick={() => setOpenLocationForm(false)}
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
                    height={20}
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
                onClick={() => setOpenLocationForm(true)}
              >
                수정하기
              </button>
              <button
                type="button"
                className="text-xs font-bold text-grey-300 hover:text-grey-700 sm:text-sm"
                onClick={deleteLocationInfo}
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
