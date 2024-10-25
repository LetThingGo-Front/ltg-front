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
  close,
  locationId,
  isSaved,
  setSaved,
  onSave,
  locationInfo,
  locationList,
}: Props) {
  console.log(`{RegistrationLocation}`);
  console.log(locationInfo);
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
    lat: locationInfo?.latitude ?? 37.5666103,
    lng: locationInfo?.longitude ?? 126.9783882,
  });
  const [simpleAddr, setSimpleAddr] = useState(""); // 간단한 주소
  const [openLocationForm, setOpenLocationForm] = useState(false);

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
    if (locationInfo?.address === address) {
      setOpenLocationForm(false);
      return;
    }
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
    onSave([...locationList, ...location]);
    setOpenLocationForm(false);
  };

  const deleteLocationInfo = () => {
    const newLocationList = locationList.filter(
      (location) => location.address !== address,
    );
    onSave(newLocationList);
    setOpenLocationForm(false);
  };

  useEffect(() => {
    if (address) {
      getGeoCode(address);
    }
  }, [address, getGeoCode]);

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
      {!openLocationForm && locationInfo?.address && (
        <div
          className={clsx(
            "flex h-[6.875rem] flex-col gap-2 rounded-lg sm:h-[13.75rem] sm:gap-5",
          )}
        >
          <div className="h-[5.625rem] sm:h-[11.25rem]">
            <RegistrationMap
              coordinate={coordinate}
              locationId={locationId}
              setSimpleAddr={setSimpleAddr}
              disableFullscreen
            />
          </div>
          <div className="flex justify-between">
            <div className="text-xxs flex gap-3 font-bold text-grey-500 sm:text-sm">
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
              className="text-xxs font-bold text-grey-300 hover:text-grey-700 sm:text-sm"
              onClick={() => setOpenLocationForm(true)}
            >
              수정하기
            </button>
          </div>
        </div>
      )}
      {openLocationForm && (
        <motion.div
          className={clsx(
            "flex h-full flex-col items-center gap-6 rounded-xl bg-ltg-gradient-b px-[1.875rem] py-[1.625rem] sm:gap-11",
          )}
          variants={locationVariants}
          initial="start"
          animate="end"
          exit="exit"
        >
          <div className="rounded bg-green-400 px-2">
            <p className="max-sm:text-xxs text-center font-bold text-grey-900">
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
                <div className="h-[0.625rem] w-[0.625rem] sm:h-4 sm:w-4">
                  <Image
                    src="/assets/images/home.svg"
                    width={16}
                    height={16}
                    alt="home"
                  />
                </div>
                <p className="text-xxxs font-bold text-grey-400 sm:text-xs">
                  집근처
                </p>
              </div>
              <div className="flex items-center p-1">
                <div className="h-[0.625rem] w-[0.625rem] sm:h-4 sm:w-4">
                  <Image
                    src="/assets/images/building.svg"
                    width={16}
                    height={16}
                    alt="company"
                  />
                </div>
                <p className="text-xxxs font-bold text-grey-400 sm:text-xs">
                  회사 근처
                </p>
              </div>
              <div className="flex items-center p-1">
                <div className="h-[0.625rem] w-[0.625rem] sm:h-4 sm:w-4">
                  <Image
                    src="/assets/images/location_marker.svg"
                    width={16}
                    height={16}
                    alt="etc"
                  />
                </div>
                <p className="text-xxxs font-bold text-grey-400 sm:text-xs">
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
          <div className="h-[7.5rem] w-full sm:h-[12.5rem]">
            <RegistrationMap
              address={address}
              coordinate={coordinate}
              setCoordinate={setCoordinate}
              setAddress={setAddress}
              setSimpleAddr={setSimpleAddr}
              locationId={locationId}
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <MinSemiTitle title="나눔 가능 일정 선택" />
            <Line />
          </div>
          <div className="flex w-full flex-col gap-3 sm:gap-9">
            <div className="flex items-center justify-between">
              <p className="max-sm:text-xxs font-semibold text-grey-800">
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
              <p className="max-sm:text-xxs font-semibold text-grey-800">
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
                    "max-sm:text-xxs px-1.5 py-0.5 font-semibold sm:px-4 sm:py-1",
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
                "max-sm:text-xxxs rounded-full bg-black/5 py-1 text-center font-semibold",
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
              className="text-xxs rounded-full bg-black px-4 py-2 font-semibold text-white sm:text-xs"
              type="button"
              onClick={saveLocationInfo}
            >
              장소 및 일정 저장
            </button>
            <button
              className="text-xxs px-4 py-2 font-semibold text-grey-700 sm:text-xs"
              onClick={deleteLocationInfo}
              type="button"
            >
              닫기
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
