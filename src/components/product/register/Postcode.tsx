"use client";

import { duration } from "@/constants/animation/style";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useDaumPostcodePopup, DaumPostcodeEmbed } from "react-daum-postcode";
import SearchInput from "./SearchInput";
import clsx from "clsx";

type Props = {
  addr: string;
  setAddress: (address: string) => void;
  isOpen: boolean;
  openPostcode: (open: boolean) => void;
  setSimpleAddr: (address: string) => void;
};

const themeObj = {
  // bgColor: "#E1F452", // 바탕 배경색 (흰색)
  // searchBgColor: "#ffffff", // 검색창 배경색
  // contentBgColor: "#ffffff", // 본문 배경색 (흰색)
  // pageBgColor: "#ffffff", // 페이지 배경색 (흰색)
  // textColor: "#333333", // 기본 글자색 (진한 회색)
  // queryTextColor: "#000000", // 검색창 글자색 (검은색)
  // // postcodeTextColor: "#E1F452", // 우편번호 글자색 (메인 컬러)
  // emphTextColor: "#C4DD0E", // 강조 글자색 (메인 컬러)
  // outlineColor: "#BABABA", // 테두리 색상 (밝은 회색)
};

const postCodeStyle = {
  width: "100%",
  height: "100%",
};

const postVariants = {
  start: {
    opacity: 0,
    ease: "easeInOut",
    ...duration.medium,
  },
  end: {
    opacity: 1,
    ease: "easeInOut",
    ...duration.medium,
  },
  exit: {},
};

export default function Postcode({
  addr,
  setAddress,
  isOpen,
  openPostcode,
  setSimpleAddr,
}: Props) {
  const handleComplete = (data: {
    address: string;
    addressType?: string;
    sigungu?: string;
    bname?: string;
    buildingName?: string;
  }) => {
    const { address, addressType, sigungu, bname, buildingName } = data;
    let fullAddress = address;
    if (addressType === "R") {
      const extraAddress = [bname, buildingName]
        .filter((item) => item !== "")
        .join(", ");
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setAddress(fullAddress);
    setSimpleAddr(`${sigungu} ${bname}`);
    openPostcode(false);
  };

  return (
    <div
      className={clsx(
        "h-full w-full",
        isOpen &&
          "max-sm:absolute max-sm:left-0 max-sm:top-0 max-sm:z-10 max-sm:bg-black/70 sm:h-[31.25rem]",
      )}
    >
      <SearchInput
        isOpenSearchAddr={isOpen}
        setIsOpenSearchAddr={() => openPostcode(!isOpen)}
        address={addr}
      />
      {isOpen && (
        <motion.div
          className="h-full"
          variants={postVariants}
          initial="start"
          animate="end"
          exit="exit"
        >
          <DaumPostcodeEmbed
            onComplete={handleComplete}
            style={postCodeStyle}
            theme={themeObj}
          />
        </motion.div>
      )}
    </div>
  );
}
