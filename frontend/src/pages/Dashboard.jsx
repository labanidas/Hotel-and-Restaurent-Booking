import React, { useState, useEffect } from "react";
import { Menu, Search, BellDot, ChevronRight, FolderDot, FileText, Smile, Settings, Power } from "lucide-react";
import {Outlet} from "react-router";
import { useAuthStore } from '../store/useAuthStore';

const AdminDashboard = () => {
  const { logout } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.style.overflow = isSidebarOpen ? "" : "hidden";
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isSidebarOpen) {
        setIsSidebarOpen(false);
        document.body.style.overflow = "";
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSidebarOpen]);

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      {isSidebarOpen && <Overlay onClick={toggleMobileMenu} />}
      <Header toggleMobileMenu={toggleMobileMenu} />
      <div className="pt-16 max-w-7xl mx-auto flex">
        <Sidebar isOpen={isSidebarOpen} logout={logout} />
        <MainContent />
      </div>
    </div>
  );
};

const Header = ({ toggleMobileMenu }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 200);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed w-full bg-white text-indigo-800 z-50 shadow-lg animate-slide-down">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between h-16">
        <button className="mobile-menu-button p-2 lg:hidden" onClick={toggleMobileMenu}>
          <Menu className="text-2xl" />
        </button>
        <div className="text-xl font-bold text-blue-900">
          Admin<span className="text-indigo-800">Panel</span>
        </div>
        <div className="flex items-center space-x-2">
          {/* <Search className="p-2 text-2xl cursor-pointer hover:text-indigo-800 transition-transform duration-300 hover:scale-110 hidden md:block" />
          <BellDot
            className={`p-2 text-2xl cursor-pointer hover:text-indigo-800 transition-transform duration-300 hidden md:block ${
              isAnimating ? "scale-110" : ""
            }`}
          /> */}
          <img
            className="w-10 h-10 rounded-full transition-transform duration-300 hover:scale-110 object-cover"
            src="profile.png"
            alt="Profile"
          />
        </div>
      </div>
    </header>
  );
};

const Sidebar = ({ isOpen, logout }) => {
  const links = [
    { icon: FolderDot, text: 'Home' },
    { icon: FileText, text: 'Another menu item' },
    { icon: Smile, text: 'Profile' },
    { icon: Settings, text: 'Settings' },
    { icon: Power, text: 'Log out', onClick: logout }
  ];

  return (
    <aside
      className={`sidebar fixed lg:static w-[240px] bg-indigo-50 h-[calc(100vh-4rem)] lg:h-auto transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 transition-transform duration-300 z-45 overflow-y-auto p-4`}
    >
      {links.map((link, index) => (
        <SidebarLink key={index} Icon={link.icon} text={link.text} onClick={link.onClick} />
      ))}
    </aside>
  );
};

const SidebarLink = ({ Icon, text, onClick }) => (
  <a href="#" className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1" onClick={onClick}>
    <Icon className="mr-2" />
    {text}
    <ChevronRight className="ml-auto" />
  </a>
);

const MainContent = () => {
  return (
    <main className="flex-1 p-4">
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        {/* <ContentCard title="Welcome" value="Dash" bg="bg-indigo-100" textColor="text-blue-900" />
        <ContentCard title="Inbox" value="23" bg="bg-blue-100" textColor="text-blue-900" /> */}
        <Outlet />
      </div>
    </main>
  );
};

const ContentCard = ({ title, value, bg, textColor }) => (
  <div className={`flex-1 ${bg} border border-indigo-200 rounded-xl p-6 animate-fade-in`}>
    <h2 className={`text-4xl md:text-5xl ${textColor}`}>
      {title} <br />
      <strong>{value}</strong>
    </h2>
  </div>
);

const Overlay = ({ onClick }) => (
  <div className="overlay fixed inset-0 bg-indigo-900/50 z-40 opacity-100 transition-opacity duration-300" onClick={onClick}></div>
);

export default AdminDashboard;

