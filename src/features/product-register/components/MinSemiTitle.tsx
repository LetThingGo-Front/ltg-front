import React from "react";

type Props = {
  title: string;
  required?: boolean;
};

export default function MinSemiTitle({ title, required }: Props) {
  return (
    <div className="flex items-start justify-start">
      <p className="font-bold text-grey-800 max-sm:text-sm">{title}</p>
      {required && <p className="text-sm font-bold text-rose-600">*</p>}
    </div>
  );
}
