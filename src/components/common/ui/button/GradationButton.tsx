import { commonHover, commonTap, duration } from "@/constants/animation/style";
import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";

type GradationButtonProps = {
  buttonText: string;
  onClick?: (e?: any) => void;
  type?: "submit" | "button";
};

export default function GradationButton({
  buttonText,
  onClick,
  type = "button",
}: GradationButtonProps) {
  return (
    <motion.div
      className={clsx(
        "flex h-10 w-[140px] items-start justify-center rounded-full border border-white", // 레이아웃, 크기, 모양, 테두리
        "bg-ltg-gradient-r font-semibold text-grey-800", // 배경, 색상, 폰트, 텍스트
        "shadow-ltg backdrop-blur-[70px]", // 효과
        "max-sm:text-xs sm:h-[70px] sm:w-[200px] sm:p-2", // 반응형
      )}
    >
      <motion.button
        className={clsx(
          "h-full w-full rounded-full border border-white", // 레이아웃, 크기, 모양, 테두리
        )}
        whileHover={commonHover}
        whileTap={commonTap}
        transition={{ ease: "easeInOut", ...duration.short }}
        onClick={onClick}
        type={type}
      >
        {buttonText}
      </motion.button>
    </motion.div>
  );
}
