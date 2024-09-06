import RegistrationForm from '@/components/product/register/RegistrationForm';
import React from 'react';

export default function page() {
  return (
    <div className="flex justify-center overflow-y-scroll h-[calc(100vh-130px)] scrollbar-hide p-[30px]">
      <div className="w-full sm:w-[600px] max-h-[1700px]">
        <div className="hidden sm:block w-full h-[75px] p-5 mb-8">
          <p className="text-center text-2xl font-bold text-grey-800">나눔 등록</p>
        </div>
        <RegistrationForm />
      </div>
    </div>
  );
}
