import React from "react";
import Image from "next/image";
import clsx from "clsx";

type Props = {
  defaultImageUrl: string;
  activeImageUrl: string;
  name: string;
  fcode: string;
  favorite: string;
  onClick?: () => void;
};

export default function SavedFavoriteButton({
  defaultImageUrl,
  activeImageUrl,
  name,
  fcode,
  favorite,
  onClick,
}: Props) {
  return (
    <div
      className={clsx(
        "flex h-5 max-w-[4.6875rem] cursor-pointer items-center justify-center gap-2 rounded-full",
        favorite === fcode ? "bg-black/[0.66] text-white" : "text-grey-400",
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-center py-1 pl-1 pr-2">
        {favorite === fcode ? (
          <Image
            className="h-3 w-3 sm:h-4 sm:w-4"
            src={activeImageUrl}
            width={16}
            height={16}
            alt={name}
          />
        ) : (
          <Image
            className="h-3 w-3 sm:h-4 sm:w-4"
            src={defaultImageUrl}
            width={16}
            height={16}
            alt={name}
          />
        )}
        <p className="text-xxs font-bold sm:text-xs">{name}</p>
      </div>
    </div>
  );
}
