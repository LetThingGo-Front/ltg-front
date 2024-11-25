"use client";

import React, { useState } from "react";
import ItemCard from "./ItemCard";
import clsx from "clsx";

type Props = {
  setIsScrolling: (isScrolling: boolean) => void;
  currentIndex: number;
};

export default function ItemCardList({ setIsScrolling, currentIndex }: Props) {
  return (
    <div
      className="flex flex-col items-center justify-center"
      onTouchStart={() => setIsScrolling(true)}
      onTouchEnd={() => setIsScrolling(false)}
      onTouchMove={(e) => e.preventDefault()}
    >
      <div className="mb-4 w-[19.5rem] sm:mt-4 sm:w-full sm:pl-6 sm:text-xl">
        <span className="text-grey-800">검색 결과 </span>
        <span className="text-grey-500">(13)</span>
      </div>
      <div
        className={clsx(
          "overflow-x-auto overflow-y-auto pb-[5.625rem] sm:pb-[7.5rem]",
          currentIndex === 0 && "h-[calc(100dvh*0.7)] sm:h-[calc(100dvh*0.7)]",
          currentIndex === 1 && "h-[calc(100dvh*0.3)] sm:h-[calc(100dvh*0.3)]",
        )}
      >
        <div className="mb-10 flex flex-wrap justify-center gap-12 sm:ml-6 sm:justify-start">
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </div>
      </div>
    </div>
  );
}
