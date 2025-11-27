import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const pathTitleMap: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/users": "Users",
    "/analytics": "Analytics",
    "/reports": "Reports",
    "/content-control": "Content Control",
    "/settings": "Settings",
    "/help": "Help",
  };

  const currentTitle = pathTitleMap[location.pathname] ?? "Dashboard";

  return (
    <div className="flex min-h-screen bg-[#F7F5F1] text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Mobile sidebar (overlay) */}
      <Sidebar
        variant="overlay"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar variant="static" />
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          pageTitle={currentTitle}
          onOpenSidebar={() => setSidebarOpen(true)}
        />
        <main className="flex-1 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
