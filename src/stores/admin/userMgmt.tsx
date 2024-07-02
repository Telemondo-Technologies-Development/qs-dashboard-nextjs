import { create } from "zustand";
import { UserData } from "@/utils/types/user";

type userActionType = "add" | "edit";
export type userType = "Admin" | "Employee";

type UserManagementStore = {
  openUserActionDialog: boolean;
  toggleUserActionDialog: () => void;
  userActionType: userActionType;
  setUserActionType: (actionType: userActionType) => void;
  editUser: UserData | undefined;
  setEditDetails: (editUser: UserData) => void;
};

export const useUserManagementStore = create<UserManagementStore>()((set) => ({
  openUserActionDialog: false,
  toggleUserActionDialog: () =>
    set((state) => ({
      openUserActionDialog: !state.openUserActionDialog,
    })),
  userActionType: "add",
  setUserActionType: (actionType) => set({ userActionType: actionType }),
  editUser: undefined,
  setEditDetails: (editUser) =>
    set({
      editUser: editUser,
    }),
}));
