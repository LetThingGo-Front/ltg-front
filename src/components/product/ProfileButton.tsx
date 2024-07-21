'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function ProfileButton() {
  const [isHover, setIsHover] = useState(false);
  return (
    <button
      className={`${isHover ? 'bg-grey-900 pl-2 pr-3 sm:pr-4' : 'p-2 sm:px-10'} w-[216px] sm:w-[298px] h-9 sm:h-12 sm:py-2 rounded-full justify-center items-center gap-3 inline-flex cursor-auto`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className={`flex ${isHover ? 'justify-start' : 'justify-center'} grow shrink basis-0 h-8 items-center gap-3 `}
      >
        <p className="w-5 h-5 sm:w-8 sm:h-8">
          <Image src="/assets/images/sample/profile.png" alt="프로필" width={32} height={32} />
        </p>
        <p className={`font-bold ${isHover ? 'text-white' : 'text-grey-800'} max-sm:text-xs`}>바쁜 날다람쥐님</p>
        {!isHover && <p className="text-sm font-semibold text-grey-500 max-sm:text-[8px]">오늘 올림</p>}
        {isHover && <p className="text-grey-200 text-[8px] sm:text-xs font-normal">3.5</p>}
      </div>
      {isHover && <p className="text-right text-grey-200 text-[8px] sm:text-xs font-medium">프로필 보기 </p>}
    </button>
  );
}
