import React from "react";
import Image from "next/image";

type Props = {
  defaultImageUrl: string;
  activeImageUrl: string;
  name: string;
};

export default function FavoriteButton({
  defaultImageUrl,
  activeImageUrl,
  name,
}: Props) {
  return (
    <button className="h-8 w-[5.3125rem]" type="button">
      <div className="flex items-center justify-center">
        <Image src={defaultImageUrl} width={16} height={16} alt={name} />
        <p className="text-xxs font-bold">{name}</p>
      </div>
    </button>
  );
}
