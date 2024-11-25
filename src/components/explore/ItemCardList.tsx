"use client";

import React, { useState } from "react";
import ItemCard from "./ItemCard";

type Props = {
  setIsScrolling: (isScrolling: boolean) => void;
};

export default function ItemCardList({ setIsScrolling }: Props) {
  return (
    <div
      className=""
      onTouchStart={() => setIsScrolling(true)}
      onTouchEnd={() => setIsScrolling(false)}
      onTouchMove={(e) => e.preventDefault()}
    >
      <div className="ml-5 mt-4 sm:ml-11">
        <span className="text-xl text-grey-800">검색 결과 </span>
        <span className="text-xl text-grey-500">(13)</span>
      </div>
      <div className="mt-5 h-[calc(100dvh-8.125rem)] cursor-grab overflow-x-auto overflow-y-auto pb-[6.875rem] sm:h-[calc(100dvh-9.75rem)]">
        <div className="mb-10 flex flex-wrap justify-center gap-12 sm:ml-11">
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
