import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar component */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Sidebar component */}

      <div className="flex-1 flex flex-col relative overflow-x-hidden pl-0 lg:pl-72 pt-14 lg:pt-16">
        {/* Header component */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Header component */}
        {/* Main content */}
        <main className="flex-1 p-4 xs:p-8 w-full overflow-y-auto">
          <Outlet />
        </main>
        {/* Main content */}
      </div>
    </div>
  );
}
