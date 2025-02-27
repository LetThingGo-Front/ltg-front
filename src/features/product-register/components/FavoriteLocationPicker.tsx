"use client";

import React from "react";
import Image from "next/image";
import FavoriteButton from "./button/FavoriteButton";
import { favoriteItems } from "../constants/constants";

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
