"use client";

import React from "react";
import { BeatLoader } from "react-spinners";

export default function LoadingMapSpinner() {
  return (
    <div className="z-10 flex h-full w-full items-center justify-center backdrop-blur-sm">
      <BeatLoader />
    </div>
  );
}
