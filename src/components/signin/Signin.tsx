"use client";

import Image from "next/image";
import React from "react";
import CloseButton from "./button/CloseButton";
import useLoginPopupStore from "@/store/LoginStore";
import SignInButton from "./button/SignInButton";
import clsx from "clsx";

const socialLoginList = [
  { id: 1, name: "kakao", src: "/assets/images/login/kakao.svg" },
  { id: 2, name: "naver", src: "/assets/images/login/naver.svg" },
  { id: 3, name: "google", src: "/assets/images/login/google.svg" },
];

export default function SignIn() {
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
      className={clsx(
        "fixed left-0 top-[calc(env(safe-area-inset-top)+4rem)] z-50 flex h-[calc(100%-env(safe-area-inset-top)-4rem)] w-full items-center justify-center backdrop-blur-xl",
        "sm:top-[calc(env(safe-area-inset-top)+5.625rem)] sm:h-[calc(100%-env(safe-area-inset-top)-5.625rem)]",
        !isOpen && "hidden",
      )}
    >
      <div className="min-h-[34.75rem] min-w-[19rem] rounded-[1.25rem] bg-grey-800 sm:min-h-[39.375rem] sm:min-w-[29.625rem]">
        <div className="flex justify-end">
          <div className="flex h-[3.75rem] w-[3.75rem] items-center justify-center">
            <CloseButton close={closeLoginPopup} />
          </div>
        </div>
        <div className="mx-[1.875rem] mt-[6.25rem] flex flex-col items-center justify-center text-white sm:mt-[7.5rem]">
          <div className="flex h-[14rem] w-[12.125rem] min-w-[15.625rem] flex-col items-center justify-center">
            <div className="mb-[3.1875rem] sm:mb-[5.625rem]">
              <Image
                className="h-[3.625rem] w-[11rem] sm:h-[4.3125rem] sm:w-[13.25rem]"
                src="/assets/images/logo/logo_white.svg"
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
                {socialLoginList.map((social) => (
                  <SignInButton
                    key={social.id}
                    src={social.src}
                    name={social.name}
                    onClick={() => socialLogin(social.name)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-10 sm:mt-[6.25rem]">
            <p className="text-[10px] sm:text-xs">
              렛띵고 앱에서 나눔 계속하기
            </p>
          </div>
          <div className="mt-10 flex gap-2 sm:mt-6">
            <Image
              className="rounded border-[0.0313rem] border-white"
              src="/assets/images/googleplay.svg"
              width={103}
              height={30}
              alt="googleplay"
            />
            <Image
              className="rounded border-[0.0313rem] border-white"
              src="/assets/images/appstore.svg"
              width={103}
              height={30}
              alt="appstore"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
