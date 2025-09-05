import React, { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';
import { useTheme } from '@/hooks/useTheme';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onSidebarToggle: () => void;
}

export default function Header({ onSidebarToggle }: HeaderProps) {
  const { isAuthenticated, currentUser, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onSidebarToggle}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none mr-2"
              aria-label="Toggle sidebar"
            >
              <i class="fa-solid fa-bars text-xl"></i>
            </button>
            <Link to="/" className="flex items-center">
              <img 
                src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Wendao%20Game%20Logo%2C%20Chinese%20style%2C%20blue%20and%20gold%20colors&sign=c8971f22c7505e7fe4ae5d3d5875efde" 
                alt="问道游戏" 
                className="h-8 w-8 rounded-md mr-2"
              />
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">问道充值中心</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <i class="fa-solid fa-sun"></i>
              ) : (
                <i class="fa-solid fa-moon"></i>
              )}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center">
                <div className="relative group">
                  <button className="flex items-center text-sm focus:outline-none">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={currentUser?.avatar || "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Game%20User%20Avatar%2C%20cartoon%20style&sign=8db3ca1636c89c2b7f4b2c9f1fe68612"}
                      alt={currentUser?.username}
                    />
                    <span className="ml-2 hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {currentUser?.username}
                    </span>
                    <i class="fa-solid fa-chevron-down ml-1 text-xs text-gray-500"></i>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 hidden group-hover:block border border-gray-200 dark:border-gray-700">
                    <a
                      href="/account"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <i class="fa-solid fa-user mr-2"></i>账号管理
                    </a>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <i class="fa-solid fa-sign-out-alt mr-2"></i>退出登录
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <i class="fa-solid fa-sign-in-alt mr-2"></i>登录
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}