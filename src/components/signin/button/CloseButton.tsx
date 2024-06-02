'use client';

import React from 'react';
import { HiOutlineX } from 'react-icons/hi';

type Props = {
  close: () => void;
};

export default function CloseButton({ close }: Props) {
  return (
    <button className="flex justify-center items-center w-4 h-4 bg-gray-200 rounded-full" onClick={close}>
      <HiOutlineX className="text-black w-3 h-3" />
    </button>
  );
}
