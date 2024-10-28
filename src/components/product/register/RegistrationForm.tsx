"use client";

import React, { useEffect, useState } from "react";
import Line from "@/components/product/register/Line";
import SemiTitle from "@/components/product/register/SemiTitle";
import ItemBox from "@/components/product/register/ItemBox";
import { category, itemStatus } from "./constants/constants";
import RegistrationLocation from "./RegistrationLocation";
import ImageUpload from "./ImageUpload";
import TextInput from "./TextInput";
import GradationButton from "@/components/common/ui/button/GradationButton";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CreateItemPayload } from "@/models/data-contracts";
import utils from "@/utils/cmmnUtil";

export default function RegistrationForm() {
  const {
    control,
    formState: { errors }, // isDirty: 변경됨, isValid: 유효함, errors: 에러
    handleSubmit,
    resetField,
  } = useForm<CreateItemPayload>();

  const sharingLocation = ["나눔 장소 A", "나눔 장소 B"];
  const [isFirstLocationSaved, setIsFirstLocationSaved] = useState(false);
  const [isSecondLocationSaved, setIsSecondLocationSaved] = useState(false);
  const [openFirstLocation, setOpenFirstLocation] = useState(false);
  const [openSecondLocation, setOpenSecondLocation] = useState(false);

  const createItem: SubmitHandler<CreateItemPayload> = (data: unknown) => {
    const formData = new FormData();
    console.log(data);
  };

  return (
    <form
      className="flex flex-col gap-[4.5rem] sm:gap-10"
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
              <p className="font-semibold text-red-500 max-sm:text-xs">
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
            <div className="flex flex-wrap gap-x-2 gap-y-2 sm:gap-x-[1.125rem] sm:gap-y-3">
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
              <p className="font-semibold text-red-500 max-sm:text-xs">
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
              <p className="font-semibold text-red-500 max-sm:text-xs">
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
            <div className="flex flex-col gap-x-2 gap-y-2 sm:gap-x-[1.125rem] sm:gap-y-3">
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
              <p className="mt-1 font-semibold text-red-500 max-sm:text-xs">
                {errors.itemCreateRequest.itemStatus.message}
              </p>
            )}
          </div>
        )}
      />
      {/* 나눔 장소 및 일정 */}
      <Controller
        control={control}
        name="itemCreateRequest.itemLocations"
        defaultValue={[]}
        rules={{ required: "나눔 장소 및 일정은 필수입니다." }}
        render={({ field: { onChange, value } }) => {
          const containerCount =
            value.length + 1 > sharingLocation.length
              ? sharingLocation.length
              : value.length + 1;
          const container = Array(containerCount)
            .fill(null)
            .map((_, i) => value[i] || {});
          console.log(value);
          return (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <SemiTitle
                  title="나눔 장소 및 일정"
                  required
                  subText={`최대 ${sharingLocation.length}개 등록 가능`}
                />
                <Line />
              </div>
              <div className="mt-3 flex flex-col gap-[1.125rem] sm:gap-10">
                {container?.map((v, i) => (
                  <RegistrationLocation
                    idx={i}
                    key={sharingLocation[i]}
                    close={() => setOpenFirstLocation(false)}
                    locationId={sharingLocation[i]}
                    isSaved={isFirstLocationSaved}
                    setSaved={setIsFirstLocationSaved}
                    onSave={onChange}
                    locationInfo={v}
                    locationList={value}
                  />
                ))}
              </div>
              {errors.itemCreateRequest?.itemLocations && (
                <p className="font-semibold text-red-500 max-sm:text-xs">
                  {errors.itemCreateRequest.itemLocations.message}
                </p>
              )}
            </div>
          );
        }}
      />
      {/* 상세설명 */}
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
      <div className="mb-[8.125rem] flex flex-col items-center justify-center gap-3 sm:mt-[3.75rem]">
        {!utils.isEmpty(errors) && (
          <p className="font-semibold text-red-500 max-sm:text-xs">
            필수 항목이 비어 있습니다. 확인 후 완료해주세요.
          </p>
        )}
        <GradationButton buttonText="나눔 등록 완료" type="submit" />
      </div>
    </form>
  );
}
