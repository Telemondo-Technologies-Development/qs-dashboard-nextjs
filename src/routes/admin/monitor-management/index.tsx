import { createFileRoute, Link } from '@tanstack/react-router'
import RenderBasedOnRole from '../-RenderBasedOnRole';
import MonitorCard from './-MonitorCard';

export const Route = createFileRoute('/admin/monitor-management/')({
  component: () => <MonitorManagement/>
})

function MonitorManagement() {
  const Admin = (
    <div className="flex flex-col flex-1 gap-6 p-8 pr-16 overflow-y-auto">
      <div className="flex justify-end ">
        <Link
          to="/admin/monitor-management/add-monitor"
          className="flex items-center justify-between flex-grow-0 gap-3 px-5 py-1 rounded-md bg-main_primary"
        >
          <img src="/plus_icon.svg" className="size-3" />
          <p className="font-medium text-white">Add Monitor</p>
        </Link>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-x-5 gap-y-5">
        {Array.from({ length: 6 }).map((_, index) => {
          return <MonitorCard index={index} key={index} />;
        })}
      </div>
    </div>
  );

  return <RenderBasedOnRole adminComponent={Admin} />;
}