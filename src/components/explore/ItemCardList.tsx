"use client";

import React from "react";
import ItemCard from "./ItemCard";
import { ItemListResponse } from "./SheetModal";

type Props = {
  itemSearchList?: ItemListResponse[];
};

export default function ItemCardList({ itemSearchList }: Props) {
  console.log(itemSearchList);
  return (
    <div
      className="mb-[5.125rem] flex flex-wrap justify-center gap-5 sm:mb-[8.4375rem] sm:ml-6 sm:justify-start sm:gap-12"
      onTouchStart={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
    >
      {itemSearchList?.map((item, i) => (
        <ItemCard key={item.itemId} item={item} />
      ))}
      {/* <button className="h-[7rem] w-[19.5rem] rounded-[1.875rem] bg-green-400">
        last item
      </button> */}
    </div>
  );
}
