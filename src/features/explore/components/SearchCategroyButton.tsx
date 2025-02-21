import React from "react";
import Image from "next/image";
import clsx from "clsx";

type Props = {
  categoryName: string;
  activeCategoryBtn: string;
  setActiveCategoryBtn: (categoryName: string) => void;
};

export default function SearchCategroyButton({
  categoryName,
  activeCategoryBtn,
  setActiveCategoryBtn,
}: Props) {
  const categoryButtonHandler = () => {
    activeCategoryBtn === categoryName
      ? setActiveCategoryBtn("")
      : setActiveCategoryBtn(categoryName);
  };
  return (
    <button
      className={clsx(
        "flex min-w-[4.375rem] cursor-pointer justify-center gap-1 rounded-full py-[0.3125rem] pl-[0.625rem] pr-[0.3125rem] hover:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] sm:gap-2",
        activeCategoryBtn === categoryName ? "bg-black text-white" : "bg-white",
      )}
      onClick={categoryButtonHandler}
    >
      <p className="text-xxs font-semibold sm:text-xs">{categoryName}</p>
      {activeCategoryBtn === categoryName ? (
        <Image
          src="/assets/images/up_arrow.svg"
          alt="dropdown"
          width={16}
          height={16}
        />
      ) : (
        <Image
          src="/assets/images/down_arrow.svg"
          alt="dropdown"
          width={16}
          height={16}
        />
      )}
    </button>
  );
}
