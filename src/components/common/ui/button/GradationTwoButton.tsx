"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { motion } from "framer-motion";

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
  return (
    <div
      className={clsx(
        "flex h-16 w-[300px] items-center gap-[66px] rounded-full border-2 border-white",
        "bg-ltg-gradient-r font-semibold text-grey-800",
        "shadow-ltg backdrop-blur-[50px]",
        "sm:h-[72px] sm:w-[442px] sm:p-4 max-sm:px-3 max-sm:py-2",
      )}
    >
      <motion.button
        className="group/sharing flex h-12 w-full items-center justify-center gap-2 rounded-full p-3 duration-300 hover:bg-[#474747] hover:text-white sm:w-[176px] sm:gap-3"
        onClick={firstButtonFn}
      >
        <Image
          className="group-hover/sharing:hidden"
          src="/assets/images/button/thing_md_black.svg"
          alt={firstButtonText}
          width={24}
          height={24}
        />
        <Image
          className="hidden group-hover/sharing:block"
          src="/assets/images/button/thing_md_white.svg"
          alt={firstButtonText}
          width={24}
          height={24}
        />
        <p className="max-sm:text-xs max-sm:font-semibold">{firstButtonText}</p>
      </motion.button>
      <motion.button
        className="flex h-12 w-[176px] items-center justify-center gap-3 rounded-full p-3 duration-300 hover:bg-[#474747] hover:text-white max-sm:hidden"
        onClick={secondButtonFn}
      >
        <Image
          src="/assets/images/button/thunder.svg"
          alt={secondButtonText}
          width={32}
          height={32}
        />
        <p>{secondButtonText}</p>
      </motion.button>
    </div>
  );
}
