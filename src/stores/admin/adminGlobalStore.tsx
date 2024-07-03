import { create } from "zustand";

type PreviewDialogType = "monitor" | "kiosk" | undefined;

type AdminGlobalStore = {
  previewDialogType: PreviewDialogType;
  showPreviewDialog: boolean;
  togglePreviewDialog: (prevDialogType: PreviewDialogType) => void;
};

export const useAdminGlobalStore = create<AdminGlobalStore>()((set) => ({
  previewDialogType: undefined,
  showPreviewDialog: false,
  togglePreviewDialog: (prevDialogType) =>
    set((state) => ({
      showPreviewDialog: !state.showPreviewDialog,
      previewDialogType: prevDialogType,
    })),
}));
