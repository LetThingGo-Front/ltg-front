import React from 'react';

type Props = {
  name: string;
  select?: boolean;
  setValue: () => void;
};

export default function ItemBox({ name, select, setValue }: Props) {
  return (
    <button
      className={`${select ? 'text-white bg-black' : 'text-grey-300 bg-grey-50'} rounded-full py-1 sm:py-[6px] px-[10px] sm:px-4 text-[10px] sm:text-xs font-semibold text-center`}
      onClick={setValue}
    >
      {name}
    </button>
  );
}
