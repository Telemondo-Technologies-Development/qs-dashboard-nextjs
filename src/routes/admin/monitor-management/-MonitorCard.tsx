import { useAdminGlobalStore } from "@/stores/admin/adminGlobalStore";
import MiniMonitorPreview from "./-MiniMonitorPreview";

type MonitorCardProps = {
  index: number;
};

export default function MonitorCard({ index }: MonitorCardProps) {
  
  const {togglePreviewDialog} = useAdminGlobalStore()

  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-4 rounded-lg size-full bg-main_extra">
      <p className="font-semibold">Monitor {index + 1}</p>
      <MiniMonitorPreview />
      <div className="flex justify-center w-full gap-4">
        <button 
        onClick={() => togglePreviewDialog("monitor")}
        className="w-[38%] py-2 text-main_primary bg-main_secondary rounded-md">
          Preview
        </button>
        <button className="w-[38%] py-2 text-white bg-main_primary rounded-md">
          Edit
        </button>
      </div>
    </div>
  );
}