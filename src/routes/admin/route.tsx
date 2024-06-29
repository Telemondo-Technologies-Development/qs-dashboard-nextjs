import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useMonitorManagementStore } from '@/stores/admin/monitorMgmt';
import Navbar from './-Navbar';
import PreviewDialog from './-PreviewDialog';
import AdminHeader from './-AdminHeader';
import Footer from '../kiosk/components/kiosk_dashboard/-Footer';
import RenderBasedOnRole from './-RenderBasedOnRole';
import AddCounterSheet from './monitor-management/add-monitor/-AddCounterSheet';

export const Route = createFileRoute('/admin')({
  component: () => <AdminLayout/>
})

function AdminLayout() {
  const { showAddCounterSheet: showAddCategoryDialog } =
    useMonitorManagementStore();
  
  console.log('PASSED THROUGH ADMIN ROUTE');

  const Admin = (
    <div className="flex h-screen font-poppins text-main_primary">
      {showAddCategoryDialog && (
        <div className="absolute top-0 left-0 z-20 w-screen h-screen bg-black/30"></div>
      )}
      <Navbar role="admin" />
      <div className="relative flex flex-col flex-1">
        <PreviewDialog/>
        <AddCounterSheet/>
        <AdminHeader />
        <Outlet />
        <Footer />
      </div>
    </div>
  );

  const Staff = (
    <div className="flex h-screen font-poppins text-main_primary">
      <Navbar role="staff" />
      <div className="relative flex flex-col flex-1">
        <AdminHeader />
        <Outlet />
        <Footer />
      </div>
    </div>
  );

  return <RenderBasedOnRole adminComponent={Admin} staffComponent={Staff} />;
}
