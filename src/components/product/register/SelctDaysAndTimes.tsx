"use client";

import React, { useEffect, useMemo, useState } from "react";
import { daysList, timeList } from "./constants/constants";
import { Codes } from "@/types/common";
import clsx from "clsx";
import SelectDaysButton from "./button/SelectDaysButton";
import TimeList from "./TimeList";
import SelectTimesButton from "./button/SelectTimesButton";
import { ItemAvailabiltyDto } from "@/models/data-contracts";
import { LONG_TIME, MIDDLE_TIME } from "@/constants/time";
import { getDaysList } from "@/data/commonData";
import { useQuery } from "@tanstack/react-query";
import { DAYS_CODE } from "@/constants/code";
import daysData from "@/mocks/data/code/daysData.json";

type Props = {
  isDayShare: boolean;
  selectTimeInfoList: ItemAvailabiltyDto[];
  setSelectTimeInfoList: React.Dispatch<
    React.SetStateAction<ItemAvailabiltyDto[]>
  >;
};

const WEEKDAYS_CODE = "8";
const WEEKENDS_CODE = "9";
const WEEKDAYS_REGEX = /[1-5]/;
const WEEKEND_REGEX = /[6-7]/;

export default function SelctDaysAndTimes({
  isDayShare,
  selectTimeInfoList,
  setSelectTimeInfoList,
}: Props) {
  const [openTime, setOpenTime] = useState(false); // 시간대 선택 여부
  const [activeDay, setActiveDay] = useState<string>(""); // 선택된 요일

  const days = useQuery({
    queryKey: ["days", DAYS_CODE],
    queryFn: ({ queryKey }) => getDaysList(queryKey[1]),
    staleTime: MIDDLE_TIME,
    gcTime: LONG_TIME,
  });

  // 서버 에러 시 임시 하드코딩 용도
  // const days = { data: daysData[DAYS_CODE] };

  const isSelectedAllTimes =
    selectTimeInfoList.filter((v) => v.dayOfWeek === activeDay).length ===
    timeList.length;

  const handleSelectDaysButton = () => {
    setOpenTime(false);
    const isSelectedDaysButton =
      selectTimeInfoList.filter((v) => v.dayOfWeek === activeDay).length ===
      timeList.length;

    setSelectTimeInfoList(
      selectTimeInfoList.filter((v) => v.dayOfWeek !== activeDay),
    );
    if (!isSelectedDaysButton) {
      const isContainWeekdays = selectTimeInfoList.some((v) =>
        WEEKDAYS_REGEX.test(String(v.dayOfWeek)),
      );
      const isContainWeekends = selectTimeInfoList.some((v) =>
        WEEKEND_REGEX.test(String(v.dayOfWeek)),
      );
      if (activeDay === "8" && isContainWeekdays) {
        setSelectTimeInfoList(
          selectTimeInfoList.filter((v) => {
            if (!WEEKDAYS_REGEX.test(v.dayOfWeek.toString())) return v;
          }),
        );
      }
      if (activeDay === "9" && isContainWeekends) {
        setSelectTimeInfoList(
          selectTimeInfoList.filter((v) => {
            if (!WEEKEND_REGEX.test(v.dayOfWeek.toString())) return v;
          }),
        );
      }

      const activeDayAllTm = timeList.map((v) => {
        return {
          dayOfWeek: activeDay,
          startTime: v,
          endTime: `${v.split(":")[0]}:59`,
        };
      });

      setSelectTimeInfoList((prev) => [...prev, ...activeDayAllTm]);
    }
  };

  const addSelectDayTime = (time: string) => {
    const isExistSelectTime = selectTimeInfoList.some((v) => {
      return v.dayOfWeek == activeDay && v.startTime === time;
    });

    if (isExistSelectTime) {
      setSelectTimeInfoList(
        selectTimeInfoList.filter((v) => {
          return !(v.dayOfWeek === activeDay && v.startTime === time);
        }),
      );
      const isContainWeekdays = selectTimeInfoList.some((v) =>
        WEEKDAYS_REGEX.test(String(v.dayOfWeek)),
      );
      const isContainWeekends = selectTimeInfoList.some((v) =>
        WEEKEND_REGEX.test(String(v.dayOfWeek)),
      );
      if (activeDay === "8" && isContainWeekdays) {
        setSelectTimeInfoList(
          selectTimeInfoList.filter((v) => {
            if (!WEEKDAYS_REGEX.test(v.dayOfWeek.toString())) return v;
          }),
        );
      }
      if (activeDay === "9" && isContainWeekends) {
        setSelectTimeInfoList(
          selectTimeInfoList.filter((v) => {
            if (!WEEKEND_REGEX.test(v.dayOfWeek.toString())) return v;
          }),
        );
      }
    } else {
      const timeInfo = {
        dayOfWeek: activeDay,
        startTime: time,
        endTime: `${time.split(":")[0]}:59`,
      };
      setSelectTimeInfoList((prev) => [...prev, timeInfo]);
    }
  };

  const buttonStatusStyle = useMemo(
    () => (dayCode: string) => {
      if (isDayShare) {
        // 시간 선택 중인 날짜
        if (activeDay === dayCode) {
          return "shadow-[0_4px_10px_0_rgba(0,0,0,0.1)] bg-white text-black";
        }
        // 선택된 날짜
        if (selectTimeInfoList.some((v) => v.dayOfWeek === dayCode)) {
          return "bg-green-400 text-black";
        } else {
          return "bg-black/5 text-grey-300";
        }
      }
    },
    [activeDay, isDayShare, selectTimeInfoList],
  );

  const isDisabled = (type: string, dayCode: string) => {
    // 주중 선택 시, 월~금 선택 불가
    if (type === "weekday") {
      return (
        selectTimeInfoList.some((v) => v.dayOfWeek === WEEKDAYS_CODE) &&
        WEEKDAYS_REGEX.test(dayCode)
      );
    }
    // 주말 선택 시, 토,일 선택 불가
    if (type === "weekend") {
      return (
        selectTimeInfoList.some((v) => v.dayOfWeek === WEEKENDS_CODE) &&
        WEEKEND_REGEX.test(dayCode)
      );
    }
  };

  useEffect(() => {
    if (!isDayShare) {
      setSelectTimeInfoList([]);
      setActiveDay("");
      setOpenTime(false);
    }
  }, [isDayShare, setSelectTimeInfoList]);

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="flex justify-between">
        {days.data?.map((d: Codes) => (
          <button
            key={d.codeSeq}
            className={clsx(
              "rounded px-1.5 py-0.5 font-semibold disabled:bg-transparent disabled:text-grey-300 sm:px-4 sm:py-1 max-sm:text-xxs",
              buttonStatusStyle(d.code),
            )}
            onClick={() => {
              setActiveDay(d.code);
            }}
            type="button"
            disabled={
              !isDayShare ||
              isDisabled("weekday", d.code) ||
              isDisabled("weekend", d.code)
            }
          >
            {d.codeKorName}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2 sm:gap-[0.875rem]">
        {isDayShare && activeDay && (
          <SelectDaysButton
            selectAllTimes={isSelectedAllTimes}
            setSelectAllTimes={handleSelectDaysButton}
          />
        )}
        {isDayShare && activeDay && !openTime && (
          <SelectTimesButton
            isSelectedAllTimes={isSelectedAllTimes}
            setOpenTime={() => setOpenTime(true)}
          />
        )}
        {openTime && (
          <TimeList
            selectTimeInfoList={selectTimeInfoList}
            addSelectTime={addSelectDayTime}
            setOpenTime={() => setOpenTime(false)}
            activeDay={activeDay}
          />
        )}
      </div>
    </div>
  );
}
