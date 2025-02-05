"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import useHistoryStore from "@/store/historyStore";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { duration } from "@/common/constants/animation/style";

const closeVariants = {
  exit: {
    opacity: 0,
    ease: "easeInOut",
    transition: { type: "tween", ...duration.medium },
  },
};

export default function CompleteModal() {
  const pathname = usePathname();
  const previousUrl = useHistoryStore.use.previousUrl();
  const savedItemId = useHistoryStore.use.itemId();
  const initHistory = useHistoryStore.use.actions().initHistory;
  const pathItemId = Number(pathname.split("/")[2]);

  useEffect(() => {
    setTimeout(() => {
      initHistory();
    }, 3000);
  }, [initHistory, pathItemId, pathname, savedItemId]);

  return (
    <AnimatePresence>
      {previousUrl && savedItemId === pathItemId && (
        <motion.div
          className="absolute inset-0 z-50 flex h-full w-full items-center justify-center bg-white/85"
          variants={closeVariants}
          initial="start"
          animate="end"
          exit="exit"
        >
          <div className="flex h-[6rem] w-[16.6875rem] items-center rounded-[1.25rem] bg-grey-800 sm:h-[8rem] sm:w-[22.5rem] sm:pl-[7.5rem] max-sm:pl-[3.875rem]">
            <div className="flex items-center gap-4">
              <p className="text-lg font-semibold text-green-400">
                나눔 등록 완료
              </p>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-400">
                <Image
                  src="/assets/images/check/box-checked.svg"
                  width={20}
                  height={20}
                  alt="check"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
