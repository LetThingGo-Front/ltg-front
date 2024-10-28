import RegistrationForm from "@/components/product/register/RegistrationForm";
import React from "react";

export default function page() {
  return (
    <div className="flex h-[calc(100vh-8.125rem)] justify-center overflow-y-scroll px-[1.875rem] scrollbar-hide">
      <div className="max-h-[106.25rem] w-full sm:w-[37.5rem]">
        <div className="mb-8 hidden h-[4.6875rem] w-full p-5 sm:block">
          <p className="text-center text-2xl font-bold text-grey-800">
            나눔 등록
          </p>
        </div>
        <RegistrationForm />
      </div>
    </div>
  );
}
