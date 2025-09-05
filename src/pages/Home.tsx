import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';

// 模拟游戏角色数据
const mockGameRoles = [
  {
    id: 1,
    name: "问道真人",
    level: 125,
    server: "紫禁之巅",
    avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Game%20Character%2C%20Chinese%20style%2C%20male%20warrior&sign=3a12b79b533c01f0c978b62658de47c9",
    vipLevel: 5,
    lastLogin: "2025-09-04 18:30",
    balance: 1250
  },
  {
    id: 2,
    name: "道法自然",
    level: 108,
    server: "问道新区",
    avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Game%20Character%2C%20Chinese%20style%2C%20female%20mage&sign=9a0b8dbc9c42be21167818f2b211fb8b",
    vipLevel: 3,
    lastLogin: "2025-09-03 21:15",
    balance: 850
  }
];

// 模拟充值套餐数据
const rechargePackages = [
  { id: 1, amount: 10, price: 10, bonus: 0, icon: "fa-gem" },
  { id: 2, amount: 50, price: 50, bonus: 5, icon: "fa-diamond" },
  { id: 3, amount: 100, price: 100, bonus: 15, icon: "fa-crown" },
  { id: 4, amount: 200, price: 200, bonus: 35, icon: "fa-trophy" },
  { id: 5, amount: 500, price: 500, bonus: 100, icon: "fa-star" },
  { id: 6, amount: 1000, price: 1000, bonus: 220, icon: "fa-medal" }
];

// 模拟交易记录数据
const recentTransactions = [
  { id: 1, type: "recharge", amount: 100, date: "2025-09-04", status: "success", package: "100元套餐" },
  { id: 2, type: "recharge", amount: 50, date: "2025-08-28", status: "success", package: "50元套餐" },
  { id: 3, type: "consume", amount: 30, date: "2025-08-25", status: "success", package: "购买道具" },
  { id: 4, type: "recharge", amount: 200, date: "2025-08-20", status: "success", package: "200元套餐" }
];

// 模拟活动数据
const promotions = [
  {
    id: 1,
    title: "首充大礼包",
    description: "首次充值任意金额即可获得价值198元豪华礼包",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Game%20Promotion%2C%20gift%20package%2C%20red%20and%20gold%20colors&sign=610bf1a0b876c55e0954261adee3d570",
    endDate: "2025-09-30"
  },
  {
    id: 2,
    title: "充值返利活动",
    description: "充值满200元返30%，多充多送",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Game%20Promotion%2C%20recharge%20bonus%2C%20blue%20and%20gold%20colors&sign=5421c9ec26766bc57031a4ddd73ac9dc",
    endDate: "2025-09-20"
  }
];

