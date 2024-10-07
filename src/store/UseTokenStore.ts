import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import createSelectors from './selectorStore';

type UseTokenState = {
  isRefreshing: boolean;
  refreshSubscribers: Array<any>;
};

type UseTokenAction = {
  setIsRefreshing: (isRefreshing: boolean) => void;
  addRefreshSubscriber: (callback: any) => void;
  onRefreshed: (newAccessToken: any) => void;
};

const initialUserInfo: UseTokenState = {
  isRefreshing: false,
  refreshSubscribers: [],
};

const useTokenStore = create<UseTokenState & UseTokenAction>()(
  devtools(
    immer(set => ({
      ...initialUserInfo,
      setIsRefreshing: (isRefreshing: boolean) => {
        set((state: UseTokenState) => {
          state.isRefreshing = isRefreshing;
        });
      },
      addRefreshSubscriber: (callback: any) => {
        set((state: UseTokenState) => {
          state.refreshSubscribers.push(callback);
        });
      },
      onRefreshed: (newAccessToken: any) => {
        set((state: UseTokenState) => {
          state.refreshSubscribers.forEach((callback: any) => callback(newAccessToken));
          state.refreshSubscribers = [];
        });
      },
    })),
  ),
);

const useUseTokenStore = createSelectors(useTokenStore);

export default useUseTokenStore;
