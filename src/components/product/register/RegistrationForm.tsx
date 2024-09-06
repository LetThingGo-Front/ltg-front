'use client';

import React, { useState } from 'react';
import Line from '@/components/product/register/Line';
import Image from 'next/image';
import SemiTitle from '@/components/product/register/SemiTitle';
import ItemBox from '@/components/product/register/ItemBox';
import RegisterMap from '@/components/product/register/RegisterMap';
import RegisterButton from '@/components/product/register/RegisterButton';
import { category, itemStatus } from './constants/constants';
import RegistrationLocation from './RegistrationLocation';

export default function RegistrationForm() {
  const [openRegister, setOpenRegister] = useState(true);
  const [selectCategory, setSelectCategory] = useState('');
  const [selectItemStatus, setSelectItemStatus] = useState('');
  return (
    <div className="flex flex-col gap-[72px] sm:gap-10">
      <div className="flex flex-col gap-2 sm:gap-3">
        <div className="">
          <SemiTitle title="물품명" required />
        </div>
        <Line />
        <div className="flex p-3 rounded-[10px] h-8 sm:h-[47px] bg-grey-50 backdrop-blur-[10px] justify-center items-center gap-2">
          <input
            className="bg-transparent grow shrink basis-0 text-grey-700 font-semibold placeholder:text-grey-400 max-sm:text-[10px]"
            placeholder="물품명을 입력하세요."
          />

          <div className="bg-transparent">
            <Image src="/assets/images/button/close_grey.svg" width={12} height={12} alt="close" />
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-1 mb-2">
          <SemiTitle title="카테고리" required />
          <p className="text-grey-400 text-[8px] sm:text-[13px] font-medium">(택1)</p>
        </div>
        <Line />
        <div className="flex flex-wrap gap-x-2 gap-y-2 sm:gap-x-[18px] sm:gap-y-3 mt-3">
          {category.map((cate, i) => (
            <ItemBox key={cate} name={cate} select={cate === selectCategory} setValue={() => setSelectCategory(cate)} />
          ))}
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-1 mb-2">
          <SemiTitle title="이미지" required />
          <p className="text-grey-400 text-[8px] sm:text-[13px] font-medium">
            최소 한장의 물품 이미지 필수 업로드(최대 5장), 실물 사진 업로드 권장
          </p>
        </div>
        <Line />
        <div className="flex flex-wrap mt-3 gap-2">
          <div className="relative flex justify-center items-center w-[92px] h-[92px] bg-grey-50 rounded-[10px] cursor-pointer">
            <Image src="/assets/images/button/square_plus.svg" width={20} height={20} alt="add" />
            <p className="absolute text-grey-400 text-[8px] font-semibold bottom-4">jpg,png,heic</p>
          </div>
          <div className="rounded-[10px] border border-grey-200 w-[92px] h-[92px]"></div>
          <div className="rounded-[10px] border border-dashed border-grey-200 w-[92px] h-[92px]"></div>
          <div className="rounded-[10px] border border-dashed border-grey-200 w-[92px] h-[92px]"></div>
          <div className="rounded-[10px] border border-dashed border-grey-200 w-[92px] h-[92px]"></div>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-1 mb-2">
          <SemiTitle title="물품상태" required />
          <p className="text-grey-400 text-[8px] sm:text-[13px] font-medium">(택1)</p>
        </div>
        <Line />
        <div className="flex flex-wrap gap-x-2 gap-y-2 sm:gap-x-[18px] sm:gap-y-3 mt-3">
          {itemStatus.map((status, i) => (
            <ItemBox
              key={status}
              name={status}
              select={status === selectItemStatus}
              setValue={() => setSelectItemStatus(status)}
            />
          ))}
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-1 mb-2">
          <SemiTitle title="나눔 장소 및 일정" required />
          <p className="text-grey-400 text-[8px] sm:text-[13px] font-medium">최대 2개 등록 가능</p>
        </div>
        <Line />
        <div className="flex flex-col gap-[18px] sm:gap-10 mt-3">
          <div className="flex flex-col h-[110px] sm:h-[220px] gap-2 sm:gap-5 rounded-[10px]">
            <div className="h-[90px] sm:h-[180px]">
              <RegisterMap />
            </div>
            <div className="flex justify-between">
              <div className="flex gap-3 text-[10px] sm:text-sm font-bold text-grey-500">
                <div className="flex gap-1">
                  <div className="w-4 h-4 sm:w-5 sm:h-5">
                    <Image src="/assets/images/location_marked.svg" alt="location" width={20} height={20} />
                  </div>
                  <p>강남구 논현동</p>
                </div>
                <div className="flex gap-1">
                  <div className="w-4 h-4 sm:w-5 sm:h-5">
                    <Image src="/assets/images/calendar.svg" width={20} height={20} alt="calendar" />
                  </div>
                  <p>주중 나눔 가능</p>
                </div>
              </div>
              <p className="text-[10px] sm:text-sm text-grey-300 font-bold">수정하기</p>
            </div>
          </div>
          {!openRegister ? (
            <div className="h-[110px] sm:h-[220px]">
              <div className="flex justify-center items-center h-[90px] sm:h-[180px] bg-grey-50 rounded-[10px]">
                <button onClick={() => setOpenRegister(true)}>
                  <Image src="/assets/images/button/square_plus.svg" width={32} height={32} alt="add" />
                </button>
              </div>
            </div>
          ) : (
            <RegistrationLocation close={() => setOpenRegister(false)} />
          )}
        </div>
      </div>
      <div className="">
        <div className="flex flex-col gap-1 mb-2">
          <SemiTitle title="상세설명" required />
          <p className="text-grey-400 text-[8px] sm:text-[13px] font-medium">(선택입력)</p>
        </div>
        <Line />
        <div className="flex p-3 rounded-[10px] h-8 sm:h-[47px] bg-grey-50 backdrop-blur-[10px] justify-center items-center mt-3">
          <input
            className="bg-transparent grow shrink basis-0 text-grey-700 max-sm:text-[10px] placeholder:text-grey-400 placeholder:font-semibold"
            placeholder="상세한 설명을 남겨주세요(최소 10자 이상)"
          />
          <div className="bg-transparent">
            <Image src="/assets/images/button/close_grey.svg" width={12} height={12} alt="close" />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mb-[130px] sm:mt-[60px]">
        <RegisterButton />
      </div>
    </div>
  );
}
