import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '@/contexts/authContext';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);
  
  if (!isAuthenticated) return null;

  const navItems = [
    { path: '/', label: '首页', icon: 'fa-home' },
    { path: '/recharge', label: '充值中心', icon: 'fa-credit-card' },
    { path: '/transactions', label: '交易记录', icon: 'fa-history' },
    { path: '/account', label: '账号管理', icon: 'fa-user' },
    { path: '/promotions', label: '优惠活动', icon: 'fa-gift' },
  ];

  return (
    <aside className={`${
      open ? 'translate-x-0' : '-translate-x-full'
    } fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform md:translate-x-0 md:static md:shadow-none border-r border-gray-200 dark:border-gray-700`}>
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between px-4 pt-5 pb-4 border-b border-gray-200 dark:border-gray-700 md:border-b-0">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">菜单导航</h2>
          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
          >
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`${
                location.pathname === item.path
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors`}
            >
              <i class={`fa-solid ${item.icon} mr-3 text-lg ${
                location.pathname === item.path 
                  ? '' 
                  : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300'
              }`}></i>
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
              <i class="fa-solid fa-bullhorn mr-2"></i>充值公告
            </h3>
            <p className="text-xs text-blue-700 dark:text-blue-400">
              单笔充值满100元赠送10%问道元宝，活动期间额外赠送稀有道具！
            </p>
            <button className="mt-3 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
              查看详情 <i class="fa-solid fa-angle-right ml-1"></i>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}