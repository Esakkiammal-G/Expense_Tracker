import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { message, Tooltip } from 'antd';

const Header = () => {
  const [loginUser, setLoginUser] = useState(null); // Storing logged-in user data
  const [showInfo, setShowInfo] = useState(false); // State for showing user info
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve user from localStorage
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    message.success('Logged out successfully');
  };

  const toggleUserInfo = () => {
    setShowInfo((prev) => !prev); // Toggle user info visibility
  };

  return (
<header className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg text-white z-50">
  <div className="container mx-auto flex justify-between items-center py-4 px-6">
    {/* Branding Section */}
    <div className="flex items-center">
      <img
        src="https://th.bing.com/th/id/OIP.HGMJ_R8nzvc9mGZrSSXL7gHaHa?w=1920&h=1920&rs=1&pid=ImgDetMain" // Replace this with your Expense Tracker image URL
        alt="Expense Tracker"
        className="h-12 w-auto mr-4 rounded-full border-2 border-white shadow-md hover:scale-105 transform transition-all duration-300"
      />
      <h1 className="text-3xl font-bold tracking-wider hover:text-gray-200 transition-all duration-300">
        Expense Tracker
      </h1>
    </div>

    {/* Navigation Section */}
    <nav>
      <ul className="flex space-x-6 items-center">
        {loginUser && (
          <li>
            <Tooltip title="Click to view user details">
              <div
                className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-10 h-10 cursor-pointer hover:scale-110 transform transition-all duration-300 shadow-lg text-xl font-bold"
                onClick={toggleUserInfo}
              >
                {loginUser.name.charAt(0).toUpperCase()}
              </div>
            </Tooltip>
            {showInfo && (
              <div className="absolute right-4 bg-white text-black rounded-lg shadow-lg p-4 mt-2">
                <p className="font-semibold">Name: {loginUser.name}</p>
                <p className="text-sm text-gray-500">Email: {loginUser.email}</p>
              </div>
            )}
          </li>
        )}
        <li>
          <button
            className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-md focus:outline-none transition-all duration-300"
            onClick={handleLogout}
          >
            <LogoutOutlined className="mr-2" />
            Logout
          </button>
        </li>
      </ul>
    </nav>
  </div>
</header>

  );
};

export default Header;
