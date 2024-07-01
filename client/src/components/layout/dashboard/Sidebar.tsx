import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/hooks';
import { FileText, LayoutDashboard, Package, Settings, UserCog2, Users2, X } from 'lucide-react';
import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const globalSidebar = [
  {
    name: 'Dashboard',
    icon: <LayoutDashboard />,
    path: '/dashboard',
  },
  {
    name: 'Transaksi',
    icon: <FileText />,
    path: '/dashboard/transaksi',
  },
];

const adminSidebar = [
  {
    name: 'Karyawan',
    icon: <Users2 />,
    path: '/dashboard/karyawan',
  },
  {
    name: 'Manajemen Akun',
    icon: <UserCog2 />,
    path: '/dashboard/akun',
  },
  {
    name: 'Paket',
    icon: <Package />,
    path: '/dashboard/paket',
  },
];

const settingsSidebar = {
  name: 'Setting',
  icon: <Settings />,
  path: '/dashboard/settings',
};

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const sideBarRef = useRef(null);
  const { user } = useAuth();

  const sidebarItems = user?.role === 'admin' ? [...globalSidebar, ...adminSidebar, settingsSidebar] : globalSidebar;

  return (
    <aside
      ref={sideBarRef}
      id="sidebar"
      aria-labelledby="sidebar-toggle"
      className={`border-r fixed top-0 left-0 z-50 h-screen w-72 duration-200 ease-linear shadow-xl transform bg-black ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
    >
      <div className="h-full flex flex-col p-2 mb-8">
        <Button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          variant="ghost"
          className="lg:hidden px-2 w-fit self-end mb-4"
        >
          <X />
        </Button>

        <div className="lg:mt-10 flex flex-col gap-y-3 p-2">
          {sidebarItems.map((item) => (
            <SidebarNavItem key={item.name} path={item.path} icon={item.icon} onClick={() => setSidebarOpen(false)}>
              {item.name}
            </SidebarNavItem>
          ))}
        </div>
      </div>
    </aside>
  );
}

interface SidebarNavItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  icon: React.ReactNode;
  path: string;
}

function SidebarNavItem({ children, icon, path, ...props }: SidebarNavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === path;
  return (
    <Link
      to={path}
      {...props}
      className={`flex justify-start  w-full p-4 rounded-md text-left tracking-wide hover:bg-muted-foreground text-white transition-colors duration-300 ${isActive && 'bg-muted-foreground'}`}
    >
      {icon}
      <p className="ml-2 font-medium">{children}</p>
    </Link>
  );
}
