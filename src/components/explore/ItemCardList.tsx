"use client";

import React from "react";
import ItemCard from "./ItemCard";
import { ItemListResponse } from "./SheetModal";

type Props = {
  itemSearchList?: ItemListResponse[];
};

export default function ItemCardList({ itemSearchList }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-5 sm:ml-6 sm:justify-start sm:gap-12">
      {itemSearchList?.map((item, i) => <ItemCard key={i} item={item} />)}
      <button className="h-[7rem] w-[19.5rem] rounded-[1.875rem] bg-green-400">
        last item
      </button>
    </div>
  );
}
