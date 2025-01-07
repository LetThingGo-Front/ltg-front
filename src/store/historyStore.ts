import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import createSelectors from "./selectorStore";

type historyState = {
  previousUrl: string;
  itemId: number;
};

type historyAction = {
  actions: {
    saveHistory: (history: historyState) => void;
    initHistory: () => void;
  };
};

const initialHistory = {
  previousUrl: "",
  itemId: 0,
};

const historyStore = create<historyState & historyAction>()(
  devtools(
    immer((set) => ({
      ...initialHistory,
      actions: {
        saveHistory: (history) =>
          set((state) => {
            state.previousUrl = history.previousUrl;
            state.itemId = history.itemId;
          }),
        initHistory: () => set(initialHistory),
      },
    })),
  ),
);

const useHistoryStore = createSelectors(historyStore);

export default useHistoryStore;
