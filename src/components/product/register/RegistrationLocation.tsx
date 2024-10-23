"use client";

import React, { useCallback, useEffect, useState } from "react";
import Line from "./Line";
import MinSemiTitle from "./MinSemiTitle";
import Image from "next/image";
import RegistrationMap from "./RegistrationMap";
import ToggleButton from "./ToggleButton";
import { days } from "./constants/constants";
import TextInput from "./TextInput";
import clsx from "clsx";
import TimeList from "./TimeList";
import Postcode from "./Postcode";
import axios from "axios";
import { motion } from "framer-motion";
import { duration } from "@/constants/animation/style";
import { ItemLocationDto } from "@/models/data-contracts";

type Props = {
  close: () => void;
  locationId: string;
  setSaved: (isSaved: boolean) => void;
  isSaved: boolean;
  onSave: (location: ItemLocationDto[]) => void;
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
  close,
  locationId,
  isSaved,
  setSaved,
  onSave,
}: Props) {
  const [isTodayShare, setIsTodayShare] = useState(false); // 오늘 번개 나눔 여부
  const [isDayShare, setIsDayShare] = useState(false); // 나눔 가능 요일 및 시간대 선택 여부
  const [selectDay, setSelectDay] = useState<Array<string>>([]); // 선택된 요일
  const [openTime, setOpenTime] = useState(false); // 시간대 선택 여부
  const [selectTodayTime, setSelectTodayTime] = useState<Array<string>>([]); // 오늘 번개 나눔 시간대
  const [selectDayTime, setSelectDayTime] = useState<Array<string>>([]); // 나눔 가능 요일 시간대
  const [isOpenSearchAddr, setIsOpenSearchAddr] = useState(false); // 주소 검색창 오픈 여부
  const [address, setAddress] = useState(""); // 주소
  const [addExplain, setAddExplain] = useState(""); // 장소 세부 설명
  const [coordinate, setCoordinate] = useState<{ lat: number; lng: number }>({
    lat: 37.5666103,
    lng: 126.9783882,
  });
  const [simpleAddr, setSimpleAddr] = useState(""); // 간단한 주소

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

  const addSelectTodayTime = (time: string) => {
    setSelectTodayTime((prev) => {
      if (prev.includes(time)) {
        return prev.filter((t) => t !== time);
      }
      return [...prev, time];
    });
  };

  const addSelectDayTime = (time: string) => {
    setSelectDayTime((prev) => {
      if (prev.includes(time)) {
        return prev.filter((t) => t !== time);
      }
      return [...prev, time];
    });
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

  const saveLocationInfo = () => {
    const location: ItemLocationDto[] = [
      {
        address: address,
        addressDescription: addExplain,
        district: address.split(" ")[0],
        dong: address.split(" ")[1],
        latitude: coordinate.lat,
        longitude: coordinate.lng,
        lightningYn: isTodayShare ? "Y" : "N",
        itemAvailabilities: [],
      },
    ];
    onSave(location);
    setSaved(true);
  };

  useEffect(() => {
    if (address) {
      getGeoCode(address);
    }
  }, [address, getGeoCode]);

  return (
    <div>
      {isSaved && (
        <div className="flex h-[110px] flex-col gap-2 rounded-[10px] sm:h-[220px] sm:gap-5">
          <div className="h-[90px] sm:h-[180px]">
            <RegistrationMap coordinate={coordinate} locationId={locationId} />
          </div>
          <div className="flex justify-between">
            <div className="flex gap-3 text-[10px] font-bold text-grey-500 sm:text-sm">
              <div className="flex gap-1">
                <div className="h-4 w-4 sm:h-5 sm:w-5">
                  <Image
                    src="/assets/images/location_marker.svg"
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
            <button
              type="button"
              className="text-[10px] font-bold text-grey-300 hover:text-grey-700 sm:text-sm"
              onClick={() => setSaved(false)}
            >
              수정하기
            </button>
          </div>
        </div>
      )}
      <motion.div
        className={clsx(
          "flex h-full flex-col items-center gap-[25px] rounded-[10px] bg-ltg-gradient-b px-[30px] py-[26px] sm:gap-[45px]",
          isSaved && "hidden",
        )}
        variants={locationVariants}
        initial="start"
        animate="end"
        exit="exit"
      >
        <div className="rounded-[4px] bg-green-400 px-2">
          <p className="text-center font-bold text-grey-900 max-sm:text-[10px]">
            {locationId}
          </p>
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col gap-2">
            <MinSemiTitle title="나눔 장소 설정" required />
            <Line />
          </div>
          <div className="flex gap-1">
            <div className="flex items-center p-1">
              <div className="h-[10px] w-[10px] sm:h-4 sm:w-4">
                <Image
                  src="/assets/images/home.svg"
                  width={16}
                  height={16}
                  alt="home"
                />
              </div>
              <p className="text-[8px] font-bold text-grey-400 sm:text-xs">
                집근처
              </p>
            </div>
            <div className="flex items-center p-1">
              <div className="h-[10px] w-[10px] sm:h-4 sm:w-4">
                <Image
                  src="/assets/images/building.svg"
                  width={16}
                  height={16}
                  alt="company"
                />
              </div>
              <p className="text-[8px] font-bold text-grey-400 sm:text-xs">
                회사 근처
              </p>
            </div>
            <div className="flex items-center p-1">
              <div className="h-[10px] w-[10px] sm:h-4 sm:w-4">
                <Image
                  src="/assets/images/location_marker.svg"
                  width={16}
                  height={16}
                  alt="etc"
                />
              </div>
              <p className="text-[8px] font-bold text-grey-400 sm:text-xs">
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
            placeholder="길안내(예: 지상 강남역 12번 출구 앞)"
            clearField={() => setAddExplain("")}
            value={addExplain}
            onChange={(e) => setAddExplain(e.target.value)}
          />
        </div>
        <div className="h-[120px] w-full sm:h-[200px]">
          <RegistrationMap
            address={address}
            coordinate={coordinate}
            setCoordinate={setCoordinate}
            setAddress={setAddress}
            locationId={locationId}
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <MinSemiTitle title="나눔 가능 일정 선택" />
          <Line />
        </div>
        <div className="flex w-full flex-col gap-3 sm:gap-9">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-grey-800 max-sm:text-[10px]">
              오늘 번개 나눔
            </p>
            <ToggleButton
              toggle={() => setIsTodayShare(!isTodayShare)}
              on={isTodayShare}
            />
          </div>
          {isTodayShare && (
            <TimeList
              selectTime={selectTodayTime}
              addSelectTime={addSelectTodayTime}
            />
          )}
          <div className="flex items-center justify-between">
            <p className="font-semibold text-grey-800 max-sm:text-[10px]">
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
            {days.map((day, i) => (
              <button
                key={day}
                className={clsx(
                  "px-1.5 py-0.5 font-semibold max-sm:text-[10px] sm:px-4 sm:py-1",
                  isDayShare ? "rounded" : "text-grey-300",
                  selectDay.includes(day)
                    ? "bg-black text-white"
                    : isDayShare && "bg-black/5 text-black",
                )}
                onClick={() => addSelectDay(day)}
                type="button"
                disabled={!isDayShare}
              >
                {day}
              </button>
            ))}
          </div>
          <button
            className={clsx(
              "rounded-full bg-black/5 py-1 text-center font-semibold max-sm:text-[8px]",
              selectDay.length === 0 ? "text-grey-300" : "text-black",
              openTime && "hidden",
            )}
            disabled={selectDay.length === 0}
            onClick={() => setOpenTime(true)}
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
            className="rounded-full bg-black px-4 py-2 text-[10px] font-semibold text-white sm:text-xs"
            type="button"
            onClick={saveLocationInfo}
          >
            장소 및 일정 저장
          </button>
          <button
            className="px-4 py-2 text-[10px] font-semibold text-grey-700 sm:text-xs"
            onClick={close}
            type="button"
          >
            닫기
          </button>
        </div>
      </motion.div>
    </div>
  );
}
