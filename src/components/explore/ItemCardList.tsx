"use client";

import React from "react";
import ItemCard from "./ItemCard";
import clsx from "clsx";

type Props = {
  itemListRef: React.RefObject<HTMLDivElement>;
};

export default function ItemCardList({ itemListRef }: Props) {
  const cardList = Array.from({ length: 20 }, (_, i) => i);
  const disablePropagation = (e: React.TouchEvent) => {
    e.stopPropagation();
  };
  return (
    <div
      className="mb-[5.75rem] flex flex-col"
      ref={itemListRef}
      onTouchStart={disablePropagation}
      onTouchEnd={disablePropagation}
    >
      <div className="mb-5 flex justify-center sm:ml-6 sm:text-xl">
        <div className="flex w-[19.5rem] justify-start sm:w-full">
          <span className="font-bold text-grey-800">검색 결과</span>
          <span className="font-semibold text-grey-500">
            ({cardList.length})
          </span>
        </div>
      </div>
      <div
        className={clsx(
          "flex flex-wrap justify-center gap-5 sm:ml-6 sm:justify-start sm:gap-12",
        )}
      >
        {cardList.map((_, i) => (
          <ItemCard key={i} />
        ))}
        <button className="h-[7rem] w-[19.5rem] rounded-[1.875rem] bg-green-400">
          last item
        </button>
      </div>
    </div>
  );
}
