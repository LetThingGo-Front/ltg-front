import Link from "next/link";
import React from "react";

export default function NotfoundPage() {
  return (
    <div className="fixed inset-0 z-50 flex h-auto items-center justify-center bg-white">
      <div className="text-center">
        <p className="text-[6.25rem] font-bold text-green-400 sm:text-[10.625rem]">
          404
        </p>
        <h1 className="sm:leading-0 text-lg font-semibold sm:text-[1.875rem]">
          이 페이지는 찾을 수 없어요!
        </h1>
        <button className="mt-4 rounded-md bg-green-400 px-4 py-2 font-bold text-white sm:mt-8 sm:text-xl">
          <Link href="/">홈으로</Link>
        </button>
      </div>
    </div>
  );
}
