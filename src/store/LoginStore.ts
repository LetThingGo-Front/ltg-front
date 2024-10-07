import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import createSelectors from './selectorStore';

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
    immer(set => ({
      ...initialPopup,
      actions: {
        openLoginPopup: () =>
          set((state: { isOpen: boolean }) => {
            state.isOpen = true;
          }),
        closeLoginPopup: () =>
          set((state: { isOpen: boolean }) => {
            state.isOpen = false;
          }),
      },
    })),
  ),
);

const useLoginPopupStore = createSelectors(loginPopupStore);

export default useLoginPopupStore;
