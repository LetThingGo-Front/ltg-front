import React from "react";
import { timeList } from "./constants/constants";
import clsx from "clsx";
import { motion } from "framer-motion";
import { duration } from "@/constants/animation/style";

type Props = {
  selectTime: string[];
  addSelectTime: (time: string) => void;
};

const timeVariants = {
  start: {
    height: 0,
    ease: "easeInOut",
    ...duration.short,
  },
  end: {
    height: "15.625rem",
    ease: "easeInOut",
    ...duration.short,
  },
  exit: {},
};

export default function TimeList({ selectTime, addSelectTime }: Props) {
  return (
    <motion.div
      className="relative h-[5.5rem] w-full rounded-lg bg-black/5"
      variants={timeVariants}
      initial="start"
      animate="end"
      exit="exit"
    >
      <div className="absolute top-0 h-full w-full p-5">
        <div className="flex h-full w-full flex-col items-center overflow-y-scroll">
          {timeList.map((hour) => (
            <div key={hour} className="flex w-full gap-[0.125rem] pr-4">
              <div className="text-xxxs mr-2 h-3 w-6 text-center font-semibold tracking-tight text-grey-800 sm:text-xs">
                {hour}
              </div>
              <div
                className={clsx(
                  "h-10 w-full cursor-pointer rounded border border-grey-100",
                  selectTime.includes(hour)
                    ? "bg-green-400 hover:bg-green-400"
                    : "bg-white/70 hover:bg-grey-50",
                )}
                onClick={() => addSelectTime(hour)}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
