'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function ProfileButton() {
  const [isHover, setIsHover] = useState(false);
  return (
    <button
      className={`${isHover ? 'bg-grey-900 pl-2 pr-4' : 'px-10'} w-[298px] h-12 py-2 rounded-full justify-center items-center gap-3 inline-flex cursor-auto`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="grow shrink basis-0 h-8 justify-start items-center gap-3 flex">
        <Image src="/assets/images/sample/profile.png" alt="프로필" width={32} height={32} />
        <p className={`font-bold ${isHover ? 'text-white' : 'text-grey-800'}`}>바쁜 날다람쥐</p>
        {!isHover && <p className="text-sm font-semibold text-grey-500">오늘 올림</p>}
        {isHover && <p className="text-grey-200 text-xs font-normal">3.5</p>}
      </div>
      {isHover && <p className="text-right text-grey-200 text-xs font-medium">프로필 보기 </p>}
    </button>
  );
}
