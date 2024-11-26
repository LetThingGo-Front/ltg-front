import React from "react";
import Image from "next/image";

type Props = {
  categoryName: string;
};

export default function SearchCategroyButton({ categoryName }: Props) {
  return (
    <div className="flex cursor-pointer gap-1 rounded-full bg-white py-[0.3125rem] pl-[0.625rem] pr-[0.3125rem] sm:gap-2">
      <p className="text-xxs font-semibold sm:text-xs">{categoryName}</p>
      <Image
        src="/assets/images/down_arrow.svg"
        alt="dropdown"
        width={16}
        height={16}
      />
    </div>
  );
}
