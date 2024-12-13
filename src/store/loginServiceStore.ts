import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import createSelectors from "./selectorStore";
import utils from "@/utils/cmmnUtil";

type LoginPopupState = {
  isOpen: boolean;
};

type LoginPopupAction = {
  actions: {
    openLoginPopup: () => void;
    closeLoginPopup: () => void;
  };
};

const initialPopup = {
  isOpen: false,
};

const loginPopupStore = create<LoginPopupState & LoginPopupAction>()(
  devtools(
    immer((set) => ({
      ...initialPopup,
      actions: {
        openLoginPopup: () =>
          set((state) => {
            state.isOpen = true;
          }),
        closeLoginPopup: () =>
          set((state) => {
            state.isOpen = false;
            utils.removeStorage("redirect");
          }),
      },
    })),
  ),
);

const useLoginPopupStore = createSelectors(loginPopupStore);

export default useLoginPopupStore;
