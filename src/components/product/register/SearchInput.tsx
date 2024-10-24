import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import { commonHover, commonTap, duration } from "@/constants/animation/style";

type Props = {
  isOpenSearchAddr: boolean;
  setIsOpenSearchAddr: () => void;
  address: string;
};

export default function SearchInput({
  isOpenSearchAddr,
  setIsOpenSearchAddr,
  address,
}: Props) {
  return (
    <motion.div
      className={clsx(
        "relative flex h-11 bg-grey-50 text-grey-500 backdrop-blur-[50px]",
        isOpenSearchAddr ? "sm:rounded-t-[10px]" : "rounded-[10px] max-sm:h-8",
      )}
      whileHover={commonHover}
      whileTap={commonTap}
      transition={{ ease: "easeInOut", ...duration.short }}
      onClick={setIsOpenSearchAddr}
    >
      <div
        className={clsx(
          "flex w-full cursor-pointer items-center justify-center bg-transparent text-center text-inherit sm:text-sm",
          address && "font-semibold text-grey-700",
          isOpenSearchAddr ? "max-sm:px-9" : "text-[10px] max-sm:px-8",
        )}
      >
        <p className="truncate">{address ? address : "주소를 검색하세요"}</p>
      </div>
      <div
        className={clsx(
          "absolute left-3 top-[10px] h-4 w-5 sm:top-[14px]",
          isOpenSearchAddr
            ? "max-sm:top-3 max-sm:h-4 max-sm:w-4"
            : "max-sm:h-3 max-sm:w-3",
        )}
      >
        <Image
          src="/assets/images/magnify.svg"
          width={20}
          height={20}
          alt="search"
        />
      </div>
    </motion.div>
  );
}
