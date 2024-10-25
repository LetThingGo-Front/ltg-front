import React from "react";

type Props = {
  name: string;
  select?: boolean;
  onClick: () => void;
};

export default function ItemBox({ name, select, onClick }: Props) {
  return (
    <button
      className={`${select ? "bg-black text-white" : "bg-grey-50 text-grey-300"} text-xxs w-max cursor-pointer rounded-full px-[0.625rem] py-1 text-center font-semibold sm:px-4 sm:py-[0.375rem] sm:text-xs`}
      onClick={onClick}
      type="button"
    >
      {name}
    </button>
  );
}
