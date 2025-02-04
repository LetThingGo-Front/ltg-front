import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";

type GradationButtonProps = {
  buttonText: string;
  onClick?: (e?: any) => void;
  type?: "submit" | "button";
  disabled?: boolean;
};

export default function GradationButton({
  buttonText,
  onClick,
  type = "button",
  disabled,
}: GradationButtonProps) {
  return (
    <motion.div
      className={clsx(
        "flex h-10 w-[8.75rem] items-start justify-center rounded-full border border-white", // 레이아웃, 크기, 모양, 테두리
        "bg-ltg-gradient-r font-semibold text-grey-800", // 배경, 색상, 폰트, 텍스트
        "shadow-ltg backdrop-blur-[70px]", // 효과
        "sm:h-[4.375rem] sm:w-[12.5rem] sm:p-2 max-sm:text-xs", // 반응형
      )}
    >
      <motion.button
        className={clsx(
          "h-full w-full rounded-full duration-300 hover:bg-[#474747] hover:text-white disabled:opacity-50", // 레이아웃, 크기, 모양, 테두리
        )}
        // whileHover={disabled ? "" : commonHover}
        // whileTap={disabled ? "" : commonTap}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {buttonText}
      </motion.button>
    </motion.div>
  );
}
