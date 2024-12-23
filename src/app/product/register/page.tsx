import RegistrationForm from "@/components/product/register/RegistrationForm";
import React from "react";

export default function page() {
  return (
    <div className="flex h-full justify-center overflow-y-auto px-[1.875rem] scrollbar-hide">
      <div className="w-full sm:max-w-[37.5rem]">
        <div className="absolute left-0 top-[5.625rem] z-30 flex h-[7.4375rem] w-full flex-col justify-end bg-white p-5 max-sm:hidden">
          <p className="text-center text-2xl font-bold text-grey-800">
            나눔 등록
          </p>
        </div>
        <div className="sm:mt-[10.1875rem]">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}
