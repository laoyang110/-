import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AuthContext } from '@/contexts/authContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // 模拟用户数据
  const mockUsers = [
    { id: 1, username: 'testuser', password: '123456', nickname: '问道高手', avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Game%20Player%20Avatar%2C%20male%2C%20Chinese%20style&sign=6fc108942c98a32a29e6639ecdfca8a0' },
    { id: 2, username: 'gamefan', password: '654321', nickname: '游戏爱好者', avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Game%20Player%20Avatar%2C%20female%2C%20Chinese%20style&sign=f1aa9bb04886765e6c99734b6cd5a7e0' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 模拟API请求延迟
    setTimeout(() => {
      const user = mockUsers.find(u => u.username === username && u.password === password);
      
      if (user) {
        login(user);
        toast.success('登录成功！欢迎回来，' + user.nickname);
        
        if (rememberMe) {
          localStorage.setItem('remember', 'true');
        } else {
          localStorage.removeItem('remember');
        }
        
        navigate('/');
      } else {
        toast.error('用户名或密码不正确，请重试');
      }
      
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 dark:bg-blue-700 p-6 text-center">
            <img 
              src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Wendao%20Game%20Logo%2C%20Chinese%20style%2C%20blue%20and%20gold%20colors&sign=c8971f22c7505e7fe4ae5d3d5875efde" 
              alt="问道游戏" 
              className="h-16 w-16 rounded-full mx-auto bg-white p-2 shadow-md"
            />
            <h2 className="mt-4 text-2xl font-bold text-white">问道充值中心</h2>
            <p className="mt-1 text-blue-100">账号登录</p>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  用户名
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fa-solid fa-user text-gray-400"></i>
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="请输入用户名"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  密码
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fa-solid fa-lock text-gray-400"></i>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="请输入密码"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    记住我
                  </label>
                </div>
                
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                    忘记密码?
                  </a>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-80 transition-colors"
              >
                {loading ? (
                  <>
                    <i class="fa-solid fa-circle-notch fa-spin mr-2"></i> 登录中...
                  </>
                ) : (
                  <>
                    <i class="fa-solid fa-sign-in-alt mr-2"></i> 登录
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                还没有账号?{' '}
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                  立即注册
                </a>
              </p>
            </div>
            
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    快速登录
                  </span>
                </div>
              </div>
              
              <div className="mt-4 flex justify-center space-x-4">
                <button className="p-3 rounded-full bg-green-50 hover:bg-green-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
                  <i class="fa-brands fa-weixin text-green-500 text-xl"></i>
                </button>
                <button className="p-3 rounded-full bg-blue-50 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
                  <i class="fa-brands fa-qq text-blue-500 text-xl"></i>
                </button>
                <button className="p-3 rounded-full bg-red-50 hover:bg-red-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
                  <i class="fa-brands fa-weibo text-red-500 text-xl"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            <i class="fa-solid fa-shield-alt mr-1"></i>
            官方认证充值渠道，安全可靠
          </p>
        </div>
      </div>
    </div>
  );
}