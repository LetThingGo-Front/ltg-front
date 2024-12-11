import clsx from "clsx";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import debounce from "debounce";
import axios from "axios";
import utils from "@/utils/cmmnUtil";
import AddressButton from "./button/AddressButton";

type Props = {
  addr: string;
  isOpenMoblieView: boolean;
  setIsOpenMoblieView: () => void;
  closeIsOpenMobileView: () => void;
  setAddress: (address: string) => void;
  setSimpleAddr: (simpleAddr: string) => void;
};

export type JusoProps = {
  admCd: string;
  bdKdcd: string;
  bdMgtSn: string;
  bdNm: string;
  buldMnnm: string;
  buldSlno: string;
  detBdNmList: string;
  emdNm: string;
  emdNo: string;
  engAddr: string;
  jibunAddr: string;
  liNm: string;
  lnbrMnnm: string;
  lnbrSlno: string;
  mtYn: string;
  rn: string;
  rnMgtSn: string;
  roadAddr: string;
  roadAddrPart1: string;
  roadAddrPart2: string;
  sggNm: string;
  siNm: string;
  udrtYn: string;
  zipNo: string;
};

export default function SearchInput({
  addr,
  isOpenMoblieView,
  setIsOpenMoblieView,
  closeIsOpenMobileView,
  setAddress,
  setSimpleAddr,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchListRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [searchList, setSearchList] = useState<JusoProps[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const innerWidth = typeof window !== "undefined" ? window.innerWidth : 1920;

  const setSearchInput = debounce((value: string) => {
    if (value.length > 1) getSearchToLocation(value);
  }, 300);
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value ? setSearchInput(e.target.value) : setSearchList([]);
  };

  const getSearchToLocation = async (search: string) => {
    if (!inputRef.current?.value) return;

    // 검색어로 위치 검색
    try {
      const response = await axios.get("/api/address", {
        params: { keyword: search },
      });
      if (response.status === 200 && response.data.results.juso) {
        setSearchList(response.data.results.juso);
      }
    } catch (error) {
      console.error(`[ERROR] getSearchToLocation: ${error}`);
    }
  };

  const clearField = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (isOpenMoblieView) e.stopPropagation();
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
    setSearchList([]);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => Math.min(searchList.length - 1, prev + 1));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => Math.max(0, prev - 1));
    } else if (e.key === "Enter" && selectedIndex !== -1) {
      // 엔터 키로 선택
      handleSetAddress(searchList[selectedIndex]);
    }
  };

  const handleSetAddress = (address: JusoProps) => {
    const addressNm = address.bdNm
      ? `${address.roadAddrPart1.replace(/지하\s*(\d+)/g, "$1")} (${utils.unescapeHtml(address.bdNm)})`
      : `${address.roadAddrPart1.replace(/지하\s*(\d+)/g, "$1")}`;
    setAddress(addressNm);
    setSimpleAddr(`${address.sggNm} ${address.emdNm}`);
    setSelectedIndex(-1);
    inputRef.current?.blur();
    setIsFocused(false);
    closeIsOpenMobileView();
  };

  const setSearchInputHeight = () => {
    if (window.visualViewport) {
      //키보드가 올라올 때
      if (window.innerHeight > window.visualViewport.height) {
        document.documentElement.style.height = `calc(${window.visualViewport.height}px - env(safe-area-inset-top))`;
      } else {
        //키보드가 내려갈 때
        document.documentElement.style.height = "100%";
      }
    }
  };
  useEffect(() => {
    setSearchInputHeight();
    window.visualViewport?.addEventListener("resize", setSearchInputHeight);
    return () => {
      window.visualViewport?.removeEventListener(
        "resize",
        setSearchInputHeight,
      );
    };
  }, []);

  useEffect(() => {
    if (selectedIndex !== -1 && searchListRef.current) {
      const selectedItem = searchListRef.current.children[
        selectedIndex
      ] as HTMLElement;
      if (selectedItem) {
        selectedItem.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (inputRef.current && addr) {
      inputRef.current.value = addr;
    }
  }, [addr]);

  return (
    <div
      ref={containerRef}
      className={clsx(
        "group/search relative z-20 flex h-11 backdrop-blur-[50px] pointerhover:hover:bg-[#474747]",
        !isOpenMoblieView && isFocused ? "bg-[#474747]" : "bg-grey-50",
        (!isFocused || searchList.length === 0) && "rounded-b-[0.625rem]",
        isOpenMoblieView
          ? "relative h-full"
          : "rounded-t-[0.625rem] max-sm:h-8",
      )}
      tabIndex={0}
      onFocus={() => {
        setIsFocused(true);
        !isOpenMoblieView && setIsOpenMoblieView();
        inputRef.current?.focus();
      }}
      onBlur={(e) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.relatedTarget as Node)
        ) {
          setIsFocused(false);
        }
      }}
      onKeyDown={handleKeyDown}
      title={addr}
    >
      <div
        className={clsx(
          "absolute left-3 top-[0.875rem] h-4 w-4",
          !isOpenMoblieView && "max-sm:top-[0.625rem] max-sm:h-3 max-sm:w-3",
        )}
      >
        <Image
          className={clsx(
            "pointerhover:group-hover/search:hidden",
            !isOpenMoblieView && isFocused && "hidden",
          )}
          src="/assets/images/magnify.svg"
          width={20}
          height={20}
          alt="search"
        />
        <Image
          className={clsx(
            "pointerhover:group-hover/search:block",
            !isOpenMoblieView && isFocused ? "block" : "hidden",
          )}
          src="/assets/images/magnify_white.svg"
          width={20}
          height={20}
          alt="search"
        />
      </div>
      <input
        className={clsx(
          "ml-10 w-full truncate bg-transparent pr-9 text-[0.875rem] font-semibold text-grey-700 outline-none placeholder:text-[0.875rem]",
          "placeholder:text-center pointerhover:group-hover/search:text-white pointerhover:placeholder:group-hover/search:text-white",
          !isOpenMoblieView && isFocused && "text-white placeholder:text-white",
          isOpenMoblieView
            ? "h-[2.75rem]"
            : "max-sm:text-xs max-sm:placeholder:text-xs",
        )}
        placeholder="주소를 검색하세요"
        onChange={handleSearchInput}
        ref={inputRef}
        disabled={innerWidth < 640 && !isOpenMoblieView}
      />
      {inputRef.current?.value && (
        <button
          className={clsx(
            "absolute right-3 top-4 h-3 w-3",
            !isOpenMoblieView &&
              "max-sm:right-[0.625rem] max-sm:top-[0.625rem]",
          )}
          onClick={(e) => clearField(e)}
          type="button"
        >
          <Image
            src="/assets/images/button/close_grey.svg"
            width={12}
            height={12}
            alt="close"
          />
        </button>
      )}
      <div
        className={clsx(
          "absolute left-0 top-[2.75rem] max-h-[13.75rem] w-full",
          isOpenMoblieView
            ? "bg-transparent"
            : "rounded-b-[0.625rem] bg-[#474747] text-white",
        )}
        ref={searchListRef}
      >
        {isFocused &&
          searchList.map((addr, idx) => (
            <AddressButton
              key={idx}
              address={addr}
              isSelected={selectedIndex === idx}
              isOpenMoblieView={isOpenMoblieView}
              handleSetAddress={handleSetAddress}
            />
          ))}
      </div>
    </div>
  );
}
