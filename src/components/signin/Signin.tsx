'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import CloseButton from './button/CloseButton';

export default function SignIn() {
  // 사이트 확인용으로 true로 설정, 실제로는 false로 설정
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div
      className={`${!isOpen && 'hidden'} fixed flex justify-center items-center w-full h-[calc(100%-32px)] mt-8 top-0 left-0 z-10 backdrop-blur-lg`}
    >
      <div className="relative bg-white rounded-[20px] max-w-[474px] max-h-[630px] w-full md:h-full h-[551px] mx-[30px]">
        <div className=" bg-black bg-opacity-70 text-gray-200 rounded-[20px] max-w-[474px] max-h-[630px] w-full md:h-full h-[551px]">
          <div className="flex justify-end">
            <div className="flex justify-center items-center w-[60px] h-[60px]">
              <CloseButton close={() => setIsOpen(false)} />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-auto h-[calc(100%-60px)] mx-[30px]">
            <div className="flex flex-col justify-center items-center">
              <div className="md:mb-[90px] mb-[51px]">
                <Image
                  className="md:w-[212px] md:h-[69px] w-[176px] h-[58px]"
                  src="/assets/images/logo.svg"
                  width={212}
                  height={69}
                  alt="letthinggo logo"
                />
              </div>
              <div className="flex flex-col md:gap-6 gap-5">
                <p className="md:text-base text-sm">소셜 미디어 계정으로 로그인하기</p>
                <div className="flex justify-between">
                  <p className="flex justify-center items-center bg-[#ffeC00] w-10 h-10 rounded-full">
                    <Image src="/assets/images/kakao.svg" width={17} height={15} alt="kakao" />
                  </p>
                  <p className="flex justify-center items-center bg-[#03cf5d] w-10 h-10 rounded-full">
                    <Image src="/assets/images/naver.svg" width={17} height={15} alt="naver" />
                  </p>
                  <Image src="/assets/images/google_logo.svg" width={40} height={40} alt="google" />
                </div>
              </div>
            </div>
            <div className="mt-12">
              <p className="md:text-xs text-[10px]">렛띵고 앱에서 나눔 계속하기</p>
            </div>
            <div className="flex gap-2 mt-6">
              <Image src="/assets/images/googleplay.svg" width={103} height={30} alt="googleplay" />
              <Image src="/assets/images/appstore.svg" width={103} height={30} alt="appstore" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
