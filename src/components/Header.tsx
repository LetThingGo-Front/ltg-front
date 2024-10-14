'use client';

import useLoginPopupStore from '@/store/LoginStore';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { axiosAuth } from '@/lib/axios';
import utils from '@/utils/cmmnUtil';
import Link from 'next/link';
import { useEffect } from 'react';

type Props = {
  token: string | null;
};

export default function Header({ token }: Props) {
  const pathname = usePathname();
  const openLoginPopup = useLoginPopupStore.use.actions().openLoginPopup; // 로그인 팝업 오픈

  const logout = async () => {
    try {
      await axiosAuth.post('/v1/logout');
      utils.removeStorageAll();
      window.location.href = '/';
    } catch (error) {
      console.error(`로그아웃 에러: ${error}`);
    }
  };

  const COLOR = {
    BUTTON_COLOR: '#E1F452', // Green-400
  };

  useEffect(() => {
    if (!token) {
      utils.removeStorageAll();
    }
  }, []);

  return (
    <>
      <div className="hidden md:flex px-10 py-8 bg-white">
        <Image
          src="/images/logo_black.png"
          alt="logo"
          className="w-[65px] h-[21px] h-[20px] mt-[2px] cursor-pointer"
          width={65}
          height={20}
        />
        <ul className="flex justify-between min-w-72 w-[312px] ms-10">
          <li className="text-[16px] hover:font-bold cursor-pointer">
            <Link href="/product/1">나눔 탐색</Link>
          </li>
          <li className="text-[16px] hover:font-bold cursor-pointer">띵즈</li>
          <li className="text-[16px] hover:font-bold cursor-pointer">캘린더</li>
          <li className="text-[16px] hover:font-bold cursor-pointer">문의</li>
        </ul>
        <div className="ms-auto me-auto">
          <input
            type="text"
            placeholder="필요한 물품을 검색하세요."
            className="w-[444px] h-[40px] mb-[16px] py-[12px] bg-[#f0f0f0] text-[#969696] rounded-[10px] text-center"
          />
          <div className="flex w-[444px] gap-[28px]">
            <div className="flex w-[93px] ps-[13px] pe-[8px] py-[4px] cursor-pointer">
              <p className="me-[8px] w-[23px] text-[12px]">지역</p>
              <Image
                src="/assets/images/dropdown_category.png"
                alt="dropdown"
                width={6.7}
                height={3.3}
                className="w-[6.7px] h-[3.3px] mt-[9px]"
              />
            </div>
            <div className="flex w-[93px] ps-[13px] pe-[8px] py-[4px] cursor-pointer">
              <p className="me-[8px] w-[45px] text-[12px]">카테고리</p>
              <Image
                src="/assets/images/dropdown_category.png"
                alt="dropdown"
                width={6.7}
                height={3.3}
                className="w-[6.7px] h-[3.3px] mt-[9px]"
              />
            </div>
            <div className="flex w-[93px] ps-[13px] pe-[8px] py-[4px] cursor-pointer">
              <p className="me-[8px] w-[45px] text-[12px]">물품선택</p>
              <Image
                src="/assets/images/dropdown_category.png"
                alt="dropdown"
                width={6.7}
                height={3.3}
                className="w-[6.7px] h-[3.3px] mt-[9px]"
              />
            </div>
            <div className="flex w-[93px] ps-[13px] pe-[8px] py-[4px] cursor-pointer">
              <p className="me-[8px] w-[45px] text-[12px]">나눔요일</p>
              <Image
                src="/assets/images/dropdown_category.png"
                alt="dropdown"
                width={6.7}
                height={3.3}
                className="w-[6.7px] h-[3.3px] mt-[9px]"
              />
            </div>
          </div>
        </div>
        <div className="ms-auto flex">
          {/* <div className="h-[30.4px] mt-[3px] me-[30px] flex items-center justify-center">
            <Image src="/images/appstore.png" alt="appstore" width={86} height={26} className="me-[20px]" />
            <Image src="/images/googleplay.png" alt="google-play" width={86} height={26} />
          </div> */}
          {!token ? (
            <button
              className="w-[303px] h-[38px] py-[8px] px-[20px] rounded-[10px] font-bold text-[16px]"
              style={{ backgroundColor: COLOR.BUTTON_COLOR }}
              onClick={openLoginPopup}
              disabled={false}
            >
              로그인 후 새 나눔 등록, Let things go!
            </button>
          ) : (
            <button onClick={logout}>로그아웃</button>
          )}
          {/* <Image/> */}
        </div>
      </div>
      {/* 모바일 화면 */}
      <div className="md:hidden text-center">
        <div className="h-[44px] bg-white" />
        <div className="flex h-[64px] justify-between px-[20px] py-[14px] bg-white items-center">
          <Image src="/images/icons/Hamburger.png" alt="hamberger" width={30} height={30} />
          {pathname === '/' && <Image src="/images/logo_black.png" alt="logo" width={65} height={20} />}
          {pathname === '/manage/product' && <p className="text-[16px] font-bold">나눔 탐색</p>}
          <Image src="/images/icons/img.png" alt="profile" width={28} height={28} />
        </div>
        <div className="h-[74px] mx-[10px] px-[20px] pb-[8px] bg-white/70">
          <input
            type="text"
            name=""
            id=""
            className="w-[320px] h-[34px] mb-[13px] py-[8px] bg-grey-500/5 text-grey-500 text-[12px] rounded-[10px] text-center"
            placeholder="필요한 물품을 검색하세요."
          />
          <div className="flex justify-between w-[320px] h-[24px] mx-auto items-start">
            <div className="flex h-[26px] py-[5px] ps-[10px] pe-[5px] items-center rounded-[9999px] bg-green-100">
              <p className="text-grey-800 text-[9px]">지역</p>
              <Image
                src="/assets/images/dropdown_category.png"
                width={6.67}
                height={3.33}
                alt="dropdown"
                className="w-[6.67px] h-[3.33px] mx-[4.67px]"
              />
            </div>
            <div className="flex h-[26px] py-[5px] ps-[10px] pe-[5px] items-center rounded-[9999px] bg-green-100">
              <p className="text-grey-800 text-[9px]">카테고리</p>
              <Image
                src="/assets/images/dropdown_category.png"
                width={6.67}
                height={3.33}
                alt="dropdown"
                className="w-[6.67px] h-[3.33px] mx-[4.67px]"
              />
            </div>
            <div className="flex h-[26px] py-[5px] ps-[10px] pe-[5px] items-center rounded-[9999px] bg-green-100">
              <p className="text-grey-800 text-[9px]">물품상태</p>
              <Image
                src="/assets/images/dropdown_category.png"
                width={6.67}
                height={3.33}
                alt="dropdown"
                className="w-[6.67px] h-[3.33px] mx-[4.67px]"
              />
            </div>
            <div className="flex h-[26px] py-[5px] ps-[10px] pe-[5px] items-center rounded-[9999px] bg-green-100">
              <p className="text-grey-800 text-[9px]">나눔요일</p>
              <Image
                src="/assets/images/dropdown_category.png"
                width={6.67}
                height={3.33}
                alt="dropdown"
                className="w-[6.67px] h-[3.33px] mx-[4.67px]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
