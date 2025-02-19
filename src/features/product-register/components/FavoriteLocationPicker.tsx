"use client";

import React from "react";
import Image from "next/image";
import FavoriteButton from "./button/FavoriteButton";

type Props = {
  favorite: string;
  setFavorite: (favorite: string) => void;
};

export default function FavoriteLocationPicker({
  favorite,
  setFavorite,
}: Props) {
  return (
    <div className="flex gap-2">
      <div className="flex w-full items-center gap-3">
        <FavoriteButton
          defaultImageUrl="/assets/images/home.svg"
          activeImageUrl="/assets/images/home_white.svg"
          name="집 근처"
          fcode="H"
          favorite={favorite}
          onClick={() => setFavorite("H")}
        />
        <FavoriteButton
          defaultImageUrl="/assets/images/building.svg"
          activeImageUrl="/assets/images/building_white.svg"
          name="회사 근처"
          fcode="W"
          favorite={favorite}
          onClick={() => setFavorite("W")}
        />
        <FavoriteButton
          defaultImageUrl="/assets/images/marker/location_marked.svg"
          activeImageUrl="/assets/images/marker/location_marked_white.svg"
          name="기타"
          fcode="E"
          favorite={favorite}
          onClick={() => setFavorite("E")}
        />
      </div>
    </div>
  );
}
