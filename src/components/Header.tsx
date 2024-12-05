"use client";

import useLoginPopupStore from "@/store/LoginStore";
import Image from "next/image";
import { usePathname } from "next/navigation";
import axios, { axiosAuth } from "@/lib/axios";
import utils from "@/utils/cmmnUtil";
import Link from "next/link";
import { useEffect } from "react";
import useSideNavStore from "@/store/sideNavStore";
import { CommonProps } from "@/types/common";
import SearchNav from "./explore/SearchNav";

export default function Header({ token }: CommonProps) {
  const pathname = usePathname();
  const openLoginPopup = useLoginPopupStore.use.actions().openLoginPopup;
  const closeLoginPopup = useLoginPopupStore.use.actions().closeLoginPopup;
  const toggleSideNav = useSideNavStore.use.actions().toggleSideNav;

  const logout = async () => {
    try {
      await axiosAuth.post("/v1/logout");
      utils.removeStorageAll();
      window.location.href = "/";
    } catch (error) {
      console.error(`로그아웃 에러: ${error}`);
    }
  };

  const pageTitle = () => {
    switch (pathname) {
      case "/product/register":
        return "나눔 등록";
      case "/explore":
        return "나눔 탐색";
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!token) {
      utils.removeStorageAll();
    }
  }, []);

  return (
    <>
      <div
        className="fixed left-0 top-[env(safe-area-inset-top)] z-10 hidden h-[5.625rem] w-full items-start justify-between bg-white px-10 pb-7 pt-[1.875rem] sm:flex"
        onClick={closeLoginPopup}
      >
        <ul className="flex items-center gap-8">
          <li className="mr-4">
            <Link href="/">
              <Image
                src="/assets/images/logo/logo_black.svg"
                alt="logo"
                width={65}
                height={20}
              />
            </Link>
          </li>
          <li className="cursor-pointer hover:font-bold">
            <Link href="/explore">나눔 탐색</Link>
          </li>
          <li className="cursor-pointer hover:font-bold">
            <Link href="/a">띵즈</Link>
          </li>
          <li className="cursor-pointer hover:font-bold">
            <Link href="/product/1">캘린더</Link>
          </li>
          <li className="cursor-pointer hover:font-bold">
            <Link href="/a">문의</Link>
          </li>
        </ul>
        {pathname === "/explore" && (
          <div className="max-xl:fixed max-xl:left-0 max-xl:top-[calc(env(safe-area-inset-top)+5.625rem)] max-xl:w-full max-xl:px-10">
            <SearchNav />
          </div>
        )}
        <div className="flex justify-end xl:w-[22.8125rem]">
          {!token ? (
            <button
              className="h-10 rounded-[0.625rem] bg-green-400 px-5 py-2 font-bold"
              onClick={(e) => {
                e.stopPropagation();
                openLoginPopup("/product/register");
              }}
            >
              로그인 후 새 나눔 등록
              <span className="max-lg:hidden">, Let things go!</span>
            </button>
          ) : (
            <div className="flex gap-[1.875rem]">
              <Link
                href="/product/register"
                className="h-10 w-[14.8125rem] rounded-[0.625rem] bg-green-400 px-5 py-2 text-center font-bold"
              >
                새 나눔 등록
                <span className="max-lg:hidden">, Let things go!</span>
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  logout();
                }}
              >
                <Image
                  src="/assets/images/profile.svg"
                  alt="profile"
                  width={40}
                  height={40}
                />
              </button>
            </div>
          )}
        </div>
      </div>
      {/* 모바일 화면 */}
      <div
        className="fixed left-0 top-[env(safe-area-inset-top)] z-10 flex h-16 w-full items-center justify-between bg-white px-5 py-[0.875rem] text-center sm:hidden"
        onClick={closeLoginPopup}
      >
        <button className="h-8 w-8" onClick={toggleSideNav}>
          <Image
            src="/assets/images/button/hamburger.svg"
            alt="hamberger"
            width={32}
            height={32}
          />
        </button>
        {pageTitle() ? (
          <p className="font-bold">{pageTitle()}</p>
        ) : (
          <Image
            className="w-[4.0625rem]"
            src="/assets/images/logo/logo_black.svg"
            alt="logo"
            width={65}
            height={20}
          />
        )}
        <Image
          src="/assets/images/profile.svg"
          alt="profile"
          width={32}
          height={32}
        />
        {pathname === "/explore" && (
          <div className="fixed left-0 top-[calc(env(safe-area-inset-top)+4rem)] z-10 w-full">
            <SearchNav />
          </div>
        )}
      </div>
    </>
  );
}
