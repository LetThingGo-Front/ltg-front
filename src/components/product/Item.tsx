'use client';

import React, { useState } from 'react';
import ItemSwiper from './ItemSwiper';
import Image from 'next/image';
import ShareMap from './map/ShareMap';
import RequestButton from './RequestButton';
import RequestPopup from './popup/RequestPopup';
import FadeInWrapper from '../common/FadeInWrapper';

export default function Item() {
  const [requestPopup, setRequestPopup] = useState(false);
  return (
    <div className={`flex justify-center`}>
      <div
        className={`relative flex justify-center ${requestPopup ? 'max-w-[660px] px-24 -translate-x-full' : 'max-w-[800px] translate-x-0'} max-h-[828px] duration-500`}
      >
        <div className="absolute w-full flex flex-col justify-center items-center gap-4 backdrop-blur-lg bg-white bg-opacity-80 z-10">
          <div className="flex justify-center items-center gap-3">
            <p className="font-bold text-[28px]">세상에서 가장 쉬운 코딩책</p>
            <Image src="/assets/images/sample/star.png" alt="bookmark" width={24} height={24} />
          </div>
          <div className="flex gap-3 text-xs font-semibold">
            <span className="px-3 py-2 bg-blue-500 rounded-md text-white">도서</span>
            <span className="px-3 py-2 bg-gray-100 rounded-md text-gray-800">거의 사용안해서 새것 같음</span>
          </div>
        </div>
        <div className="flex flex-col gap-[52px] overflow-x-hidden pt-[110px] scrollbar-hide">
          <div className="flex justify-center">
            <div className="w-[440px]">
              <ItemSwiper />
            </div>
          </div>
          <div className="flex justify-center items-center gap-2">
            <Image src="/assets/images/sample/profile.png" alt="프로필" width={32} height={32} />
            <p className="font-bold text-gray-800">바쁜 날다람쥐</p>
            <p className="text-sm font-semibold text-gray-500">오늘 올림</p>
          </div>
          <div className="text-center text-xl">
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
        <div className="flex justify-center items-center w-full absolute bottom-[-40px]">
          {!requestPopup && <RequestButton request={() => setRequestPopup(true)} />}
        </div>
      </div>
      {requestPopup && (
        <FadeInWrapper>
          <RequestPopup setRequestPopup={setRequestPopup} />
        </FadeInWrapper>
      )}
      <div
        className={`fixed w-screen h-screen left-0 top-0 opacity-50 bg-black z-10 ${!requestPopup && 'hidden'}`}
      ></div>
    </div>
  );
}
