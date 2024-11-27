"use client";

import React from "react";
import ItemCard from "./ItemCard";
import clsx from "clsx";

type Props = {
  setIsScrolling: (isScrolling: boolean) => void;
  currentIndex: number;
};

export default function ItemCardList({ setIsScrolling, currentIndex }: Props) {
  const cardList = Array.from({ length: 15 }, (_, i) => i);
  return (
    <div className="flex flex-col items-center justify-center max-sm:mt-1">
      <div className="mb-5 min-w-[19.5rem] sm:w-full sm:pl-6 sm:text-xl">
        <span className="font-bold text-grey-800">검색 결과 </span>
        <span className="font-semibold text-grey-500">({cardList.length})</span>
      </div>
      <div
        className={clsx(
          "overflow-x-auto overflow-y-auto pb-[5.625rem] sm:pb-[7.5rem]",
          currentIndex === 0 && "h-[calc(100dvh*0.7)]",
          currentIndex === 1 && "h-[15rem]",
        )}
        onTouchStart={() => setIsScrolling(true)}
        onTouchEnd={() => setIsScrolling(false)}
        onTouchMove={(e) => e.preventDefault()}
      >
        <div className="gap-x-12b mb-10 flex flex-wrap justify-center gap-5 sm:ml-6 sm:justify-start sm:gap-12">
          {cardList.map((_, i) => (
            <ItemCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
