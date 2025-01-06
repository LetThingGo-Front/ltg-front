import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import createSelectors from "./selectorStore";
import { create } from "zustand";
import { ItemSearchRequest, ItemSearchResponse } from "@/models/data-contracts";

type ExploreState = {
  searchInput: string;
  isSearch: boolean; // 검색을 통한 목록 조회 여부
  itemList: ItemSearchResponse[];
};

type ExploreAction = {
  actions: {
    setSearchInput: (input: string) => void;
    clearSearchInput: () => void;
    setIsSearch: (isSearch: boolean) => void;
    setItemList: (itemList: ItemSearchResponse[]) => void;
    initItemList: () => void;
  };
};

const initialExplore = {
  searchInput: "",
  isSearch: false,
  itemList: [],
};

const exploreStore = create<ExploreState & ExploreAction>()(
  devtools(
    immer((set) => ({
      ...initialExplore,
      actions: {
        setSearchInput: (input) =>
          set((state) => {
            state.searchInput = input;
          }),
        clearSearchInput: () =>
          set((state) => {
            state.searchInput = "";
          }),
        setIsSearch: (isSearch) =>
          set((state) => {
            state.isSearch = isSearch;
          }),
        setItemList: (itemList) =>
          set((state) => {
            state.itemList = itemList;
          }),
        initItemList: () => set((state) => (state.itemList = [])),
      },
    })),
  ),
);

const useExploreStore = createSelectors(exploreStore);

export default useExploreStore;
