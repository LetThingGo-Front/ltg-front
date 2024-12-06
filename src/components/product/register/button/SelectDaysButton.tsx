import clsx from "clsx";
import React from "react";
import Image from "next/image";

type Props = {
  selectAllTimes: boolean;
  setSelectAllTimes: () => void;
};

export default function SelectDaysButton({
  selectAllTimes,
  setSelectAllTimes,
}: Props) {
  return (
    <button
      className={clsx(
        "flex cursor-pointer items-center justify-center gap-2 rounded-[0.625rem] border-[0.0625rem] border-grey-50",
        selectAllTimes ? "bg-green-400" : "bg-white",
      )}
      onClick={setSelectAllTimes}
      type="button"
    >
      <p className="font-semibold text-grey-800 max-sm:text-xxxs">
        요일만 선택하기
      </p>
      <div
        className={clsx(
          "flex h-2 w-2 items-center justify-center rounded-full sm:h-4 sm:w-4",
          selectAllTimes
            ? "bg-white"
            : "shadow-[inset_0_4px__12.6px_0__rgba(0,0,0,0.2)]",
        )}
      >
        <Image
          className={clsx(
            "h-1.5 w-1.5 sm:h-[0.625rem] sm:w-[0.625rem]",
            !selectAllTimes && "hidden",
          )}
          src="/assets/images/button/check.svg"
          width={16}
          height={16}
          alt="선택"
        />
      </div>
    </button>
  );
}
