"use client";

import { duration } from "@/common/constants/animation/style";
import { axiosAuth } from "@/lib/axios";
import useLoginPopupStore from "@/store/loginServiceStore";
import useSideNavStore from "@/store/sideNavStore";
import { CommonProps } from "@/types/common";
import utils from "@/common/utils/cmmnUtil";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const navVariants = {
  start: {
    opacity: 0,
    x: "-100%",
    ease: "easeInOut",
    transition: { type: "tween", ...duration.short },
  },
  end: {
    opacity: 1,
    x: "0%",
    ease: "easeInOut",
    transition: { type: "tween", ...duration.short },
  },
  exit: {
    opacity: 0,
    x: "-100%",
    ease: "easeInOut",
    transition: { type: "tween", ...duration.short },
  },
};

export default function SideNav({ token }: CommonProps) {
  const sideNav = useSideNavStore.use.sideNav();
  const openLoginPopup = useLoginPopupStore.use.actions().openLoginPopup;
  const resetSideNav = useSideNavStore.use.actions().resetSideNav;

  const logout = async () => {
    try {
      await axiosAuth.post("/v1/logout");
      utils.removeStorageAll();
      window.location.href = "/";
    } catch (error) {
      console.error(`로그아웃 에러: ${error}`);
    }
  };

  const closeSideNav = (e: any) => {
    e.target === e.currentTarget && resetSideNav();
  };
  return (
    <AnimatePresence>
      {sideNav && (
        <div
          className={clsx(
            "fixed left-0 top-[env(safe-area-inset-top)] z-40 h-[calc(100%-env(safe-area-inset-top))] w-full bg-black/50 sm:hidden",
          )}
          onClick={closeSideNav}
          onTouchEnd={closeSideNav}
        >
          <motion.div
            className="z-10 mr-[4.25rem] mt-16 flex h-[calc(100%-4rem)] flex-col items-center justify-evenly rounded-tr-[1.875rem] bg-white"
            variants={navVariants}
            initial="start"
            animate="end"
            exit="exit"
          >
            <ul className="flex h-1/2 flex-col justify-between text-center text-sm font-bold">
              <li>
                <Link href="/" onClick={closeSideNav}>
                  홈
                </Link>
              </li>
              <li>
                <Link href="/explore" onClick={closeSideNav}>
                  나눔 탐색
                </Link>
              </li>
              <li>
                <Link href="/a" onClick={closeSideNav}>
                  띵즈
                </Link>
              </li>
              <li>
                <Link href="/product/1" onClick={closeSideNav}>
                  캘린더
                </Link>
              </li>
              <li>
                <Link href="/a" onClick={closeSideNav}>
                  내 프로필
                </Link>
              </li>
              <li>
                <Link href="/a" onClick={closeSideNav}>
                  내 계정
                </Link>
              </li>
            </ul>
            <div className="mt-4 text-center">
              {token ? (
                <button
                  className="text-xxs font-bold text-grey-400"
                  type="button"
                  onClick={logout}
                >
                  로그아웃
                </button>
              ) : (
                <button
                  className="rounded-md bg-green-400 px-4 py-2 text-xxs font-bold"
                  type="button"
                  onClick={() => {
                    resetSideNav();
                    openLoginPopup();
                  }}
                >
                  소셜 미디어 로그인
                </button>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Image
                src="/images/appstore.png"
                alt="appstore"
                width={100}
                height={30}
              />
              <Image
                src="/images/googleplay.png"
                alt="googleplay"
                width={100}
                height={30}
              />
            </div>
            <Image
              src="/images/Arrow_Left.png"
              alt="arrow-left"
              width={40}
              height={40}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