export default function Home() {
  const { currentUser } = useContext(AuthContext);
  const [selectedRole, setSelectedRole] = useState(mockGameRoles[0]);
  const [progress, setProgress] = useState(0);
  
  // 模拟进度条动画
  useEffect(() => {
    const timer = setTimeout(() => setProgress(75), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      {/* 欢迎信息 */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-xl shadow-md overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                欢迎回来，{currentUser.nickname}！
              </h1>
              <p className="mt-1 text-blue-100">
                今天是{new Date().toLocaleDateString('zh-CN', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  weekday: 'long'
                })}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Link
                to="/recharge"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <i class="fa-solid fa-plus-circle mr-2"></i> 立即充值
              </Link>
              <Link
                to="/account"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <i class="fa-solid fa-user-circle mr-2"></i> 账号管理
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 用户信息和游戏角色 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 用户信息卡片 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transform transition-transform hover:scale-[1.02]">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <i class="fa-solid fa-user-circle text-blue-500 mr-2"></i> 用户信息
          </h2>
          <div className="flex items-center mb-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.nickname}
              className="h-16 w-16 rounded-full object-cover border-2 border-blue-200 dark:border-blue-800"
            />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">用户名</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{currentUser.username}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">昵称</p>
              <p className="text-gray-900 dark:text-white">{currentUser.nickname}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">账号等级</p>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{progress}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 游戏角色卡片 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:col-span-2 transform transition-transform hover:scale-[1.02]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <i class="fa-solid fa-gamepad text-blue-500 mr-2"></i> 我的游戏角色
            </h2>
            <div className="flex space-x-2">
              {mockGameRoles.map(role => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedRole.id === role.id
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {role.name}
                </button>
              ))}
              <button className="p-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                <i class="fa-solid fa-plus-circle"></i>
              </button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center">
            <img
              src={selectedRole.avatar}
              alt={selectedRole.name}
              className="h-24 w-24 rounded-lg object-cover border-4 border-blue-100 dark:border-blue-900"
            />
            <div className="mt-4 sm:mt-0 sm:ml-6 flex-1 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">角色名称</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedRole.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">等级</p>
                <p className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">{selectedRole.level}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">服务器</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedRole.server}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">VIP等级</p>
                <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                  <i class="fa-solid fa-diamond mr-1"></i> {selectedRole.vipLevel}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">问道币</p>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                  <i class="fa-solid fa-coins mr-1"></i> {selectedRole.balance}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">上次登录</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedRole.lastLogin}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button 
              onClick={() => toast.info('功能开发中，敬请期待！')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              <i class="fa-solid fa-sign-in-alt mr-2"></i> 进入游戏
            </button>
          </div>
        </div>
      </div>

      {/* 推荐充值套餐 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <i class="fa-solid fa-gift text-blue-500 mr-2"></i> 推荐充值套餐
          </h2>
          <Link to="/recharge" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 flex items-center">
            查看全部 <i class="fa-solid fa-angle-right ml-1"></i>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rechargePackages.slice(0, 3).map(pkg => (
            <div 
              key={pkg.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow group cursor-pointer transform hover:-translate-y-1 transition-transform"
              onClick={() => {
                toast.info(`您选择了${pkg.price}元充值套餐`);
                // 这里可以添加跳转到充值页面的逻辑
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{pkg.price}元套餐</h3>
                <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  赠{pkg.bonus}元宝
                </div>
              </div>
              <div className="flex items-end justify-between mb-4">
                <div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{pkg.amount + pkg.bonus}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">总元宝数</p>
                </div>
                <i class={`fa-solid ${pkg.icon} text-4xl text-blue-500 opacity-20 group-hover:opacity-40 transition-opacity`}></i>
              </div>
              <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm font-medium">
                立即充值
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 最近交易和热门活动 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 最近交易 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <i class="fa-solid fa-history text-blue-500 mr-2"></i> 最近交易
            </h2>
            <Link to="/transactions" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 flex items-center">
              查看全部 <i class="fa-solid fa-angle-right ml-1"></i>
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    交易类型
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    金额
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    套餐/描述
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    日期
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    状态
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {recentTransactions.map(transaction => (
                  <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                          transaction.type === 'recharge' 
                            ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-100' 
                            : 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-100'
                        }`}>
                          <i class={`fa-solid ${transaction.type === 'recharge' ? 'fa-plus' : 'fa-minus'}`}></i>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {transaction.type === 'recharge' ? '充值' : '消费'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {transaction.type === 'recharge' ? '+' : ''}{transaction.amount}元
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {transaction.package}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === 'success'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                      }`}>
                        {transaction.status === 'success' ? '成功' : '处理中'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 热门活动 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-4">
            <i class="fa-solid fa-fire text-blue-500 mr-2"></i> 热门活动
          </h2>
          
          <div className="space-y-4">
            {promotions.map(promotion => (
              <div 
                key={promotion.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden group cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => toast.info(`活动详情：${promotion.title}`)}
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={promotion.image}
                    alt={promotion.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-3">
                    <h3 className="text-white font-semibold">{promotion.title}</h3>
                    <p className="text-xs text-gray-200">截止日期：{promotion.endDate}</p>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{promotion.description}</p>
                  <button className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium">
                    查看详情 <i class="fa-solid fa-angle-right ml-1"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <button 
              onClick={() => toast.info('更多活动即将上线，敬请期待！')}
              className="w-full py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              查看更多活动
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}