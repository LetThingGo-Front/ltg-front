"use client";

import React from "react";

type Props = {
  isOpen: boolean;
  address?: string;
};

export default function AddressModal({ isOpen, address }: Props) {
  if (!isOpen) return null;
  return (
    <div
      className="absolute bottom-0 left-0 z-40 h-[12.75rem] w-full rounded-t-[1.875rem] bg-white"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="h-full w-full rounded-t-[1.875rem] bg-black/70">
        <p className="text-center font-semibold text-white">{address}</p>
      </div>
    </div>
  );
}
