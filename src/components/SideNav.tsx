"use client";

import { duration } from "@/constants/animation/style";
import useSideNavStore from "@/store/sideNavStore";
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

export default function SideNav() {
  const sideNav = useSideNavStore.use.sideNav();
  const resetSideNav = useSideNavStore.use.actions().resetSideNav;

  const closeSideNav = (e: any) => {
    e.target === e.currentTarget && resetSideNav();
  };
  return (
    <AnimatePresence>
      {sideNav && (
        <div
          className={clsx("fixed left-0 top-0 h-dvh w-dvw bg-black/70")}
          onClick={closeSideNav}
          onTouchEnd={closeSideNav}
        >
          <motion.div
            className="z-10 mr-[4.25rem] mt-11 flex h-[calc(100%-2.75rem)] flex-col items-center justify-evenly rounded-tr-[1.875rem] bg-white"
            variants={navVariants}
            initial="start"
            animate="end"
            exit="exit"
          >
            <ul className="flex h-1/2 flex-col justify-between text-center text-sm font-bold">
              <li>
                <Link href="/">홈</Link>
              </li>
              <li>
                <Link href="/product/register">나눔 탐색</Link>
              </li>
              <li>띵즈</li>
              <li>캘린더</li>
              <li>내 프로필</li>
              <li>내 계정</li>
            </ul>
            <div className="text-center">
              <button
                className="rounded-md bg-green-400 px-4 py-2 text-xxs font-bold"
                type="button"
              >
                소셜 미디어 로그인
              </button>
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
