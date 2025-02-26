import React from 'react';
import { HomeIcon, SearchIcon, KeyRound } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Hotel & Restaurant Booking</div>
        <nav className="space-x-6">
          <a href="#home" className="hover:text-indigo-400 flex items-center">
            <HomeIcon className="w-5 h-5 mr-2" />
            Home
          </a>
          <a href="#search" className="hover:text-indigo-400 flex items-center">
            <SearchIcon className="w-5 h-5 mr-2" />
            Search
          </a>
          <a href="#login" className="hover:text-indigo-400 flex items-center">
            <KeyRound className="w-5 h-5 mr-2" />
            Login
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;