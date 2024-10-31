import RegistrationForm from "@/components/product/register/RegistrationForm";
import React from "react";

export default function page() {
  return (
    <div className="flex h-[calc(100dvh-4rem)] justify-center overflow-y-scroll px-[1.875rem] scrollbar-hide sm:h-[calc(100dvh-5.625rem)]">
      <div className="w-full sm:w-[37.5rem]">
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
