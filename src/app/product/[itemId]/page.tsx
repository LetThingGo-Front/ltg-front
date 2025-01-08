import Item from "@/components/product/Item";
import CompleteAlert from "@/components/product/alert/CompleteAlert";
import React from "react";

export default function page() {
  return (
    <div>
      <Item />
      <CompleteAlert />
    </div>
  );
}
