import React from "react";
import Image from "next/image";
import clsx from "clsx";

type TextInputProps = {
  placeholder: string;
  clearText: () => void;
};

export default function TextInput({ placeholder, clearText }: TextInputProps) {
  return (
    <div className="flex h-8 items-center justify-center gap-2 rounded-[10px] bg-grey-50 p-3 backdrop-blur-[10px] sm:h-11">
      <input
        className="shrink grow basis-0 bg-transparent text-sm font-semibold text-grey-700 outline-none placeholder:text-grey-400 max-sm:text-[10px]"
        placeholder={placeholder}
      />
      <button onClick={clearText}>
        <Image
          src="/assets/images/button/close_grey.svg"
          width={12}
          height={12}
          alt="close"
        />
      </button>
    </div>
  );
}
