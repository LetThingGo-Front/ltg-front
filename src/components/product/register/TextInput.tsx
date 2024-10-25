import React from "react";
import Image from "next/image";
import clsx from "clsx";

type TextInputProps = {
  placeholder: string;
  clearField: () => void;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  inputRef?: (el: HTMLInputElement) => void;
};

export default function TextInput({
  placeholder,
  clearField,
  value,
  onChange,
  onBlur,
  name,
  inputRef,
}: TextInputProps) {
  return (
    <div className="flex h-8 items-center justify-center gap-2 rounded-lg bg-grey-50 p-3 backdrop-blur-[10px] sm:h-11">
      <input
        className="shrink grow basis-0 bg-transparent text-sm font-semibold text-grey-700 outline-none placeholder:text-grey-400 max-sm:text-[0.625rem]"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        name={name}
        ref={inputRef}
      />
      {value && (
        <button onClick={clearField} type="button">
          <Image
            src="/assets/images/button/close_grey.svg"
            width={12}
            height={12}
            alt="close"
          />
        </button>
      )}
    </div>
  );
}
