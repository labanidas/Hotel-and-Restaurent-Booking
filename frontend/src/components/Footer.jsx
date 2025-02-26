import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 Hotel & Restaurant Booking. All Rights Reserved.</p>
        <div className="mt-4 space-x-6">
          <a href="#privacy" className="hover:text-indigo-400">Privacy Policy</a>
          <a href="#terms" className="hover:text-indigo-400">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
