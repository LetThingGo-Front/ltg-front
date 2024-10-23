"use client";

import Image from "next/image";
import React, { useState } from "react";
import CloseButton from "./button/CloseButton";
import useLoginPopupStore from "@/store/LoginStore";

export default function SignIn() {
  // 사이트 확인용으로 true로 설정, 실제로는 false로 설정
  const isOpen = useLoginPopupStore.use.isOpen();
  const closeLoginPopup = useLoginPopupStore.use.actions().closeLoginPopup;
  const socialLogin = async (provider: string) => {
    try {
      window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/${provider}`;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className={`${!isOpen && "hidden"} fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center backdrop-blur-lg`}
    >
      <div className="min-h-[556px] min-w-[304px] rounded-[20px] bg-white sm:min-h-[630px] sm:min-w-[474px]">
        <div className="min-h-[556px] min-w-[304px] rounded-[20px] bg-black bg-opacity-70 text-gray-200 sm:min-h-[630px] sm:min-w-[474px]">
          <div className="flex justify-end">
            <div className="flex h-[60px] w-[60px] items-center justify-center">
              <CloseButton close={closeLoginPopup} />
            </div>
          </div>
          <div className="mx-[30px] mt-[100px] flex flex-col items-center justify-center sm:mt-[120px]">
            <div className="h-224px] flex w-[194px] min-w-[250px] flex-col items-center justify-center">
              <div className="mb-[51px] sm:mb-[90px]">
                <Image
                  className="h-[58px] w-[176px] sm:h-[69px] sm:w-[212px]"
                  src="/assets/images/logo.svg"
                  width={212}
                  height={69}
                  alt="letthinggo logo"
                />
              </div>
              <div className="flex flex-col gap-5 sm:gap-6">
                <p className="text-sm sm:text-base">
                  소셜 미디어 계정으로 로그인하기
                </p>
                <div className="flex justify-between">
                  <p className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffeC00]">
                    <button
                      onClick={() => {
                        socialLogin("kakao");
                      }}
                    >
                      <Image
                        src="/assets/images/kakao.svg"
                        width={17}
                        height={15}
                        alt="kakao"
                      />
                    </button>
                  </p>
                  <p className="flex h-10 w-10 items-center justify-center rounded-full bg-[#03cf5d]">
                    <button
                      onClick={() => {
                        socialLogin("naver");
                      }}
                    >
                      <Image
                        src="/assets/images/naver.svg"
                        width={17}
                        height={15}
                        alt="naver"
                      />
                    </button>
                  </p>
                  <button
                    onClick={() => {
                      socialLogin("google");
                    }}
                  >
                    <Image
                      src="/assets/images/google.svg"
                      width={40}
                      height={40}
                      alt="google"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-20 sm:mt-[100px]">
              <p className="text-[10px] sm:text-xs">
                렛띵고 앱에서 나눔 계속하기
              </p>
            </div>
            <div className="mt-10 flex gap-2 sm:mt-6">
              <Image
                src="/assets/images/googleplay.svg"
                width={103}
                height={30}
                alt="googleplay"
              />
              <Image
                src="/assets/images/appstore.svg"
                width={103}
                height={30}
                alt="appstore"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
