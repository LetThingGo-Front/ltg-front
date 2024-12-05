import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
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

const LOGIN_KEY = "login-store";

const loginPopupStore = create<LoginPopupState & LoginPopupAction>()(
  devtools(
    persist(
      immer((set) => ({
        ...initialPopup,
        actions: {
          openLoginPopup: (redirectUrl) =>
            set((state) => {
              state.isOpen = true;
              state.redirectUrl = redirectUrl || "";
            }),
          closeLoginPopup: () => set(initialPopup),
        },
      })),
      {
        name: LOGIN_KEY,
        partialize: (state) => ({ redirectUrl: state.redirectUrl }),
      },
    ),
  ),
);

const useLoginPopupStore = createSelectors(loginPopupStore);

export default useLoginPopupStore;
