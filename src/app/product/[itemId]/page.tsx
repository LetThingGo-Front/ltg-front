import ShareMap from '@/components/product/map/ShareMap';
import Image from 'next/image';
import React from 'react';

export default function page() {
  return (
    <div className="mt-20 flex flex-col justify-center items-center">
      <div className="max-w-[440px] max-h-[1000px] overflow-x-scroll">
        <div className="flex flex-col justify-center items-center mt-[60px]">
          <div className="flex items-center mt-[10px] gap-2">
            <Image src="/assets/images/sample/profile.png" alt="프로필" width={32} height={32} />
            <p className="font-bold text-gray-800">바쁜 날다람쥐</p>
            <p className="text-sm font-semibold text-gray-500">오늘 올림</p>
          </div>
          <div className="flex justify-center items-center mt-10 gap-3">
            <p className="font-bold text-[28px]">세상에서 가장 쉬운 코딩책</p>
            <Image src="/assets/images/sample/star.png" alt="bookmark" width={24} height={24} />
          </div>
          <div className="flex mt-5 mb-12 gap-3 text-xs font-semibold">
            <span className="px-3 py-2 bg-blue-500 rounded-md text-white">도서</span>
            <span className="px-3 py-2 bg-gray-100 rounded-md text-gray-800">거의 사용안해서 새것 같음</span>
          </div>
        </div>
        <div className="">
          <Image src="/assets/images/sample/book.png" alt="책" width={440} height={474} />
        </div>
        <div className="mt-[70px]">
          <p>
            We&apos;re happy to share our latest brand guidelines concept of Juta Bank, a fintech enhancing the way you
            manage your financial goals. At Juta Bank, we believe that managing your finances should be a delightful
            experience. We’ve crafted a brand that embodies simplicity, security, and joy. With Juta Bank, financial
            freedom is at your fingertips. Achieve your goals effortlessly and happily with our user-friendly, secure
            platform designed to empower your financial future. Presenting today&apos;s creative concept by&nbsp;Rifki
          </p>
        </div>
        <div className="mt-10">
          <ShareMap />
        </div>
      </div>
    </div>
  );
}
