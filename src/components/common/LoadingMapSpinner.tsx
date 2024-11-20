"use client";

import clsx from "clsx";
import React from "react";
import { BeatLoader } from "react-spinners";

type Props = {
  isBlur?: boolean;
};

export default function LoadingMapSpinner({ isBlur = true }: Props) {
  return (
    <div
      className={clsx(
        "z-10 flex h-full w-full items-center justify-center",
        isBlur && "backdrop-blur-sm",
      )}
    >
      <BeatLoader />
    </div>
  );
}
