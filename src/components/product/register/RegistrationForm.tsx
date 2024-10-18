"use client";

import React, { useState } from "react";
import Line from "@/components/product/register/Line";
import Image from "next/image";
import SemiTitle from "@/components/product/register/SemiTitle";
import ItemBox from "@/components/product/register/ItemBox";
import RegisterMap from "@/components/product/register/RegisterMap";
import { category, itemStatus } from "./constants/constants";
import RegistrationLocation from "./RegistrationLocation";
import ImageUpload from "./ImageUpload";
import TextInput from "./TextInput";
import GradationButton from "@/components/common/ui/button/GradationButton";

export default function RegistrationForm() {
  const [openRegister, setOpenRegister] = useState(true);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectItemStatus, setSelectItemStatus] = useState("");
  return (
    <div className="flex flex-col gap-[72px] sm:gap-10">
      <div className="flex flex-col gap-2 sm:gap-3">
        <SemiTitle title="물품명" required />
        <Line />
        <TextInput placeholder="물품명을 입력해주세요" clearText={() => {}} />
      </div>
      <div>
        <div className="flex flex-col gap-2">
          <SemiTitle title="카테고리" required subText="(택1)" />
          <Line />
        </div>
        <div className="mt-3 flex flex-wrap gap-x-2 gap-y-2 sm:gap-x-[18px] sm:gap-y-3">
          {category.map((cate, i) => (
            <ItemBox
              key={cate}
              name={cate}
              select={cate === selectCategory}
              setValue={() => setSelectCategory(cate)}
            />
          ))}
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-2">
          <SemiTitle
            title="이미지"
            required
            subText="최소 한장의 물품 이미지 필수 업로드(최대 5장), 실물 사진 업로드 권장"
          />
          <Line />
        </div>
        <ImageUpload />
      </div>
      <div>
        <div className="flex flex-col gap-2">
          <SemiTitle title="물품상태" required subText="(택1)" />
          <Line />
        </div>
        <div className="mt-3 flex flex-col gap-x-2 gap-y-2 sm:gap-x-[18px] sm:gap-y-3">
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
        <div className="flex flex-col gap-2">
          <SemiTitle
            title="나눔 장소 및 일정"
            required
            subText="최대 2개 등록 가능"
          />
          <Line />
        </div>
        <div className="mt-3 flex flex-col gap-[18px] sm:gap-10">
          <div className="flex h-[110px] flex-col gap-2 rounded-[10px] sm:h-[220px] sm:gap-5">
            <div className="h-[90px] sm:h-[180px]">
              <RegisterMap />
            </div>
            <div className="flex justify-between">
              <div className="flex gap-3 text-[10px] font-bold text-grey-500 sm:text-sm">
                <div className="flex gap-1">
                  <div className="h-4 w-4 sm:h-5 sm:w-5">
                    <Image
                      src="/assets/images/location_marker.svg"
                      alt="location"
                      width={20}
                      height={20}
                    />
                  </div>
                  <p>강남구 논현동</p>
                </div>
                <div className="flex gap-1">
                  <div className="h-4 w-4 sm:h-5 sm:w-5">
                    <Image
                      src="/assets/images/calendar.svg"
                      width={20}
                      height={20}
                      alt="calendar"
                    />
                  </div>
                  <p>주중 나눔 가능</p>
                </div>
              </div>
              <p className="text-[10px] font-bold text-grey-300 sm:text-sm">
                수정하기
              </p>
            </div>
          </div>
          {!openRegister ? (
            <div className="h-[110px] sm:h-[220px]">
              <div className="flex h-[90px] items-center justify-center rounded-[10px] bg-grey-50 sm:h-[180px]">
                <button onClick={() => setOpenRegister(true)}>
                  <Image
                    src="/assets/images/button/square_plus.svg"
                    width={32}
                    height={32}
                    alt="add"
                  />
                </button>
              </div>
            </div>
          ) : (
            <RegistrationLocation close={() => setOpenRegister(false)} />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:gap-3">
        <SemiTitle title="상세설명" subText="(선택입력)" />
        <Line />
        <TextInput
          placeholder="상세설명을 남겨주세요(최소 10자 이상)"
          clearText={() => {}}
        />
      </div>
      <div className="mb-[130px] flex items-center justify-center sm:mt-[60px]">
        <GradationButton buttonText="나눔 등록 완료" onClick={() => {}} />
      </div>
    </div>
  );
}
