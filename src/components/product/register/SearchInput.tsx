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
        "relative flex h-8 bg-grey-50 text-grey-500 backdrop-blur-[50px] sm:h-11",
        isOpenSearchAddr ? "sm:rounded-t-[10px]" : "rounded-[10px]",
      )}
      whileHover={commonHover}
      whileTap={commonTap}
      transition={{ ease: "easeInOut", ...duration.short }}
      onClick={setIsOpenSearchAddr}
    >
      <div
        className={clsx(
          "flex w-full cursor-pointer items-center justify-center bg-transparent px-7 text-center text-[10px] text-inherit sm:text-sm",
          address && "font-semibold text-grey-700",
        )}
      >
        <p>{address ? address : "주소를 검색하세요"}</p>
      </div>
      <div className="absolute left-3 top-[10px] sm:top-[14px]">
        <Image
          src="/assets/images/magnify.svg"
          width={12}
          height={12}
          alt="search"
        />
      </div>
    </motion.div>
  );
}
