"use client";

import React, { useState } from "react";
import Line from "@/components/product/register/Line";
import Image from "next/image";
import SemiTitle from "@/components/product/register/SemiTitle";
import ItemBox from "@/components/product/register/ItemBox";
import RegistrationMap from "@/components/product/register/RegistrationMap";
import { category, itemStatus } from "./constants/constants";
import RegistrationLocation from "./RegistrationLocation";
import ImageUpload from "./ImageUpload";
import TextInput from "./TextInput";
import GradationButton from "@/components/common/ui/button/GradationButton";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { CreateItemPayload } from "@/models/data-contracts";

export default function RegistrationForm() {
  const {
    control,
    formState: { errors }, // isDirty -> 변경됨, isValid -> 유효함, errors -> 에러
    handleSubmit,
    resetField,
  } = useForm<CreateItemPayload>();

  const [openRegister, setOpenRegister] = useState(true);

  const createItem: SubmitHandler<CreateItemPayload> = (data: unknown) => {
    const formData = new FormData();
    console.log(data);
  };

  return (
    <form
      className="flex flex-col gap-[72px] sm:gap-10"
      onSubmit={handleSubmit(createItem)}
    >
      {/* 물품명 */}
      <Controller
        control={control}
        name="itemCreateRequest.itemName"
        defaultValue=""
        rules={{ required: "물품명은 필수입니다." }}
        render={({ field: { onChange, value } }) => (
          <div className="flex flex-col gap-2 sm:gap-3">
            <SemiTitle title="물품명" required />
            <Line />
            <TextInput
              placeholder="물품명을 입력해주세요"
              clearField={() => {
                resetField("itemCreateRequest.itemName", { keepTouched: true });
              }}
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
            {errors.itemCreateRequest?.itemName && (
              <p className="text-xs font-semibold text-red-500">
                {errors.itemCreateRequest.itemName.message}
              </p>
            )}
          </div>
        )}
      />
      {/* 카테고리 */}
      <Controller
        control={control}
        name="itemCreateRequest.categoryId"
        defaultValue={undefined}
        rules={{ required: "카테고리는 필수입니다." }}
        render={({ field: { onChange, value } }) => (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <SemiTitle title="카테고리" required subText="(택1)" />
              <Line />
            </div>
            <div className="flex flex-wrap gap-x-2 gap-y-2 sm:gap-x-[18px] sm:gap-y-3">
              {category.map((v) => (
                <ItemBox
                  key={v.id}
                  name={v.name}
                  select={v.id === value}
                  onClick={() => onChange(v.id)}
                />
              ))}
            </div>
            {errors.itemCreateRequest?.categoryId && (
              <p className="text-xs font-semibold text-red-500">
                {errors.itemCreateRequest.categoryId.message}
              </p>
            )}
          </div>
        )}
      />
      {/* 이미지 */}
      <Controller
        control={control}
        name="itemImages"
        defaultValue={[]}
        rules={{ required: "이미지는 필수입니다." }}
        render={({ field: { onChange } }) => (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <SemiTitle
                title="이미지"
                required
                subText="최소 한장의 물품 이미지 필수 업로드(최대 5장), 실물 사진 업로드 권장"
              />
              <Line />
            </div>
            <ImageUpload onChange={onChange} />
            {errors.itemImages && (
              <p className="text-xs font-semibold text-red-500">
                {errors.itemImages.message}
              </p>
            )}
          </div>
        )}
      />
      {/* 물품 상태 */}
      <Controller
        control={control}
        name="itemCreateRequest.itemStatus"
        defaultValue=""
        rules={{ required: "물품상태는 필수입니다." }}
        render={({ field: { onChange, value } }) => (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <SemiTitle title="물품상태" required subText="(택1)" />
              <Line />
            </div>
            <div className="flex flex-col gap-x-2 gap-y-2 sm:gap-x-[18px] sm:gap-y-3">
              {itemStatus.map((status, i) => (
                <ItemBox
                  key={status}
                  name={status}
                  select={status === value}
                  onClick={() => onChange(status)}
                />
              ))}
            </div>
            {errors.itemCreateRequest?.itemStatus && (
              <p className="mt-1 text-xs font-semibold text-red-500">
                {errors.itemCreateRequest.itemStatus.message}
              </p>
            )}
          </div>
        )}
      />
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
              <RegistrationMap
                coordinate={{
                  lat: 37.5666103,
                  lng: 126.9783882,
                }}
                locationId="나눔 장소 A"
              />
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
              <button
                type="button"
                className="text-[10px] font-bold text-grey-300 hover:text-grey-700 sm:text-sm"
              >
                수정하기
              </button>
            </div>
          </div>
          {!openRegister ? (
            <div className="h-[110px] sm:h-[220px]">
              <div className="flex h-[90px] items-center justify-center rounded-[10px] bg-grey-50 sm:h-[180px]">
                <button onClick={() => setOpenRegister(true)} type="button">
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
            <RegistrationLocation
              close={() => setOpenRegister(false)}
              locationId="나눔 장소 B"
            />
          )}
        </div>
      </div>
      <Controller
        control={control}
        name="itemCreateRequest.itemDescription"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <div className="flex flex-col gap-2 sm:gap-3">
            <SemiTitle title="상세설명" subText="(선택입력)" />
            <Line />
            <TextInput
              placeholder="상세설명을 남겨주세요(최소 10자 이상)"
              clearField={() => {
                resetField("itemCreateRequest.itemDescription", {
                  keepTouched: true,
                });
              }}
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
        )}
      />
      <div className="mb-[130px] flex items-center justify-center sm:mt-[60px]">
        <GradationButton buttonText="나눔 등록 완료" type="submit" />
      </div>
    </form>
  );
}
