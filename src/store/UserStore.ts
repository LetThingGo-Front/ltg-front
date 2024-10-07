import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import createSelectors from './selectorStore';
import User from '@/types/User';

type UserState = {
  userInfo: User;
  accessToken: string;
};

type UserAction = {
  setUserInfo: (user: User) => void;
  setAccessToken: (accessToken: string) => void;
  initUserInfo: () => void;
};

const initialUserInfo = {
  userInfo: { id: 0, nickname: '', email: '' },
  accessToken: '',
};

const USER_KEY = 'user-store';

const userStore = create<UserState & UserAction>()(
  devtools(
    persist(
      immer(set => ({
        ...initialUserInfo,
        setUserInfo: (user: User) => {
          set((state: UserState) => {
            state.userInfo = user;
          });
        },
        setAccessToken: (accessToken: string) => {
          set((state: UserState) => {
            state.accessToken = accessToken;
          });
        },
        initUserInfo: () => {
          set(initialUserInfo);
        },
      })),
      {
        name: USER_KEY,
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);

const useUserStore = createSelectors(userStore);

export default useUserStore;
