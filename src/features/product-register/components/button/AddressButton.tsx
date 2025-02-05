import React from "react";
import { JusoProps } from "../SearchInput";
import utils from "@/common/utils/cmmnUtil";
import clsx from "clsx";

type Props = {
  address: JusoProps;
  isSelected: boolean;
  isOpenMoblieView: boolean;
  handleSetAddress: (address: JusoProps) => void;
  setIsNewFavorite?: (isNewFavorite: boolean) => void;
};

export default function AddressButton({
  address,
  isSelected,
  isOpenMoblieView,
  handleSetAddress,
  setIsNewFavorite,
}: Props) {
  // naver geocode api에서 지하라는 단어가 포함된 주소는 검색이 안되서 강제 소거처리(ex. 지하222)
  // 지하 단어 제외해도 주소는 같음. naver api 확인 필요
  const addressNm = address.bdNm
    ? `${address.roadAddrPart1.replace(/지하\s*(\d+)/g, "$1")} (${utils.unescapeHtml(address.bdNm)})`
    : `${address.roadAddrPart1.replace(/지하\s*(\d+)/g, "$1")}`;

  return (
    <button
      className={clsx(
        "h-[2.75rem] w-full truncate pl-10 text-left text-[0.875rem] pointerhover:hover:bg-grey-700",
        isSelected &&
          (isOpenMoblieView ? "bg-grey-200 active:bg-grey-200" : "bg-grey-700"),
      )}
      type="button"
      title={addressNm}
      onClick={(e) => {
        e.stopPropagation();
        handleSetAddress(address);
        if (setIsNewFavorite) setIsNewFavorite(true);
      }}
    >
      {addressNm}
    </button>
  );
}
