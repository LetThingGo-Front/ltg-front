"use client";

import React, { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { motion } from "framer-motion";
import { duration } from "@/constants/animation/style";

type Props = {
  firstButtonText: string;
  secondButtonText: string;
  firstButtonFn: () => void;
  secondButtonFn: () => void;
  isImage?: boolean;
};

export default function GradationTwoButton({
  firstButtonText,
  secondButtonText,
  firstButtonFn,
  secondButtonFn,
  isImage = false,
}: Props) {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      className={clsx(
        "flex h-16 w-[300px] items-center gap-[66px] rounded-full border-2 border-white",
        "bg-ltg-gradient-r font-semibold text-grey-800",
        "shadow-ltg backdrop-blur-[50px]",
        "max-sm:px-3 max-sm:py-2 sm:h-[72px] sm:w-[442px] sm:p-4",
      )}
    >
      <motion.button
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full p-3 sm:w-[176px] sm:gap-3"
        onClick={firstButtonFn}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onTouchStart={() => setIsHover(true)}
        onTouchEnd={() => setIsHover(false)}
        whileHover={{ backgroundColor: "#474747", color: "#ffffff" }}
        whileTap={{ backgroundColor: "#474747", color: "#ffffff" }}
        transition={{ ease: "easeInOut", ...duration.short }}
      >
        {isImage && (
          <Image
            src={`/assets/images/button/${isHover ? "thing_md_white.svg" : "thing_md_black.svg"}`}
            alt={firstButtonText}
            width={24}
            height={24}
          />
        )}
        <p className="max-sm:text-xs max-sm:font-semibold">{firstButtonText}</p>
      </motion.button>
      <motion.button
        className="flex h-12 w-[176px] items-center justify-center gap-3 rounded-full p-3 max-sm:hidden"
        onClick={secondButtonFn}
        whileHover={{ backgroundColor: "#474747", color: "#ffffff" }}
        transition={{ ease: "easeInOut", ...duration.short }}
      >
        {isImage && (
          <Image
            src="/assets/images/button/thunder.svg"
            alt={secondButtonText}
            width={24}
            height={24}
          />
        )}
        <p>{secondButtonText}</p>
      </motion.button>
    </div>
  );
}
