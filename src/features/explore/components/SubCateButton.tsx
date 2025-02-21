import clsx from "clsx";
import React from "react";

type Props = {
  name: string;
};

export default function SubCateButton({ name }: Props) {
  return (
    <button
      className={clsx(
        "flex min-w-[4.375rem] cursor-pointer justify-center gap-1 rounded-full bg-white py-[0.3125rem] pl-[0.625rem] pr-[0.3125rem] hover:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] sm:gap-2",
      )}
    >
      <p className="text-xxs font-semibold sm:text-xs">{name}</p>
    </button>
  );
}
