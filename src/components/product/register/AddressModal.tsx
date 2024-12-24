"use client";

import { delay, duration } from "@/constants/animation/style";
import { motion } from "framer-motion";
import React from "react";

type Props = {
  isOpen: boolean;
  address?: string;
};

const modalVariants = {
  start: {
    y: "100%",
    transition: { type: "tween", ...duration.short },
  },
  end: {
    y: "0%",
    ease: "easeInOut",
    transition: { type: "tween", ...duration.short, ...delay.short },
  },
  exit: {
    y: "100%",
    ease: "easeIn",
    transition: { type: "tween", ...duration.short },
  },
};

export default function AddressModal({ isOpen, address }: Props) {
  if (!isOpen) return null;
  return (
    <motion.div
      className="absolute bottom-0 left-0 h-[12.75rem] w-full rounded-t-[1.875rem] bg-white"
      variants={modalVariants}
      initial="start"
      animate="end"
      exit="exit"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="h-full w-full rounded-t-[1.875rem] bg-black/70">
        <p className="text-center font-semibold text-white">{address}</p>
      </div>
    </motion.div>
  );
}
