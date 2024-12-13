import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import createSelectors from "./selectorStore";
import { create } from "zustand";
import { JusoProps } from "@/components/product/register/SearchInput";

type SearchState = {
  isOpen: boolean;
  address: JusoProps | null;
};

type SearchAction = {
  actions: {
    searchOpen: () => void;
    searchClose: () => void;
    setAddress: (address: JusoProps) => void;
    initSearch: () => void;
  };
};

const initialSide = {
  isOpen: false,
  address: null,
};

const searchStore = create<SearchState & SearchAction>()(
  devtools(
    immer((set) => ({
      ...initialSide,
      actions: {
        searchOpen: () =>
          set((state) => {
            state.isOpen = true;
          }),
        searchClose: () =>
          set((state) => {
            state.isOpen = false;
          }),
        setAddress: (address: JusoProps) =>
          set((state) => {
            state.address = address;
          }),
        initSearch: () => set(initialSide),
      },
    })),
  ),
);

const useSearchStore = createSelectors(searchStore);

export default useSearchStore;
