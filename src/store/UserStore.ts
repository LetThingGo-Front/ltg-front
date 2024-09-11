import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import createSelectors from './selectorStore';
import User from '@/types/User';

interface LoginUser extends User {
  accessToken: string;
}

type UserState = {
  userInfo: LoginUser;
};

type UserAction = {
  setUserInfo: (user: LoginUser) => void;
  clearUserInfo: () => void;
};

const initialUserInfo = {
  id: 0,
  nickname: '',
  email: '',
  accessToken: '',
};

const USER_KEY = 'user-store';

const userStore = create<UserState & UserAction>()(
  devtools(
    persist(
      immer(set => ({
        userInfo: initialUserInfo,
        setUserInfo: (user: LoginUser) => {
          set({ userInfo: user });
        },
        clearUserInfo: () => {
          set({ userInfo: initialUserInfo });
        },
      })),
      { name: USER_KEY },
    ),
  ),
);

const useUserStore = createSelectors(userStore);

export default useUserStore;
