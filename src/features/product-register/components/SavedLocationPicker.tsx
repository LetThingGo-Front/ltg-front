"use client";

import React from "react";
import SavedFavoriteButton from "./button/SavedFavoriteButton";
import { favoriteItems } from "../constants/constants";

type Props = {
  favorite: string;
  getFavoriteLocation: (fcode: string) => void;
  setInputDisabled: (inputDisabled: boolean) => void;
};

export default function SavedLocationPicker({
  favorite,
  getFavoriteLocation,
  setInputDisabled,
}: Props) {
  return (
    <div className="flex gap-2">
      <div className="flex w-full items-center gap-1">
        {favoriteItems.map((item) => (
          <SavedFavoriteButton
            key={item.fcode}
            defaultImageUrl={item.defaultImageUrl}
            activeImageUrl={item.activeImageUrl}
            name={item.name}
            fcode={item.fcode}
            favorite={favorite}
            onClick={() => {
              getFavoriteLocation(item.fcode);
              setInputDisabled(true);
            }}
          />
        ))}
      </div>
    </div>
  );
}
