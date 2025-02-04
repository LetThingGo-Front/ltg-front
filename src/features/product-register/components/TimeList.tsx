import React from "react";
import { timeList } from "../constants/constants";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { duration } from "@/common/constants/animation/style";
import { ItemAvailabiltyDto } from "@/models/data-contracts";

type Props = {
  selectTimeInfoList: ItemAvailabiltyDto[];
  addSelectTime: (time: string) => void;
  setOpenTime: () => void;
  activeDay: string;
};

const timeVariants = {
  start: {
    height: 0,
    ease: "easeIn",
    ...duration.short,
  },
  end: {
    height: "20.25rem",
    ease: "easeIn",
    ...duration.short,
  },
};

export default function TimeList({
  selectTimeInfoList,
  addSelectTime,
  setOpenTime,
  activeDay,
}: Props) {
  return (
    <motion.div
      key="timeList"
      className="relative mb-[4.6875rem] h-[20.25rem] w-full"
      variants={timeVariants}
      initial="start"
      animate="end"
    >
      <div className="h-[17.9375rem] w-full rounded-lg bg-black/[0.03] px-5 py-5">
        <div className="flex h-full w-full flex-col items-center gap-[0.125rem] overflow-y-auto sm:px-12">
          {timeList.map((hour) => (
            <div key={hour} className="flex w-[9.125rem] gap-[0.125rem]">
              <div className="mt-0.5 h-3 w-6 text-center text-xxxs font-semibold text-grey-800">
                {hour}
              </div>
              <div
                className={clsx(
                  "h-[1.625rem] w-[7.5rem] cursor-pointer rounded",
                  selectTimeInfoList.some((v) => {
                    return v.dayOfWeek === activeDay && v.startTime === hour;
                  })
                    ? "bg-green-400"
                    : "bg-white/70",
                )}
                onClick={() => addSelectTime(hour)}
              ></div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[1.0625rem] flex justify-center">
        <button
          className="text-xxxs font-semibold text-grey-600"
          onClick={setOpenTime}
          type="button"
        >
          시간대 접기
        </button>
      </div>
    </motion.div>
  );
}
