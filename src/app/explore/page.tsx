import ExploreLayerControl from "@/components/explore/ExploreLayerControl";
import ExploreMap from "@/components/explore/ExploreMap";
import SheetModal from "@/components/explore/SheetModal";
import React from "react";

export default function page() {
  return (
    <div className="absolute flex h-[calc(100%-4rem)] w-full justify-center sm:h-[calc(100%-6rem)] sm:overflow-y-auto sm:pt-[4.25rem]">
      <div className="relative h-full w-full rounded-[1.875rem] sm:mx-10 sm:h-[calc(100%-5.125rem)] sm:min-h-[41.875rem]">
        <ExploreLayerControl />
        <ExploreMap />
      </div>
      <SheetModal />
    </div>
  );
}
