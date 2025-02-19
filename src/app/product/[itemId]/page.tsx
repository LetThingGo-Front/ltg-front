import ProductItem from "@/features/product/components/ProductItem";
import CompletionNotification from "@/features/product/components/CompletionNotification";
import React from "react";

export default function page() {
  return (
    <div>
      <ProductItem />
      <CompletionNotification />
    </div>
  );
}
