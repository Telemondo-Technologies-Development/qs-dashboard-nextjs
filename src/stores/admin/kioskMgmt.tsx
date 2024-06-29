import { create } from "zustand";

type counterTypeActionType = "add" | "edit";

type KioskManagementStore = {
  openCounterTypeActionDialog: boolean;
  toggleCounterTypeActionDialog: () => void;
  counterTypeActionType: counterTypeActionType;
  setCounterTypeActionType: (actionType: counterTypeActionType) => void;
  editName: string;
  editAbbrev: string;
  editId: string;
  setEditDetails: (name: string, abbrev: string, id: string) => void;
  resetEditDetails: () => void;
};

export const useKioskManagementStore = create<KioskManagementStore>()(
  (set) => ({
    openCounterTypeActionDialog: false,
    toggleCounterTypeActionDialog: () =>
      set((state) => ({
        openCounterTypeActionDialog: !state.openCounterTypeActionDialog,
      })),
    counterTypeActionType: "add",
    setCounterTypeActionType: (actionType) =>
      set({
        counterTypeActionType: actionType,
      }),
    editName: "",
    editAbbrev: "",
    editId: "",
    setEditDetails: (name, abbrev, id) =>
      set({
        editName: name,
        editAbbrev: abbrev,
        editId: id
      }),
    resetEditDetails: () =>
      set({
        editName: "",
        editAbbrev: "",
      }),
  })
);
