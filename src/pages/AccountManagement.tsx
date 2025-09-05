import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';

// 模拟游戏账号数据
const mockGameAccounts = [
  {
    id: 1,
    name: "问道真人",
    roleId: "WD12345678",
    level: 125,
    server: "紫禁之巅",
    avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Game%20Character%2C%20male%2C%20Chinese%20style%2C%20warrior&sign=d4ca8c46e9111efb26bcceb23b6739b6",
    vipLevel: 5,
    lastLogin: "2025-09-04 18:30",
    balance: 1250,
    isDefault: true
  },
  {
    id: 2,
    name: "道法自然",
    roleId: "WD87654321",
    level: 108,
    server: "问道新区",
    avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Game%20Character%2C%20female%2C%20Chinese%20style%2C%20mage&sign=53b47c4fbfdb8f698451dc13ed4535d4",
    vipLevel: 3,
    lastLogin: "2025-09-03 21:15",
    balance: 850,
    isDefault: false
  }
];

// 模拟用户个人信息
const mockUserProfile = {
  username: "testuser",
  nickname: "问道高手",
  avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Game%20Player%20Avatar%2C%20male%2C%20Chinese%20style&sign=6fc108942c98a32a29e6639ecdfca8a0",
  email: "user@example.com",
  phone: "138****5678",
  registerDate: "2024-05-12",
  lastLogin: "2025-09-05 14:23",
  securityLevel: "高",
  loginHistory: [
    { date: "2025-09-05 14:23", ip: "192.168.1.1", device: "Windows Chrome" },
    { date: "2025-09-04 09:15", ip: "192.168.1.1", device: "Windows Chrome" },
    { date: "2025-09-03 20:45", ip: "10.0.0.1", device: "iOS Safari" }
  ]
};

