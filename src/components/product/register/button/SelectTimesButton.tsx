import clsx from "clsx";
import React from "react";

type Props = {
  selectDay: string[];
  setOpenTime: () => void;
};

export default function SelectTimesButton({ selectDay, setOpenTime }: Props) {
  return (
    <button
      className={clsx(
        "min-h-5 cursor-pointer rounded-[0.625rem] bg-black/[0.03] text-center font-semibold max-sm:text-xxxs",
        selectDay.length === 0
          ? "text-grey-200"
          : "text-grey-800 pointerhover:hover:bg-black/20",
      )}
      disabled={selectDay.length === 0}
      onClick={setOpenTime}
      type="button"
    >
      시간 선택하기
    </button>
  );
}
