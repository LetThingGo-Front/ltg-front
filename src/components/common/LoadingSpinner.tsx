import React from "react";
import { BeatLoader } from "react-spinners";

export default function LoadingSpinner() {
  return (
    <div className="z-10 flex h-full w-full items-center justify-center backdrop-blur-sm sm:hidden">
      <BeatLoader />
    </div>
  );
}
