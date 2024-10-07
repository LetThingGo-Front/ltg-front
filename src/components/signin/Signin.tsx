'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import CloseButton from './button/CloseButton';
import useLoginPopupStore from '@/store/LoginStore';

export default function SignIn() {
  // 사이트 확인용으로 true로 설정, 실제로는 false로 설정
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
      className={`${!isOpen && 'hidden'} fixed flex justify-center items-center w-full h-full top-0 left-0 z-10 backdrop-blur-lg`}
    >
      <div className="bg-white rounded-[20px] sm:min-w-[474px] sm:min-h-[630px] min-w-[304px] min-h-[556px]">
        <div className=" bg-black bg-opacity-70 text-gray-200 rounded-[20px] sm:min-w-[474px] sm:min-h-[630px] min-w-[304px] min-h-[556px]">
          <div className="flex justify-end">
            <div className="flex justify-center items-center w-[60px] h-[60px]">
              <CloseButton close={closeLoginPopup} />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center mx-[30px] sm:mt-[120px] mt-[100px]">
            <div className="flex flex-col justify-center items-center min-w-[250px] w-[194px] h-224px]">
              <div className="sm:mb-[90px] mb-[51px]">
                <Image
                  className="sm:w-[212px] sm:h-[69px] w-[176px] h-[58px]"
                  src="/assets/images/logo.svg"
                  width={212}
                  height={69}
                  alt="letthinggo logo"
                />
              </div>
              <div className="flex flex-col sm:gap-6 gap-5">
                <p className="sm:text-base text-sm">소셜 미디어 계정으로 로그인하기</p>
                <div className="flex justify-between">
                  <p className="flex justify-center items-center bg-[#ffeC00] w-10 h-10 rounded-full">
                    <button
                      onClick={() => {
                        socialLogin('kakao');
                      }}
                    >
                      <Image src="/assets/images/kakao.svg" width={17} height={15} alt="kakao" />
                    </button>
                  </p>
                  <p className="flex justify-center items-center bg-[#03cf5d] w-10 h-10 rounded-full">
                    <button
                      onClick={() => {
                        socialLogin('naver');
                      }}
                    >
                      <Image src="/assets/images/naver.svg" width={17} height={15} alt="naver" />
                    </button>
                  </p>
                  <button
                    onClick={() => {
                      socialLogin('google');
                    }}
                  >
                    <Image src="/assets/images/google_logo.svg" width={40} height={40} alt="google" />
                  </button>
                </div>
              </div>
            </div>
            <div className="sm:mt-[100px] mt-20">
              <p className="sm:text-xs text-[10px]">렛띵고 앱에서 나눔 계속하기</p>
            </div>
            <div className="flex gap-2 sm:mt-6 mt-10">
              <Image src="/assets/images/googleplay.svg" width={103} height={30} alt="googleplay" />
              <Image src="/assets/images/appstore.svg" width={103} height={30} alt="appstore" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
