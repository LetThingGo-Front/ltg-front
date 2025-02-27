"use client";

import React from "react";
import Image from "next/image";
import FavoriteButton from "./button/FavoriteButton";

type FavoriteItem = {
  name: string;
  fcode: string;
  defaultImageUrl: string;
  activeImageUrl: string;
};

type Props = {
  favorite: string;
  setFavorite: (favorite: string) => void;
};

const favoriteItems: FavoriteItem[] = [
  {
    name: "집 근처",
    fcode: "H",
    defaultImageUrl: "/assets/images/home.svg",
    activeImageUrl: "/assets/images/home_white.svg",
  },
  {
    name: "회사 근처",
    fcode: "W",
    defaultImageUrl: "/assets/images/building.svg",
    activeImageUrl: "/assets/images/building_white.svg",
  },
  {
    name: "기타",
    fcode: "E",
    defaultImageUrl: "/assets/images/marker/location_marked.svg",
    activeImageUrl: "/assets/images/marker/location_marked_white.svg",
  },
];

export default function FavoriteLocationPicker({
  favorite,
  setFavorite,
}: Props) {
  return (
    <div className="flex gap-2">
      <div className="flex w-full items-center gap-3">
        {favoriteItems.map((item) => (
          <FavoriteButton
            key={item.fcode}
            onClick={() => setFavorite(item.fcode)}
            defaultImageUrl={item.defaultImageUrl}
            activeImageUrl={item.activeImageUrl}
            fcode={item.fcode}
            favorite={favorite}
            name={item.name}
          />
        ))}
      </div>
    </div>
  );
}
