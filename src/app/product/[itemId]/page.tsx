import Item from "@/features/product/components/Item";
import CompleteAlert from "@/features/product/components/alert/CompleteAlert";
import React from "react";

export default function page() {
  return (
    <div>
      <Item />
      <CompleteAlert />
    </div>
  );
}
