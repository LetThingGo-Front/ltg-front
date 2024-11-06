import React from "react";
import Image from "next/image";

type LandingButtonProps = {
  imgSrc: string;
  label: string;
  altText: string;
};
export default function LandingButton({
  imgSrc,
  label,
  altText,
}: LandingButtonProps) {
  return (
    <button className="flex w-full items-center rounded-full bg-white px-3 py-1 shadow-lg sm:py-2">
      <Image src={imgSrc} alt={altText} width={30} height={30} />
      <p className="ml-auto mr-5 w-full text-center">{label}</p>
    </button>
  );
}
