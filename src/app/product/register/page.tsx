import RegistrationForm from "@/components/product/register/RegistrationForm";
import React from "react";

export default function page() {
  return (
    <div className="flex h-full justify-center overflow-y-auto px-[1.875rem] scrollbar-hide">
      <div className="w-full sm:max-w-[37.5rem]">
        <div className="mb-8 h-[4.6875rem] w-full p-5 max-sm:hidden">
          <p className="text-center text-2xl font-bold text-grey-800">
            나눔 등록
          </p>
        </div>
        <RegistrationForm />
      </div>
    </div>
  );
}
