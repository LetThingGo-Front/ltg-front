import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import createSelectors from "./selectorStore";

type LoginPopupState = {
  isOpen: boolean;
  redirectUrl: string | undefined;
};

type LoginPopupAction = {
  actions: {
    openLoginPopup: (redirectUrl?: string) => void;
    closeLoginPopup: () => void;
  };
};

const initialPopup = {
  isOpen: false,
  redirectUrl: "",
};

const loginPopupStore = create<LoginPopupState & LoginPopupAction>()(
  devtools(
    immer((set) => ({
      ...initialPopup,
      actions: {
        openLoginPopup: (redirectUrl) =>
          set((state) => {
            state.isOpen = true;
            state.redirectUrl = redirectUrl;
          }),
        closeLoginPopup: () => set(initialPopup),
      },
    })),
  ),
);

const useLoginPopupStore = createSelectors(loginPopupStore);

export default useLoginPopupStore;
