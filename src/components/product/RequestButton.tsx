import React from 'react';
import Image from 'next/image';

type Props = {
  request: () => void;
};

export default function RequestButton({ request }: Props) {
  return (
    <div
      className={`flex rounded-full relative items-center gap-[66px] w-[442px] h-[72px] p-4 shadow-[0_0_15px_-10px_rgba(0,0,0,0.75)] font-semibold text-gray-800 backdrop-blur-lg border-white border-2`}
    >
      <button className="flex justify-center items-center gap-3 p-3 relative w-[176px] h-12 z-10" onClick={request}>
        <Image src="/assets/images/button/thing_md.svg" alt="나눔 신청" width={24} height={24} />
        <p>나눔 신청</p>
      </button>
      <button className="flex justify-center items-center gap-3 p-3 relative w-[176px] h-12 z-10">
        <Image src="/assets/images/button/thunder.svg" alt="나눔 신청" width={32} height={32} />
        <p>오늘 번개 신청</p>
      </button>
      <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full bg-gradient-to-r from-0% from-[#b7b7b7] via-100%  to-[#E1F452] to-[46%] opacity-10"></div>
    </div>
  );
}