export default function AccountManagement() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [userProfile, setUserProfile] = useState(mockUserProfile);
  const [gameAccounts, setGameAccounts] = useState(mockGameAccounts);
  const [editingProfile, setEditingProfile] = useState(false);
  const [newNickname, setNewNickname] = useState(userProfile.nickname);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      toast.error('请先登录后再管理账号');
    }
  }, [currentUser, navigate]);

  const handleSaveProfile = () => {
    if (!newNickname.trim()) {
      toast.warning('昵称不能为空');
      return;
    }
    
    setLoading(true);
    // 模拟保存操作
    setTimeout(() => {
      setUserProfile(prev => ({ ...prev, nickname: newNickname }));
      setEditingProfile(false);
      setLoading(false);
      toast.success('个人信息更新成功');
    }, 800);
  };

  const handleSetDefaultAccount = (accountId) => {
    setGameAccounts(prev => 
      prev.map(account => ({
        ...account,
        isDefault: account.id === accountId
      }))
    );
    toast.success('默认账号已更新');
  };

  const handleLogout = () => {
    setLoading(true);
    // 模拟登出操作
    setTimeout(() => {
      logout();
      navigate('/login');
      toast.success('成功退出登录');
    }, 800);
  };

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <i class="fa-solid fa-user-circle text-blue-500 mr-2"></i> 账号管理
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          管理您的个人信息、游戏账号和安全设置
        </p>
      </div>

      {/* 账号管理选项卡 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <i class="fa-solid fa-user mr-2"></i> 个人信息
            </button>
            <button
              onClick={() => setActiveTab('accounts')}
              className={`py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'accounts'
                  ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <i class="fa-solid fa-gamepad mr-2"></i> 游戏账号
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'security'
                  ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <i class="fa-solid fa-shield mr-2"></i> 安全设置
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* 个人信息选项卡内容 */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 左侧：头像和基本信息 */}
                <div className="md:col-span-1">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <img
                        src={userProfile.avatar}
                        alt={userProfile.nickname}
                        className="h-32 w-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
                      />
                      <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 border-2 border-white dark:border-gray-800 cursor-pointer hover:bg-blue-600 transition-colors">
                        <i class="fa-solid fa-camera text-white"></i>
                      </div>
                    </div>
                    
                    <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{userProfile.nickname}</h2>
                    <p className="text-gray-500 dark:text-gray-400">{userProfile.username}</p>
                    
                    <div className="mt-4 w-full">
                      <button 
                        onClick={() => setEditingProfile(true)}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        <i class="fa-solid fa-edit mr-2"></i> 编辑资料
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* 右侧：详细信息 */}
                <div className="md:col-span-2 space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">账号信息</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">用户名</p>
                        <p className="text-gray-900 dark:text-white">{userProfile.username}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">昵称</p>
                        {editingProfile ? (
                          <div className="flex items-center">
                            <input
                              type="text"
                              value={newNickname}
                              onChange={(e) => setNewNickname(e.target.value)}
                              className="flex-1 block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                            />
                            <button 
                              onClick={handleSaveProfile}
                              disabled={loading}
                              className="ml-2 inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-80 transition-colors"
                            >
                              {loading ? (
                                <i class="fa-solid fa-circle-notch fa-spin"></i>
                              ) : (
                                <i class="fa-solid fa-check"></i>
                              )}
                            </button>
                            <button 
                              onClick={() => {
                                setEditingProfile(false);
                                setNewNickname(userProfile.nickname);
                              }}
                              className="ml-2 inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            >
                              <i class="fa-solid fa-times"></i>
                            </button>
                          </div>
                        ) : (
                          <p className="text-gray-900 dark:text-white">{userProfile.nickname}</p>
                        )}
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">邮箱</p>
                        <p className="text-gray-900 dark:text-white">{userProfile.email}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">手机号码</p>
                        <p className="text-gray-900 dark:text-white">{userProfile.phone}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">注册时间</p>
                        <p className="text-gray-900 dark:text-white">{userProfile.registerDate}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">最后登录</p>
                        <p className="text-gray-900 dark:text-white">{userProfile.lastLogin}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">安全等级</p>
                        <div className="flex items-center">
                          <div className="flex">
                            {[1, 2, 3].map((star) => (
                              <i 
                                key={star} 
                                class={`fa-solid fa-star ${
                                  star <= (userProfile.securityLevel === '高' ? 3 : userProfile.securityLevel === '中' ? 2 : 1) 
                                    ? 'text-yellow-400' 
                                    : 'text-gray-300 dark:text-gray-600'
                                }`}
                              ></i>
                            ))}
                          </div>
                          <span className="ml-2 text-gray-900 dark:text-white">{userProfile.securityLevel}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">最近登录记录</h3>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              时间
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              IP地址
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              设备
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {userProfile.loginHistory.map((login, index) => (
                            <tr key={index} className={index === 0 ? 'bg-green-50 dark:bg-green-900/10' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {login.date}
                                {index === 0 && (
                                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                    当前会话
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {login.ip}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {login.device}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* 游戏账号选项卡内容 */}
          {activeTab === 'accounts' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">我的游戏账号</h2>
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                  <i class="fa-solid fa-plus-circle mr-2"></i> 绑定新账号
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gameAccounts.map(account => (
                  <div 
                    key={account.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow relative"
                  >
                    {account.isDefault && (
                      <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs font-bold px-2 py-1">
                        默认账号
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="flex items-start">
                        <img
                          src={account.avatar}
                          alt={account.name}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{account.name}</h3>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">ID: {account.roleId}</span>
                          </div>
                          
                          <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <i class="fa-solid fa-server mr-1"></i> {account.server}
                            <span className="mx-2">|</span>
                            <i class="fa-solid fa-level-up-alt mr-1"></i> 等级: {account.level}
                            <span className="mx-2">|</span>
                            <i class="fa-solid fa-diamond mr-1 text-purple-500"></i> VIP {account.vipLevel}
                          </div>
                          
                          <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <i class="fa-solid fa-coins mr-1 text-yellow-500"></i> {account.balance} 元宝
                            <span className="mx-2">|</span>
                            <i class="fa-solid fa-clock mr-1"></i> 最后登录: {account.lastLogin}
                          </div>
                          
                          <div className="mt-4 flex space-x-2">
                            <button 
                              onClick={() => handleSetDefaultAccount(account.id)}
                              disabled={account.isDefault}
                              className={`flex-1 py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                                account.isDefault
                                  ? 'bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed'
                                  : 'text-blue-600 border-blue-300 bg-white dark:bg-gray-700 dark:text-blue-400 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:ring-blue-500'
                              }`}
                            >
                              {account.isDefault ? '已设为默认' : '设为默认'}
                            </button>
                            
                            <button className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
                              <i class="fa-solid fa-history mr-1"></i> 充值记录
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* 安全设置选项卡内容 */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">安全设置</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <i class="fa-solid fa-lock text-xl"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900 dark:text-white">修改密码</h4>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        定期修改密码可以提高账号安全性
                      </p>
                      <button className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium">
                        立即修改 <i class="fa-solid fa-angle-right ml-1"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                      <i class="fa-solid fa-mobile-alt text-xl"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900 dark:text-white">绑定手机</h4>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        绑定手机后可启用短信验证，提高账号安全性
                      </p>
                      <button className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium">
                        立即绑定 <i class="fa-solid fa-angle-right ml-1"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <i class="fa-solid fa-shield-alt text-xl"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900 dark:text-white">二次验证</h4>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        启用二次验证，为您的账号提供额外安全保障
                      </p>
                      <button className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium">
                        启用验证 <i class="fa-solid fa-angle-right ml-1"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                      <i class="fa-solid fa-sign-out-alt text-xl"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900 dark:text-white">退出登录</h4>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        安全退出当前账号，保护您的账号安全
                      </p>
                      <button 
                        onClick={() => setShowLogoutConfirm(true)}
                        className="mt-2 text-sm text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 font-medium"
                      >
                        立即退出 <i class="fa-solid fa-angle-right ml-1"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-100 dark:border-blue-800">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 flex items-center mb-4">
                  <i class="fa-solid fa-exclamation-circle mr-2"></i> 安全提示
                </h3>
                
                <ul className="space-y-3 text-sm text-blue-700 dark:text-blue-400">
                  <li className="flex items-start">
                    <i class="fa-solid fa-check-circle mt-1 mr-2"></i>
                    <span>请勿向他人泄露您的账号密码，官方工作人员不会以任何理由索要您的密码</span>
                  </li>
                  <li className="flex items-start">
                    <i class="fa-solid fa-check-circle mt-1 mr-2"></i>
                    <span>建议定期修改密码，并使用包含字母、数字和特殊符号的复杂密码</span>
                  </li>
                  <li className="flex items-start">
                    <i class="fa-solid fa-check-circle mt-1 mr-2"></i>
                    <span>在公共场所使用后请及时退出账号，防止账号被盗</span>
                  </li>
                  <li className="flex items-start">
                    <i class="fa-solid fa-check-circle mt-1 mr-2"></i>
                    <span>如发现账号异常，请立即修改密码并联系客服</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* 退出登录确认模态框 */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
                <i class="fa-solid fa-sign-out-alt text-red-600 dark:text-red-400 text-xl"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">确认退出登录？</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">您将退出当前账号，需要重新登录才能继续使用</p>
              <div className="mt-6 flex justify-center space-x-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-80 transition-colors"
                >
                  {loading ? (
                    <>
                      <i class="fa-solid fa-circle-notch fa-spin mr-2"></i> 退出中...
                    </>
                  ) : (
                    <>
                      <i class="fa-solid fa-sign-out-alt mr-2"></i> 确认退出
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 编辑资料模态框 */}
      {editingProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">编辑个人资料</h3>
              <button 
                onClick={() => {
                  setEditingProfile(false);
                  setNewNickname(userProfile.nickname);
                }}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
              >
                <i class="fa-solid fa-times"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  昵称
                </label>
                <input
                  type="text"
                  value={newNickname}
                  onChange={(e) => setNewNickname(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                  placeholder="请输入昵称"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  昵称将显示在游戏和充值中心，长度不超过16个字符
                </p>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setEditingProfile(false);
                    setNewNickname(userProfile.nickname);
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={loading || !newNickname.trim()}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-80 transition-colors"
                >
                  {loading ? (
                    <>
                      <i class="fa-solid fa-circle-notch fa-spin mr-2"></i> 保存中...
                    </>
                  ) : (
                    <>
                      <i class="fa-solid fa-save mr-2"></i> 保存
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}