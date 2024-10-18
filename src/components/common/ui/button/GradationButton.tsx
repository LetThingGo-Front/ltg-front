import { duration } from "@/constants/animation/style";
import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";

type GradationButtonProps = {
  buttonText: string;
  onClick: () => void;
};

export default function GradationButton({
  buttonText,
  onClick,
}: GradationButtonProps) {
  return (
    <motion.button
      className={clsx(
        "h-10 w-[140px] items-start justify-center rounded-full border border-white", // 레이아웃, 크기, 모양, 테두리
        "bg-ltg-gradient-r p-3 font-semibold text-grey-800", // 배경, 색상, 폰트, 텍스트
        "shadow-ltg backdrop-blur-[70px]", // 효과
        "max-sm:text-xs sm:h-[70px] sm:w-[200px]", // 반응형
      )}
      whileHover={{ backgroundColor: "#474747", color: "#ffffff" }}
      whileTap={{ backgroundColor: "#474747", color: "#ffffff" }}
      transition={{ ease: "easeInOut", ...duration.short }}
      onClick={onClick}
    >
      {buttonText}
    </motion.button>
  );
}
