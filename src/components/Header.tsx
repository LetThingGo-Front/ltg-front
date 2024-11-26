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
      <div className="fixed left-0 top-[env(safe-area-inset-top)] z-10 hidden w-full items-start justify-between bg-white px-10 py-8 sm:flex">
        <ul className="flex gap-8">
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
            <Link href="/product/register">띵즈</Link>
          </li>
          <li className="cursor-pointer hover:font-bold">
            <Link href="/product/1">캘린더</Link>
          </li>
          <li className="cursor-pointer hover:font-bold">
            <Link href="/a">문의</Link>
          </li>
        </ul>
        {pathname === "/explore" && <SearchNav />}
        {!token ? (
          <button
            className="h-[2.375rem] rounded-[0.625rem] bg-green-400 px-5 py-2 font-bold"
            onClick={openLoginPopup}
          >
            로그인 후 새 나눔 등록
            <span className="max-md:hidden">, Let things go!</span>
          </button>
        ) : (
          <button
            className="h-[2.375rem] rounded-[0.625rem] bg-green-400 px-5 py-2 font-bold"
            onClick={logout}
          >
            새 나눔 등록
            <span className="max-md:hidden">, Let things go!</span>
          </button>
        )}
      </div>
      {/* 모바일 화면 */}
      <div className="fixed left-0 top-[env(safe-area-inset-top)] z-10 flex h-16 w-full items-center justify-between bg-white px-5 py-[0.875rem] text-center sm:hidden">
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
          src="/images/icons/img.png"
          alt="profile"
          width={32}
          height={31}
        />
        {pathname === "/explore" && (
          <div className="fixed left-0 top-[calc(env(safe-area-inset-top)+4rem)] z-10 h-full w-full">
            <SearchNav />
          </div>
        )}
      </div>
      {/* <div className="mx-[10px] h-[74px] bg-white/70 px-[20px] pb-[8px]">
          <input
            type="text"
            name=""
            id=""
            className="mb-[13px] h-[34px] w-[320px] rounded-[10px] bg-grey-500/5 py-[8px] text-center text-[12px] text-grey-500"
            placeholder="필요한 물품을 검색하세요."
          />
          <div className="mx-auto flex h-[24px] w-[320px] items-start justify-between">
            <div className="flex h-[26px] items-center rounded-[9999px] bg-green-100 py-[5px] pe-[5px] ps-[10px]">
              <p className="text-[9px] text-grey-800">지역</p>
              <Image
                src="/assets/images/dropdown_category.png"
                width={6.67}
                height={3.33}
                alt="dropdown"
                className="mx-[4.67px] h-[3.33px] w-[6.67px]"
              />
            </div>
            <div className="flex h-[26px] items-center rounded-[9999px] bg-green-100 py-[5px] pe-[5px] ps-[10px]">
              <p className="text-[9px] text-grey-800">카테고리</p>
              <Image
                src="/assets/images/dropdown_category.png"
                width={6.67}
                height={3.33}
                alt="dropdown"
                className="mx-[4.67px] h-[3.33px] w-[6.67px]"
              />
            </div>
            <div className="flex h-[26px] items-center rounded-[9999px] bg-green-100 py-[5px] pe-[5px] ps-[10px]">
              <p className="text-[9px] text-grey-800">물품상태</p>
              <Image
                src="/assets/images/dropdown_category.png"
                width={6.67}
                height={3.33}
                alt="dropdown"
                className="mx-[4.67px] h-[3.33px] w-[6.67px]"
              />
            </div>
            <div className="flex h-[26px] items-center rounded-[9999px] bg-green-100 py-[5px] pe-[5px] ps-[10px]">
              <p className="text-[9px] text-grey-800">나눔요일</p>
              <Image
                src="/assets/images/dropdown_category.png"
                width={6.67}
                height={3.33}
                alt="dropdown"
                className="mx-[4.67px] h-[3.33px] w-[6.67px]"
              />
            </div>
          </div>
        </div> */}
    </>
  );
}
