import { create } from "zustand";
import { CounterType } from "@/utils/types/counterType";

const tempCounterTypes: CounterType[] = [
  {
    id: "1",
    name: "Accounts",
    abbrev: "A",
    status: 0,
  },
  {
    id: "2",
    name: "Deposits or Withdrawals",
    abbrev: "DW",
    status: 0,
  },
  {
    id: "3",
    name: "Customer Service",
    abbrev: "CS",
    status: 0,
  },
  {
    id: "4",
    name: "Registrar",
    abbrev: "R",
    status: 0,
  },
  {
    id: "5",
    name: "Loans and Mortgages",
    abbrev: "LM",
    status: 0,
  },
  {
    id: "6",
    name: "Principal",
    abbrev: "P",
    status: 0,
  },
  {
    id: "7",
    name: "Accounts",
    abbrev: "A",
    status: 0,
  },
  {
    id: "8",
    name: "Accounts",
    abbrev: "A",
    status: 0,
  },
  {
    id: "9",
    name: "Accounts",
    abbrev: "A",
    status: 0,
  },
  {
    id: "10",
    name: "Accounts",
    abbrev: "A",
    status: 0,
  },
];

type counterTypeActionType = "add" | "edit";

type KioskManagementStore = {
  openCounterTypeActionDialog: boolean;
  toggleCounterTypeActionDialog: () => void;
  counterTypeActionType: counterTypeActionType;
  setCounterTypeActionType: (actionType: counterTypeActionType) => void;
  counterTypes: CounterType[];
  setCounterTypes: (newCategories: CounterType[]) => void;
  editName: string | undefined;
  editAbbrev: string | undefined;
  setEditDetails: (name: string, abbrev: string) => void;
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
    counterTypes: tempCounterTypes,
    setCounterTypes: (newCounterTypes) =>
      set({ counterTypes: newCounterTypes }),
    editName: undefined,
    editAbbrev: undefined,
    setEditDetails: (name, abbrev) =>
      set({
        editName: name,
        editAbbrev: abbrev,
      }),
    resetEditDetails: () =>
      set({
        editName: undefined,
        editAbbrev: undefined,
      }),
  })
);
