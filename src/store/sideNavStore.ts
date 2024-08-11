import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import createSelectors from './selectorStore';

type SideNavState = {
  sideNav: boolean;
};

type SideNavAction = {
  actions: {
    toggleSideNav: () => void;
    resetSideNav: () => void;
  };
};

const initialSide = {
  sideNav: false, // 기본 값은 닫혀있는 상태
};

const sideNavStore = create<SideNavState & SideNavAction>()(
  devtools(
    immer(set => ({
      ...initialSide,
      actions: {
        toggleSideNav: () =>
          set((state: { sideNav: boolean }) => {
            state.sideNav = !state.sideNav;
          }),
        resetSideNav: () => set(initialSide),
      },
    })),
  ),
);

const useSideNavStore = createSelectors(sideNavStore);

export default useSideNavStore;
