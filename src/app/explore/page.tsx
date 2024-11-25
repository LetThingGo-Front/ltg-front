import ExploreMap from "@/components/explore/ExploreMap";
import SheetModal from "@/components/explore/SheetModal";
import React from "react";

export default function page() {
  return (
    <div className="absolute flex h-full w-full justify-center sm:overflow-y-auto sm:pb-[5.125rem] sm:pt-[4.25rem]">
      <div className="relative h-[calc(100%-6rem)] w-full sm:mx-10 sm:min-h-[41.875rem]">
        <div className="absolute left-0 top-0 h-full w-full rounded-[1.875rem]">
          <ExploreMap />
        </div>
        <SheetModal />
      </div>
    </div>
  );
}
