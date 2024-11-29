"use client";

import React from "react";
import ItemCard from "./ItemCard";

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
      className="mb-[5.75rem] flex flex-wrap justify-center gap-5 sm:mb-[8.4375rem] sm:ml-6 sm:justify-start sm:gap-12"
      ref={itemListRef}
      onTouchStart={disablePropagation}
      onTouchEnd={disablePropagation}
    >
      {cardList.map((_, i) => (
        <ItemCard key={i} />
      ))}
      <button className="h-[7rem] w-[19.5rem] rounded-[1.875rem] bg-green-400">
        last item
      </button>
    </div>
  );
}
