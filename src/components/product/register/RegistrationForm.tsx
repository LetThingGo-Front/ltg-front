"use client";

import React, { useEffect, useState } from "react";
import Line from "@/components/product/register/Line";
import SemiTitle from "@/components/product/register/SemiTitle";
import ItemBox from "@/components/product/register/ItemBox";
import RegistrationLocation from "./RegistrationLocation";
import ImageUpload from "./ImageUpload";
import TextInput from "./TextInput";
import GradationButton from "@/components/common/ui/button/GradationButton";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CreateItemPayload } from "@/models/data-contracts";
import utils from "@/utils/cmmnUtil";
import { useQuery } from "@tanstack/react-query";
import { fetchCategoryList, fetchItemStatusList } from "@/data/commonData";
import { Codes } from "@/types/common";
import axios, { axiosAuth } from "@/lib/axios";
import { LONG_TIME, MIDDLE_TIME } from "@/constants/time";
import { CATEGORY_CODE, ITEM_STATUS_CODE } from "@/constants/code";
import EmptyLocationBox from "./EmptyLocationBox";
import statusData from "@/mocks/data/code/statusData.json";
import categoryData from "@/mocks/data/code/categoryData.json";

const sharingLocation = [
  { locationId: "나눔 장소 A", color: "bg-green-400" },
  { locationId: "나눔 장소 B", color: "bg-blue-300" },
];

export default function RegistrationForm() {
  const {
    control,
    formState: { errors }, // isDirty: 변경됨, isValid: 유효함, errors: 에러
    handleSubmit,
    resetField,
    watch,
  } = useForm<CreateItemPayload>();
  const registerItem: SubmitHandler<CreateItemPayload> = async (
    data: unknown,
  ) => {
    console.log(data);
    // try {
    //   const response = await axiosAuth.post("/v1/items", data);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(`register item error: ${error}`);
    // }
  };
  const [isItemStatusType, setIsItemStatusType] = useState("N");
  const [isOpenLocationForm, setIsOpenLocationForm] = useState(false);
  const watchCategory = watch("itemCreateRequest.categoryCode");

  // const category = useQuery({
  //   queryKey: ["category", CATEGORY_CODE],
  //   queryFn: ({ queryKey }) => fetchCategoryList(queryKey[1]),
  //   staleTime: MIDDLE_TIME,
  //   gcTime: LONG_TIME,
  // });

  // const itemStatus = useQuery({
  //   queryKey: ["itemStatus", ITEM_STATUS_CODE, isItemStatusType],
  //   queryFn: ({ queryKey }) => fetchItemStatusList(queryKey[1], queryKey[2]),
  //   staleTime: MIDDLE_TIME,
  //   gcTime: LONG_TIME,
  // });

  const category = { data: categoryData[CATEGORY_CODE] };
  const itemStatus = { data: statusData[ITEM_STATUS_CODE] };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (watchCategory) {
      watchCategory === "4"
        ? setIsItemStatusType("Y")
        : setIsItemStatusType("N");
    }
  }, [watchCategory]);

  const openKeyboardToScrollTop = () => {
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", () => {
        if (
          window.visualViewport &&
          window.innerHeight > window.visualViewport.height
        )
          window.scrollTo(0, 0);
      });
    }
  };
  useEffect(() => {
    window.visualViewport?.addEventListener("resize", openKeyboardToScrollTop);
    return window.visualViewport?.removeEventListener(
      "resize",
      openKeyboardToScrollTop,
    );
  }, []);

  return (
    <form
      className="flex flex-col gap-[4.5rem] sm:gap-10"
      onSubmit={handleSubmit(registerItem)}
      onKeyDown={handleKeyDown}
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
        name="itemCreateRequest.categoryCode"
        defaultValue=""
        rules={{ required: "카테고리는 필수입니다." }}
        render={({ field: { onChange, value } }) => (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <SemiTitle title="카테고리" required subText="(택1)" />
              <Line />
            </div>
            <div className="flex flex-wrap gap-x-2 gap-y-2 sm:gap-x-[1.125rem] sm:gap-y-3">
              {category.data?.map((c: Codes) => (
                <ItemBox
                  key={c.codeSeq}
                  name={c.codeKorName}
                  select={c.code === value}
                  onClick={() => onChange(c.code)}
                />
              ))}
            </div>
            {errors.itemCreateRequest?.categoryCode && (
              <p className="font-semibold text-red-500 max-sm:text-xs">
                {errors.itemCreateRequest.categoryCode.message}
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
              {itemStatus.data?.map((s: Codes) => (
                <ItemBox
                  key={s.codeSeq}
                  name={s.codeKorName}
                  select={s.code === value}
                  onClick={() => onChange(s.code)}
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
              <div className="mt-3 flex flex-col gap-[1.125rem] sm:gap-[2.625rem]">
                {container?.map((v, i) => (
                  <div key={sharingLocation[i].locationId}>
                    {isOpenLocationForm || v?.address ? (
                      <RegistrationLocation
                        idx={i}
                        locationCase={sharingLocation[i]}
                        onSave={onChange}
                        locationInfo={v}
                        locationList={value}
                        isOpenLocationForm={isOpenLocationForm}
                        setIsOpenLocationForm={setIsOpenLocationForm}
                      />
                    ) : (
                      <EmptyLocationBox
                        setIsOpenLocationForm={() =>
                          setIsOpenLocationForm(true)
                        }
                      />
                    )}
                  </div>
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
