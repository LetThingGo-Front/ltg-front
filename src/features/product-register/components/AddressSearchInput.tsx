import clsx from "clsx";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import Image from "next/image";
import debounce from "debounce";
import axios from "axios";
import utils from "@/common/utils/cmmnUtil";

import { isMobile, isTablet } from "react-device-detect";
import jusoData from "@/mocks/data/juso/jusoData.json";
import useSearchStore from "@/store/searchStore";
import { useNavermaps } from "react-naver-maps";
import { FavoriteJuso } from "./RegistrationLocation";
import AddressButton from "./button/AddressButton";

type Props = {
  addr: string;
  isOpenMoblieView: boolean;
  setIsOpenMoblieView: () => void;
  closeIsOpenMobileView: () => void;
  setAddress: (address: string) => void;
  setSimpleAddr: (simpleAddr: string) => void;
  isFocused: boolean;
  setIsFocused: (isFocused: boolean) => void;
  setCoordinate: (coordinate: { lat: number; lng: number }) => void;
  setIsNewFavorite: (isNewFavorite: boolean) => void;
  favoriteJuso?: FavoriteJuso;
  inputDisabled: boolean;
  setInputDisabled: (inputDisabled: boolean) => void;
  setFavorite: (favorite: string) => void;
};

export type JusoProps = {
  admCd?: string;
  bdKdcd?: string;
  bdMgtSn?: string;
  bdNm?: string;
  buldMnnm?: string;
  buldSlno?: string;
  detBdNmList?: string;
  emdNm?: string;
  emdNo?: string;
  engAddr?: string;
  jibunAddr?: string;
  liNm?: string;
  lnbrMnnm?: string;
  lnbrSlno?: string;
  mtYn?: string;
  rn?: string;
  rnMgtSn?: string;
  roadAddr?: string;
  roadAddrPart1: string;
  roadAddrPart2?: string;
  sggNm?: string;
  siNm?: string;
  udrtYn?: string;
  zipNo?: string;
};

