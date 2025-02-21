import ExploreLayerControl from "@/features/explore/components/ExploreLayerControl";
import ExploreMap from "@/features/explore/components/ExploreMap";
import ExploreSheet from "@/features/explore/components/ExploreSheet";
import React from "react";

export default function page() {
  return (
    <div className="absolute flex h-[calc(100%-4rem)] w-full justify-center sm:h-[calc(100%-6rem)] sm:overflow-y-auto sm:pt-[4.25rem]">
      <ExploreMap />
      <ExploreSheet />
    </div>
  );
}
