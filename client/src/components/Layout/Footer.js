import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-blue-700 to-purple-700 text-white py-6">
      <div className="container mx-auto text-center space-y-4">
        {/* Branding */}
        <h2 className="text-lg font-semibold">
          Expense Tracker
        </h2>

        {/* Tagline */}
        <p className="text-sm text-gray-300">
          Effortlessly manage your finances with clarity and ease.
        </p>

        {/* Links */}
        <div className="flex justify-center space-x-6 text-sm">
          <a href="#" className="hover:text-yellow-400 transition duration-300">Privacy</a>
          <a href="#" className="hover:text-yellow-400 transition duration-300">Terms</a>
          <a href="#" className="hover:text-yellow-400 transition duration-300">Contact</a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400">
          © 2025 Expense Tracker. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
