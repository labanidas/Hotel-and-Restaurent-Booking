import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutGrid, PlusCircle, CalendarCheck, Menu, X } from "lucide-react"; // Lucide icons

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation(); 

  return (
    <div
      className={`h-screen bg-white shadow-md border-r transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"
        } flex flex-col`}
    >
      {/* Sidebar Toggle Button */}
      <button
        className="p-3 m-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Items */}
      <nav className="flex-1">
        <ul className="mt-6 space-y-2">
          <SidebarItem
            to="/dashboard"
            icon={<LayoutGrid size={22} />}
            label="Listings"
            isSidebarOpen={isSidebarOpen}
            active={location.pathname === "/dashboard"}
          />
          <SidebarItem
            to="/dashboard/new-listing"
            icon={<PlusCircle size={22} />}
            label="Create Listing"
            isSidebarOpen={isSidebarOpen}
            active={location.pathname === "/dashboard/new-listing"}
          />
          <SidebarItem
            to="/dashboard/manage-bookings"
            icon={<CalendarCheck size={22} />}
            label="Manage Bookings"
            isSidebarOpen={isSidebarOpen}
            active={location.pathname === "/dashboard/manage-bookings"}
          />
        </ul>
      </nav>
    </div>
  );
};

/* Sidebar Item Component */
const SidebarItem = ({ to, icon, label, isSidebarOpen, active }) => {
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center p-3 rounded-lg transition ${active ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-100"
          }`}
      >
        {icon}
        {isSidebarOpen && <span className="ml-3">{label}</span>}
      </Link>
    </li>
  );
};

export default Sidebar;
