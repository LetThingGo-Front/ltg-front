'use client';

import React, { useState } from 'react';
import Image from 'next/image';

type Props = {
  request: () => void;
};

export default function RequestButton({ request }: Props) {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      className={`flex rounded-full relative items-center gap-[66px] w-[300px] sm:w-[442px] h-16 sm:h-[72px] max-sm:px-3 max-sm:py-2 sm:p-4 shadow-[0_0_10px_0_rgba(0,0,0,0.10)] font-semibold text-grey-800 backdrop-blur-[50px] border-white border-2`}
    >
      <button
        className="duration-500 ease-in-out hover:rounded-full hover:bg-grey-800 hover:text-white flex justify-center items-center gap-2 sm:gap-3 p-3 relative w-full sm:w-[176px] h-12 z-10"
        onClick={request}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Image
          src={`/assets/images/button/${isHover ? 'thing_md_white.svg' : 'thing_md_black.svg'}`}
          alt="나눔 신청"
          width={24}
          height={24}
        />
        <p className="max-sm:text-xs max-sm:font-semibold">나눔 신청</p>
      </button>
      <button className="max-sm:hidden duration-500 ease-in-out hover:rounded-full hover:bg-grey-800 hover:text-white flex justify-center items-center gap-3 p-3 relative w-[176px] h-12 z-10">
        <Image src="/assets/images/button/thunder.svg" alt="나눔 신청" width={32} height={32} />
        <p>오늘 번개 신청</p>
      </button>
      <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full bg-gradient-to-r from-0% from-[#b7b7b7] via-100%  to-[#E1F452] to-[46%] opacity-10"></div>
    </div>
  );
}
