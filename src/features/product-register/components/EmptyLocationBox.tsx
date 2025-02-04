import React from "react";
import Image from "next/image";

type Props = {
  setIsOpenLocationForm: () => void;
};

export default function EmptyLocationBox({ setIsOpenLocationForm }: Props) {
  return (
    <button
      className="flex h-[6.875rem] w-full items-center justify-center rounded-lg bg-grey-50 hover:bg-grey-100 active:bg-grey-50/70 sm:h-[11.25rem]"
      onClick={setIsOpenLocationForm}
      type="button"
    >
      <Image
        src="/assets/images/button/square_plus.svg"
        width={32}
        height={32}
        alt="add"
      />
    </button>
  );
}
