import React from "react";

type Props = {
  title: string;
  required?: boolean;
  subText?: string;
};

export default function SemiTitle({ title, required, subText }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-start justify-start">
        <p className="text-xs font-bold text-grey-800 sm:text-xl">{title}</p>
        {required && <p className="text-xs font-bold text-rose-600">*</p>}
      </div>
      {subText && (
        <p className="text-xxxs font-medium text-grey-400 sm:text-sm">
          {subText}
        </p>
      )}
    </div>
  );
}
