"use client";

import React from "react";
import SavedFavoriteButton from "./button/SavedFavoriteButton";

type Props = {
  favorite: string;
  getFavoriteLocation: (fcode: string) => void;
  inputDisabled: boolean;
  setInputDisabled: (inputDisabled: boolean) => void;
};

export default function SavedLocationPicker({
  favorite,
  getFavoriteLocation,
  inputDisabled,
  setInputDisabled,
}: Props) {
  return (
    <div className="flex gap-2">
      <div className="flex w-full items-center gap-1">
        <SavedFavoriteButton
          defaultImageUrl="/assets/images/home.svg"
          activeImageUrl="/assets/images/home_white.svg"
          name="집 근처"
          fcode="H"
          favorite={favorite}
          onClick={() => {
            getFavoriteLocation("H");
            setInputDisabled(true);
          }}
        />
        <SavedFavoriteButton
          defaultImageUrl="/assets/images/building.svg"
          activeImageUrl="/assets/images/building_white.svg"
          name="회사 근처"
          fcode="W"
          favorite={favorite}
          onClick={() => {
            getFavoriteLocation("W");
            setInputDisabled(true);
          }}
        />
        <SavedFavoriteButton
          defaultImageUrl="/assets/images/marker/location_marked.svg"
          activeImageUrl="/assets/images/marker/location_marked_white.svg"
          name="기타"
          fcode="E"
          favorite={favorite}
          onClick={() => {
            getFavoriteLocation("E");
            setInputDisabled(true);
          }}
        />
      </div>
    </div>
  );
}