export default function AddressSearchInput({
  addr,
  isOpenMoblieView,
  setIsOpenMoblieView,
  closeIsOpenMobileView,
  setAddress,
  setSimpleAddr,
  isFocused,
  setIsFocused,
  setCoordinate,
  setIsNewFavorite,
  favoriteJuso,
  inputDisabled,
  setInputDisabled,
  setFavorite,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchListRef = useRef<HTMLDivElement>(null);
  const [searchList, setSearchList] = useState<JusoProps[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const openSearhAddress = useSearchStore.use.actions().searchOpen;
  const searchAddressGlobal = useSearchStore.use.address();
  const initSearchAddressStore = useSearchStore.use.actions().initSearch;
  const navermaps = useNavermaps();

  const searchAddressToCoordinate = useCallback(
    (address: string) => {
      if (!address) {
        alert("주소를 입력하세요.");
        return;
      }
      navermaps.Service.geocode(
        {
          query: address,
        },
        (status: number, response: any) => {
          if (status === 200) {
            if (response.v2.meta.totalCount === 0) {
              console.log("searchAddressToCoordinate 검색 결과가 없습니다.");
            } else {
              const { x, y } = response.v2.addresses[0];
              if (setCoordinate) {
                setCoordinate({ lat: y, lng: x });
              }
            }
          }
        },
      );
    },
    [navermaps.Service, setCoordinate],
  );

  const setAddressInput = debounce((value: string) => {
    if (value !== inputRef.current?.value) return;
    if (value.length > 1) getSearchToLocation(value);
  }, 300);
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value ? setAddressInput(e.target.value) : setSearchList([]);
  };

  const getSearchToLocation = useCallback(async (search: string) => {
    if (!inputRef.current?.value) return;

    // 검색어로 위치 검색
    try {
      const response = await axios.get("/api/address", {
        params: { keyword: search },
      });
      setSearchList(jusoData);
      if (response.status === 200 && response.data.results.juso) {
        setSearchList(response.data.results.juso);
      }
    } catch (error) {
      console.error(`[ERROR] getSearchToLocation: ${error}`);
    }
  }, []);

  const clearField = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setSearchList([]);
    setSelectedIndex(-1);
    setInputDisabled(false);
    setIsNewFavorite(false);
    setFavorite("");
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => Math.min(searchList.length - 1, prev + 1));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => Math.max(0, prev - 1));
    } else if (e.key === "Enter" && selectedIndex !== -1) {
      // 엔터 키로 선택
      handleSetAddress(searchList[selectedIndex]);
      setIsNewFavorite(true);
    }
  };

  const handleSetAddress = useCallback(
    (address: JusoProps) => {
      const addressNm = address.bdNm
        ? `${address.roadAddrPart1.replace(/지하\s*(\d+)/g, "$1")} (${utils.unescapeHtml(address.bdNm)})`
        : `${address.roadAddrPart1.replace(/지하\s*(\d+)/g, "$1")}`;
      searchAddressToCoordinate(addressNm);
      console.log(addressNm);
      setAddress(addressNm);
      setSimpleAddr(`${address.sggNm} ${address.emdNm}`);
      if (inputRef.current) inputRef.current.value = addressNm;
      setSelectedIndex(-1);
      setIsFocused(false);
      setSearchList([]);
      setInputDisabled(true);
    },
    [searchAddressToCoordinate, setAddress, setSimpleAddr, setIsFocused],
  );

  const handleSetFavoriteAddress = useCallback(
    (address: JusoProps) => {
      const addressNm = address.bdNm
        ? `${address.roadAddrPart1.replace(/지하\s*(\d+)/g, "$1")} (${utils.unescapeHtml(address.bdNm)})`
        : `${address.roadAddrPart1.replace(/지하\s*(\d+)/g, "$1")}`;
      setAddress(addressNm);
      setSimpleAddr(`${address.sggNm} ${address.emdNm}`);
      if (inputRef.current) inputRef.current.value = addressNm;
      setSelectedIndex(-1);
      setIsFocused(false);
      setSearchList([]);
    },
    [setAddress, setSimpleAddr, setIsFocused],
  );

  const searchInputFocus = () => {
    if (!isFocused) setIsFocused(true);
    if (!isOpenMoblieView) setIsOpenMoblieView();
    if (isMobile && !isTablet && inputRef.current === document.activeElement) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
  };

  useEffect(() => {
    if (favoriteJuso) {
      const handleJuso = {
        roadAddrPart1: favoriteJuso.address,
        sggNm: favoriteJuso.district,
        emdNm: favoriteJuso.dong,
      };
      handleSetFavoriteAddress(handleJuso);
    }
  }, [favoriteJuso, handleSetFavoriteAddress]);

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

  useEffect(() => {
    if (searchAddressGlobal) {
      handleSetAddress(searchAddressGlobal);
    }
    return () => {
      initSearchAddressStore();
    };
  }, [handleSetAddress, initSearchAddressStore, searchAddressGlobal]);

  return (
    <>
      <div className="relative z-20 flex h-11 w-full rounded-[0.625rem] bg-grey-50 backdrop-blur-[50px] sm:hidden max-sm:h-8">
        <div
          className={clsx(
            "absolute left-3 top-[0.875rem] h-4 w-4 max-sm:top-[0.625rem] max-sm:h-3 max-sm:w-3",
          )}
        >
          <Image
            className=""
            src="/assets/images/magnify.svg"
            width={20}
            height={20}
            alt="search"
          />
        </div>
        <button
          className={clsx(
            "relative ml-10 flex w-[calc(100%-4.75rem)] items-center justify-start bg-transparent text-center text-xs font-semibold text-grey-700 outline-none placeholder:text-xs",
          )}
          onClick={openSearhAddress}
          type="button"
        >
          <p className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
            {addr || <span className="text-grey-500">주소를 검색하세요</span>}
          </p>
        </button>
      </div>
      <div
        ref={containerRef}
        className={clsx(
          "group/search flex h-11 backdrop-blur-[50px] duration-300 pointerhover:hover:bg-[#474747] max-sm:hidden",
          !isOpenMoblieView && isFocused ? "bg-[#474747]" : "bg-grey-50",
          (!isFocused || searchList.length === 0) && "rounded-b-[0.625rem]",
          isOpenMoblieView
            ? "fixed left-0 top-[calc(env(safe-area-inset-top)+4rem)] z-40 w-full"
            : "relative z-20 rounded-t-[0.625rem] max-sm:h-8",
        )}
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
            "placeholder:text-center disabled:opacity-100 placeholder:disabled:opacity-100 pointerhover:group-hover/search:text-white pointerhover:placeholder:group-hover/search:text-white",
            !isOpenMoblieView &&
              isFocused &&
              "text-white placeholder:text-white",
            isOpenMoblieView
              ? "h-[2.75rem]"
              : "max-sm:text-xs max-sm:placeholder:text-xs",
          )}
          placeholder="주소를 검색하세요"
          onChange={handleSearchInput}
          ref={inputRef}
          onFocus={searchInputFocus}
          onBlur={(e) => {
            if (
              !isMobile &&
              containerRef.current &&
              !containerRef.current.contains(e.relatedTarget as Node)
            ) {
              setIsFocused(false);
            }
          }}
          disabled={inputDisabled}
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
            "absolute left-0 max-h-[13.75rem] w-full sm:top-[2.75rem]",
            isOpenMoblieView
              ? "top-[2.75rem] bg-transparent"
              : "top-8 rounded-b-[0.625rem] bg-[#474747] text-white",
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
                setIsNewFavorite={setIsNewFavorite}
              />
            ))}
        </div>
      </div>
    </>
  );
}
