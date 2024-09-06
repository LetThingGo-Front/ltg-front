'use client';

import { motion } from 'framer-motion';
import React from 'react';

type Props = {
  on: boolean;
  toggle: () => void;
  onText?: string;
  offText?: string;
  isShort?: boolean;
};

export default function ToggleButton({ on, toggle, onText = 'On', offText = 'Off', isShort = true }: Props) {
  return (
    <div
      className={`flex justify-start items-center w-[54px] sm:w-[62px] h-5 sm:h-6 rounded-full p-[2px] cursor-pointer shadow-inner gap-1 ${
        on ? 'justify-end bg-[#E1F452]' : 'bg-neutral-300'
      }`}
      onClick={toggle}
    >
      {on && <p className={`${isShort && 'w-[28px] pl-2'} font-semibold text-[8px] sm:text-[10px]`}>{onText}</p>}
      <motion.div
        className="flex justify-center items-center w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full"
        layout
      ></motion.div>
      {!on && <p className={`${isShort && 'w-[28px] pl-1'} font-semibold text-[8px] sm:text-[10px]`}>{offText}</p>}
    </div>
  );
}
