"use client";

import React, { useEffect, useState } from "react";
import ItemSwiper from "./ItemSwiper";
import Image from "next/image";
import ShareMap from "./map/ShareMap";
import RequestPopup from "./popup/RequestPopup";
import ProfileButton from "./ProfileButton";
import GradationTwoButton from "../common/ui/button/GradationTwoButton";
import { UNKNOWN_ERROR_MESSAGE } from "@/constants/message";

export default function Item() {
  const [requestPopup, setRequestPopup] = useState(false);
  const [star, setStar] = useState(false);

  return (
    <div className="flex justify-center">
      <div
        className={`relative flex justify-center ${requestPopup ? "sm:h-full sm:w-[660px] sm:-translate-x-[570px] sm:px-24" : "sm:max-h-[828px] sm:w-[800px] sm:translate-x-0"} mb-[80px] h-[calc(100vh-64px)] duration-500`}
      >
        <div className="absolute z-10 flex w-full flex-col items-center justify-center gap-[12px] bg-white bg-opacity-80 py-[10px] backdrop-blur-lg sm:gap-5 max-sm:px-[50px]">
          <div className="flex items-center justify-center gap-1 sm:gap-3 max-sm:h-[30px]">
            <p className="text-lg font-bold sm:text-[28px]">
              세상에서 가장 쉬운 코딩책
            </p>
            <p
              onClick={() => setStar(!star)}
              className="cursor-pointer max-sm:h-[30px] max-sm:w-[30px] max-sm:p-[6px]"
            >
              <Image
                src={`/assets/images/button/${star ? "star_select.svg" : "star_default.svg"}`}
                alt="bookmark"
                width={24}
                height={24}
              />
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 text-xs font-semibold max-sm:h-5 max-sm:text-[8px]">
            <span className="rounded-md bg-blue-500 px-[9px] py-1 text-white sm:px-3 sm:py-2">
              도서
            </span>
            <span className="rounded-md bg-grey-100 px-[9px] py-1 text-grey-800 sm:px-3 sm:py-2">
              거의 사용안해서 새것 같음
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-6 overflow-x-hidden pt-[112px] scrollbar-hide sm:gap-[52px] max-sm:mb-[80px] max-sm:px-[30px]">
          <div className="flex justify-center">
            <div className="h-[328px] w-[300px] sm:h-[474px] sm:w-[440px]">
              <ItemSwiper />
            </div>
          </div>
          <div className="relative flex justify-center max-sm:p-2">
            <ProfileButton />
          </div>
          <div className="text-center text-xs sm:text-xl">
            <p>
              We&apos;re happy to share our latest brand guidelines concept of
              Juta Bank, a fintech enhancing the way you manage your financial
              goals. At Juta Bank, we believe that managing your finances should
              be a delightful experience. We’ve crafted a brand that embodies
              simplicity, security, and joy. With Juta Bank, financial freedom
              is at your fingertips. Achieve your goals effortlessly and happily
              with our user-friendly, secure platform designed to empower your
              financial future. Presenting today&apos;s creative concept
              by&nbsp;Rifki
            </p>
          </div>
          {!requestPopup && (
            <div className="mb-[100px]">
              <div className="h-[250px]">
                <ShareMap />
              </div>
            </div>
          )}
        </div>
      </div>
      <RequestPopup
        setRequestPopup={setRequestPopup}
        requestPopup={requestPopup}
      />
      <div className="fixed bottom-5 z-10 flex w-full justify-center sm:bottom-10">
        {!requestPopup && (
          <GradationTwoButton
            firstButtonFn={() => setRequestPopup(true)}
            secondButtonFn={() => {}}
            firstButtonText="나눔 신청"
            secondButtonText="오늘 번개 신청"
            isImage
          />
        )}
      </div>
      <div
        className={`fixed left-0 top-0 z-10 h-screen w-screen bg-black opacity-50 ${!requestPopup && "hidden"}`}
      ></div>
    </div>
  );
}
