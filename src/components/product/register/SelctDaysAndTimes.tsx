"use client";

import React, { useState } from "react";
import { daysList, timeList } from "./constants/constants";
import { Codes } from "@/types/common";
import clsx from "clsx";
import SelectDaysButton from "./button/SelectDaysButton";
import TimeList from "./TimeList";
import SelectTimesButton from "./button/SelectTimesButton";

type Props = {
  isDayShare: boolean;
};

export default function SelctDaysAndTimes({ isDayShare }: Props) {
  const [selectDay, setSelectDay] = useState<Array<string>>([]); // 선택된 요일
  const [selectAllTimes, setSelectAllTimes] = useState(false); // 요일만 선택(모든 시간 선택)
  const [openTime, setOpenTime] = useState(false); // 시간대 선택 여부
  const [selectDayTime, setSelectDayTime] = useState<Array<string>>([]); // 나눔 가능 요일 시간대

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

  const handleSelectDaysButton = () => {
    if (!selectAllTimes) {
      setOpenTime(false);
    }
    setSelectAllTimes(!selectAllTimes);
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

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="flex justify-between">
        {daysList.map((d: Codes) => (
          <button
            key={d.codeSeq}
            className={clsx(
              "rounded px-1.5 py-0.5 font-semibold sm:px-4 sm:py-1 pointerhover:hover:bg-white pointerhover:hover:text-black pointerhover:hover:shadow-[0_4px_10px_0_rgba(0,0,0,0.1)] max-sm:text-xxs",
              isDayShare
                ? selectDay.includes(d.codeKorName)
                  ? "bg-green-400 text-black"
                  : "bg-black/5 text-grey-900"
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
              (selectDay.includes("주말") && /^(토|일)$/.test(d.codeKorName))
            }
          >
            {d.codeKorName}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2 sm:gap-[0.875rem]">
        {selectDay.length > 0 && (
          <SelectDaysButton
            selectAllTimes={selectAllTimes}
            setSelectAllTimes={handleSelectDaysButton}
          />
        )}

        {openTime ? (
          <TimeList
            selectTime={selectDayTime}
            addSelectTime={addSelectDayTime}
            setOpenTime={() => setOpenTime(false)}
          />
        ) : (
          <SelectTimesButton
            selectDay={selectDay}
            setOpenTime={() => setOpenTime(true)}
          />
        )}
      </div>
    </div>
  );
}
