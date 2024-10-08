import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import createSelectors from './selectorStore';

type LoginPopupState = {
  isOpen: boolean;
  isLogin: boolean;
};

type LoginPopupAction = {
  actions: {
    openLoginPopup: () => void;
    closeLoginPopup: () => void;
    setLoginStatus: (status: boolean) => void;
  };
};

const initialPopup = {
  isOpen: false,
  isLogin: false,
};

const loginPopupStore = create<LoginPopupState & LoginPopupAction>()(
  devtools(
    immer(set => ({
      ...initialPopup,
      actions: {
        openLoginPopup: () =>
          set(state => {
            state.isOpen = true;
          }),
        closeLoginPopup: () =>
          set(state => {
            state.isOpen = false;
          }),
        setLoginStatus: (status: boolean) =>
          set(state => {
            state.isLogin = status;
          }),
      },
    })),
  ),
);

const useLoginPopupStore = createSelectors(loginPopupStore);

export default useLoginPopupStore;
