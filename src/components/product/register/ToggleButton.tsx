"use client";

import { duration } from "@/constants/animation/style";
import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";

type Props = {
  on: boolean;
  toggle: () => void;
  onText?: string;
  offText?: string;
  isShort?: boolean;
};

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

export default function ToggleButton({
  on,
  toggle,
  onText = "On",
  offText = "Off",
  isShort = true,
}: Props) {
  return (
    <div
      className={clsx(
        "flex h-5 w-[3.375rem] cursor-pointer items-center justify-start gap-1 rounded-full p-[0.125rem] sm:h-6 sm:w-[3.875rem]",
        on ? "justify-end bg-green-400" : "bg-neutral-300",
      )}
      onClick={toggle}
    >
      {on && (
        <p
          className={clsx(
            "text-xxxs font-semibold sm:text-xxs",
            isShort && "w-7 pl-2",
          )}
        >
          {onText}
        </p>
      )}
      <motion.div
        className="flex h-4 w-4 items-center justify-center rounded-full bg-white sm:h-5 sm:w-5"
        layout
        transition={duration.short}
      ></motion.div>
      {!on && (
        <p
          className={clsx(
            "text-xxxs font-semibold sm:text-xxs",
            isShort && "w-7 pl-1",
          )}
        >
          {offText}
        </p>
      )}
    </div>
  );
}
