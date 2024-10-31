import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import createSelectors from './selectorStore';
import User from '@/types/User';

type UserState = User;

type UserAction = {
  setUserInfo: (user: User) => void;
  initUserInfo: () => void;
};

const initialUserInfo = { id: 0, nickname: '', email: '' };

const USER_KEY = 'user-store';

const userStore = create<UserState & UserAction>()(
  devtools(
    persist(
      immer(set => ({
        ...initialUserInfo,
        setUserInfo: (user: User) => {
          set(user);
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
