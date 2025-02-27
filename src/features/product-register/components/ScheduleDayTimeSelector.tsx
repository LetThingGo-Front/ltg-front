"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  timeList,
  WEEKDAYS_CODE,
  WEEKDAYS_REGEX,
  WEEKEND_REGEX,
  WEEKENDS_CODE,
} from "../constants/constants";
import { Codes } from "@/types/common";
import clsx from "clsx";
import TimeSelector from "./TimeSelector";
import { ItemAvailabiltyDto } from "@/models/data-contracts";
import { LONG_TIME, MIDDLE_TIME } from "@/common/constants/time";
import { getDaysList } from "@/data/commonData";
import { useQuery } from "@tanstack/react-query";
import { DAYS_CODE } from "@/common/constants/code";
import daysData from "@/mocks/data/code/daysData.json";
import SelectDaysButton from "./button/SelectDaysButton";
import SelectTimesButton from "./button/SelectTimesButton";

type Props = {
  isDayShare: boolean;
  selectTimeInfoList: ItemAvailabiltyDto[];
  setSelectTimeInfoList: React.Dispatch<
    React.SetStateAction<ItemAvailabiltyDto[]>
  >;
};
export default function ScheduleDayTimeSelector({
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

  /**
   * 특정 요일의 요일만 선택하기 클릭
   */
  const handleSelectDaysButton = useCallback(() => {
    setOpenTime(false);
    setSelectTimeInfoList((prev) => {
      const isSelectedDaysButton =
        prev.filter((v) => v.dayOfWeek === activeDay).length ===
        timeList.length;
      let newList = prev.filter((v) => v.dayOfWeek !== activeDay); // 선택된 요일의 모든 시간대 삭제
      // 요일만 선택하기가 활성화 되어 있는 경우 클릭 시 해당 요일의 모든 시간대 삭제
      if (isSelectedDaysButton) {
        if (activeDay === WEEKDAYS_CODE) {
          newList = newList.filter((v) => !WEEKDAYS_REGEX.test(v.dayOfWeek));
        } else if (activeDay === WEEKENDS_CODE) {
          newList = newList.filter((v) => !WEEKEND_REGEX.test(v.dayOfWeek));
        }

        return newList;
      } else {
        const activeDayAllTm = timeList.map((v) => ({
          dayOfWeek: activeDay,
          startTime: v,
          endTime: `${v.split(":")[0]}:59`,
        }));

        return [...newList, ...activeDayAllTm];
      }
    });
  }, [activeDay, setSelectTimeInfoList]);

  /**
   * 특정 요일 시간대 추가
   * @param time 시간
   */
  const addSelectDayTime = useCallback(
    (time: string) => {
      setSelectTimeInfoList((prev) => {
        const isContain = prev.some(
          (v) => v.dayOfWeek === activeDay && v.startTime === time,
        );
        let newList = prev.filter((v) => {
          return !(v.dayOfWeek === activeDay && v.startTime === time);
        });
        // 이미 선택된 시간대가 있는 경우 삭제
        if (isContain) {
          if (activeDay === WEEKDAYS_CODE) {
            // 주중 편집 중일 경우 주중 요일 삭제
            newList = newList.filter((v) => !WEEKDAYS_REGEX.test(v.dayOfWeek));
          } else if (activeDay === WEEKENDS_CODE) {
            // 주말 편집 중일 경우 주말 요일 삭제
            newList = newList.filter((v) => !WEEKEND_REGEX.test(v.dayOfWeek));
          }
          return newList;
        } else {
          const timeInfo = {
            dayOfWeek: activeDay,
            startTime: time,
            endTime: `${time.split(":")[0]}:59`,
          };
          return [...newList, timeInfo];
        }
      });
    },
    [activeDay, setSelectTimeInfoList],
  );

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
          <TimeSelector
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
