"use client";

import { delay, duration } from "@/common/constants/animation/style";
import { motion } from "framer-motion";
import React from "react";

type Props = {
  address?: string;
  saveLocation: () => void;
  setIsNewFavorite?: (isNewFavorite: boolean) => void;
};

const modalVariants = {
  start: {
    y: "100%",
    transition: { type: "tween", ...duration.short },
  },
  end: {
    y: "0%",
    ease: "easeInOut",
    transition: { type: "tween", ...duration.short },
  },
  exit: {
    y: "100%",
    ease: "easeIn",
    transition: { type: "tween", ...duration.short },
  },
};

export default function AddressModal({
  address,
  saveLocation,
  setIsNewFavorite,
}: Props) {
  return (
    <motion.div
      className="absolute bottom-0 left-0 h-[12.75rem] w-full rounded-t-[0.625rem] bg-black/70 px-[1.875rem] pb-[1.625rem] pt-7 backdrop-blur-[50px]"
      variants={modalVariants}
      initial="start"
      animate="end"
      exit="exit"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="flex h-[6.9375rem] flex-col gap-4">
        <p className="text-xxs font-semibold text-green-400">
          띵즈 핀을 이동해서 위치를 설정해주세요
        </p>
        <p className="text-sm text-white">{address}</p>
      </div>
      <div className="text-center">
        <button
          className="h-[2.5625rem] w-[8.25rem] rounded-full border border-white/20 bg-white/70 text-xs font-semibold text-grey-800 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] backdrop-blur-[10px] hover:border-white hover:bg-black/60 hover:text-white active:border-white active:bg-black/60 active:text-white"
          type="button"
          onClick={() => {
            saveLocation();
            if (setIsNewFavorite) setIsNewFavorite(true);
          }}
        >
          나눔위치 설정완료
        </button>
      </div>
    </motion.div>
  );
}
