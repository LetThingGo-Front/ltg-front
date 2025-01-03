"use client";

import React from "react";
import Image from "next/image";
import FavoriteButton from "./button/FavoriteButton";

export default function FavoriteLocation() {
  return (
    <div className="flex gap-2">
      <div className="flex items-center gap-3">
        <FavoriteButton
          defaultImageUrl="/assets/images/home.svg"
          activeImageUrl="/assets/images/home.svg"
          name="집 근처"
        />
        <FavoriteButton
          defaultImageUrl="/assets/images/marker/location_marked.svg"
          activeImageUrl="/assets/images/marker/location_marked.svg"
          name="회사사 근처"
        />
        <FavoriteButton
          defaultImageUrl="/assets/images/marker/location_marked.svg"
          activeImageUrl="/assets/images/marker/location_marked.svg"
          name="기타"
        />
      </div>
    </div>
  );
}
