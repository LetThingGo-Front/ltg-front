'use client';

import React, { useState } from 'react';
import ItemSwiper from './ItemSwiper';
import Image from 'next/image';
import ShareMap from './map/ShareMap';
import RequestButton from './RequestButton';
import RequestPopup from './popup/RequestPopup';
import FadeInWrapper from '../common/FadeInWrapper';
import ProfileButton from './ProfileButton';

export default function Item() {
  const [requestPopup, setRequestPopup] = useState(false);
  const [star, setStar] = useState(false);

  return (
    <div className="flex justify-center">
      <div
        className={`relative flex justify-center ${requestPopup ? 'sm:w-[660px] sm:px-24 sm:-translate-x-[570px] sm:h-full' : 'sm:w-[800px] sm:translate-x-0 sm:max-h-[828px]'} h-[calc(100vh-64px)] duration-500`}
      >
        <div className="absolute w-full flex flex-col justify-center items-center gap-[12px] sm:gap-5 max-sm:px-[50px] py-[10px] backdrop-blur-lg bg-white bg-opacity-80 z-10">
          <div className="flex justify-center items-center gap-1 sm:gap-3 max-sm:h-[30px]">
            <p className="font-bold text-lg  sm:text-[28px]">세상에서 가장 쉬운 코딩책</p>
            <p onClick={() => setStar(!star)} className="cursor-pointer max-sm:w-[30px] max-sm:h-[30px] max-sm:p-[6px]">
              <Image
                src={`/assets/images/button/${star ? 'star_select.svg' : 'star_default.svg'}`}
                alt="bookmark"
                width={24}
                height={24}
              />
            </p>
          </div>
          <div className="flex justify-center items-center gap-3 text-xs font-semibold max-sm:h-5 max-sm:text-[8px]">
            <span className="px-[9px] sm:px-3 py-1 sm:py-2 bg-blue-500 rounded-md text-white">도서</span>
            <span className="px-[9px] sm:px-3 py-1 sm:py-2 bg-grey-100 rounded-md text-grey-800">
              거의 사용안해서 새것 같음
            </span>
          </div>
        </div>
        <div className="flex flex-col overflow-x-hidden pt-[112px] max-sm:px-[30px] gap-6 sm:gap-[52px] scrollbar-hide max-sm:mb-[80px]">
          <div className="flex justify-center">
            <div className="w-[300px] sm:w-[440px] h-[328px] sm:h-[474px]">
              <ItemSwiper />
            </div>
          </div>
          <div className="flex justify-center relative max-sm:p-2">
            <ProfileButton />
          </div>
          <div className="text-center text-xs sm:text-xl">
            <p>
              We&apos;re happy to share our latest brand guidelines concept of Juta Bank, a fintech enhancing the way
              you manage your financial goals. At Juta Bank, we believe that managing your finances should be a
              delightful experience. We’ve crafted a brand that embodies simplicity, security, and joy. With Juta Bank,
              financial freedom is at your fingertips. Achieve your goals effortlessly and happily with our
              user-friendly, secure platform designed to empower your financial future. Presenting today&apos;s creative
              concept by&nbsp;Rifki
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
        <div className="flex justify-center w-full fixed bottom-5 sm:bottom-0">
          {!requestPopup && <RequestButton request={() => setRequestPopup(true)} />}
        </div>
      </div>
      <RequestPopup setRequestPopup={setRequestPopup} requestPopup={requestPopup} />
      <div
        className={`fixed w-screen h-screen left-0 top-0 opacity-50 bg-black z-10 ${!requestPopup && 'hidden'}`}
      ></div>
    </div>
  );
}
