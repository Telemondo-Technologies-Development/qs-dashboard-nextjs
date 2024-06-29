import { createFileRoute } from "@tanstack/react-router";
import { useKioskManagementStore } from "@/stores/admin/kioskMgmt";
import { useAdminGlobalStore } from "@/stores/admin/adminGlobalStore";
import RenderBasedOnRole from "../-RenderBasedOnRole";
import CounterTypeActionDialog from "./-CounterTypeActionDialog";
import { useFetchCounterTypes } from "@/api/counterType";
import { countertypes } from "@/utils/variables/admin_variables";

export const Route = createFileRoute("/admin/kiosk-management/")({
  component: () => <KioskManagement />,
});

function KioskManagement() {
  const {
    toggleCounterTypeActionDialog,
    setCounterTypeActionType,
    setEditDetails,
  } = useKioskManagementStore();

  const { togglePreviewDialog } = useAdminGlobalStore();

  const { data: counterTypes, isLoading, error } = useFetchCounterTypes();

  const Admin = (
    <div className="flex flex-col flex-1 p-8 overflow-y-auto transition-all gap-7">
      <CounterTypeActionDialog />
      <div className="flex justify-end gap-3">
        <button
          onClick={() => togglePreviewDialog("kiosk")}
          className="px-6 py-1 font-medium rounded-sm bg-main_secondary text-main_primary"
        >
          Preview Kiosk
        </button>
        <button
          onClick={() => {
            setCounterTypeActionType("add"), toggleCounterTypeActionDialog();
          }}
          className="px-6 py-1 font-medium text-white rounded-sm bg-main_primary"
        >
          Add Category
        </button>
      </div>
      {isLoading ? (
        <div className="grid flex-1 text-xl font-semibold place-items-center">
          Loading...
        </div>
      ) : counterTypes ? (
        <div className="grid flex-1 overflow-y-auto gap-y-5 gap-x-5 grid-cols-auto-fill-200">
          {counterTypes.content.map((counterType) => {
            return (
              <div
                className="flex flex-col items-center justify-center gap-3 px-4 py-3 h-72 bg-main_extra rounded-xl size-full"
                key={counterType.id}
              >
                <div className="grid flex-1 w-full text-4xl text-white bg-gray-500 rounded-lg place-items-center">
                  {counterType.abbrev}
                </div>
                <p className="font-medium text-center text-ellipsis">
                  {counterType.name}
                </p>
                <button
                  onClick={() => {
                    setCounterTypeActionType("edit");
                    setEditDetails(counterType.name, counterType.abbrev);
                    toggleCounterTypeActionDialog();
                  }}
                  className="flex items-center justify-center px-12 py-2 text-sm text-white rounded-sm bg-main_primary"
                >
                  Edit
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid flex-1 text-lg font-semibold place-items-center">
          Error: {error?.message}
        </div>
      )}
    </div>
  );

  return <RenderBasedOnRole adminComponent={Admin} />;
}
