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

export default function FavoriteButton({
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
        "flex h-8 w-full max-w-[5.3125rem] cursor-pointer items-center justify-center rounded-[0.625rem] border border-grey-200",
        favorite === fcode && "bg-black/[0.66] text-white",
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-center">
        {favorite === fcode ? (
          <Image src={activeImageUrl} width={16} height={16} alt={name} />
        ) : (
          <Image src={defaultImageUrl} width={16} height={16} alt={name} />
        )}
        <p className="text-xxs font-bold">{name}</p>
      </div>
    </div>
  );
}
