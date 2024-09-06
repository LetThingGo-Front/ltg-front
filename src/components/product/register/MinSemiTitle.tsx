import React from 'react';

type Props = {
  title: string;
  required?: boolean;
};

export default function MinSemiTitle({ title, required }: Props) {
  return (
    <div className="flex justify-start items-start">
      <p className="max-sm:text-xs font-bold text-grey-800">{title}</p>
      {required && <p className="text-rose-600 text-xs font-bold">*</p>}
    </div>
  );
}
