import { Counter } from "@/utils/types/counter";
import { create } from "zustand";

type CounterMngmtStore = {
  editing: boolean;
  saveChanges: boolean;
  toggleEditing: () => void;
  toggleSaveChanges: () => void;
  resetEditing: () => void;
  duplicateArray: Counter[];
  setDuplicateArray: (array: Counter[]) => void;
};

export const useCounterMngmtStore = create<CounterMngmtStore>((set) => ({
  editing: false,
  resetEditing: () => set({ editing: false }),
  saveChanges: false,

  toggleEditing: () =>
    set((state) => ({
      editing: !state.editing,
    })),
  toggleSaveChanges: () =>
    set((state) => ({
      saveChanges: !state.saveChanges,
    })),
  duplicateArray: [],
  setDuplicateArray: (array) => set({ duplicateArray: array }),
}));
