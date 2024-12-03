import React from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

type LandingButtonProps = {
  imgSrc: string;
  label: string;
  altText: string;
  url: string;
  loginCheck?: boolean;
  isLogin?: boolean;
};
export default function LandingButton({
  imgSrc,
  label,
  altText,
  url,
  loginCheck,
  isLogin = false,
}: LandingButtonProps) {
  return (
    <Link className="w-full" href={url}>
      <button
        className={clsx(
          "flex w-full items-center rounded-full px-3 py-1 text-[0.8125rem] font-semibold shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] sm:py-2 sm:text-[0.875rem]",
          loginCheck && !isLogin ? "bg-green-400" : "bg-white",
        )}
      >
        <Image src={imgSrc} alt={altText} width={30} height={30} />
        <p className="ml-auto mr-5 w-full text-center">{label}</p>
      </button>
    </Link>
  );
}
