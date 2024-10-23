import React from "react";

type Props = {
  name: string;
  select?: boolean;
  onClick: () => void;
};

export default function ItemBox({ name, select, onClick }: Props) {
  return (
    <button
      className={`${select ? "bg-black text-white" : "bg-grey-50 text-grey-300"} w-max cursor-pointer rounded-full px-[10px] py-1 text-center text-[10px] font-semibold sm:px-4 sm:py-[6px] sm:text-xs`}
      onClick={onClick}
      type="button"
    >
      {name}
    </button>
  );
}
