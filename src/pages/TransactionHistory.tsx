import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

// 模拟交易记录数据
const generateMockTransactions = () => {
  const types = ['recharge', 'consume', 'refund'];
  const statuses = ['success', 'pending', 'failed', 'refunded'];
  const packages = [
    '10元套餐', '50元套餐', '100元套餐', '200元套餐', '500元套餐', 
    '购买道具', '购买时装', '购买宠物', '购买装备', '系统退款'
  ];
  
  const transactions = [];
  
  for (let i = 1; i <= 25; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const amount = Math.floor(Math.random() * 1000) + 10;
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 90));
    
    transactions.push({
      id: i,
      type,
      amount: type === 'refund' ? -amount : (type === 'consume' ? -Math.min(amount, 200) : amount),
      date: format(date, 'yyyy-MM-dd HH:mm', { locale: zhCN }),
      status,
      package: packages[Math.floor(Math.random() * packages.length)],
      orderNumber: 'WD' + Date.now().toString().slice(-8) + i.toString().padStart(4, '0'),
      character: '问道真人',
      server: '紫禁之巅'
    });
  }
  
  // 按日期降序排序
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export default function TransactionHistory() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    startDate: '',
    endDate: ''
  });
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      toast.error('请先登录后再查看交易记录');
      return;
    }
    
    // 模拟加载交易记录
    setLoading(true);
    setTimeout(() => {
      const mockData = generateMockTransactions();
      setTransactions(mockData);
      setFilteredTransactions(mockData);
      setLoading(false);
    }, 800);
  }, [currentUser, navigate]);
  
  useEffect(() => {
    // 应用筛选器
    let result = [...transactions];
    
    if (filters.type !== 'all') {
      result = result.filter(tx => tx.type === filters.type);
    }
    
    if (filters.status !== 'all') {
      result = result.filter(tx => tx.status === filters.status);
    }
    
    if (filters.startDate) {
      const start = new Date(filters.startDate);
      result = result.filter(tx => new Date(tx.date) >= start);
    }
    
    if (filters.endDate) {
      const end = new Date(filters.endDate);
      end.setHours(23, 59, 59, 999);
      result = result.filter(tx => new Date(tx.date) <= end);
    }
    
    setFilteredTransactions(result);
    setCurrentPage(1); // 重置到第一页
  }, [filters, transactions]);
  
  // 处理分页
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  
  // 处理筛选器变化
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  // 重置筛选器
  const resetFilters = () => {
    setFilters({
      type: 'all',
      status: 'all',
      startDate: '',
      endDate: ''
    });
  };
  
  // 查看交易详情
  const viewTransactionDetail = (transaction) => {
    toast.info(`查看交易详情: ${transaction.orderNumber}`);
    // 这里可以添加打开详情模态框的逻辑
  };
  
  if (!currentUser) return null;
  
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <i class="fa-solid fa-history text-blue-500 mr-2"></i> 交易记录
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          查看您的充值和消费记录，管理您的游戏财务
        </p>
      </div>
      
      {/* 筛选器 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">交易筛选</h2>
          <button 
            onClick={resetFilters}
            className="mt-2 md:mt-0 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 flex items-center"
          >
            <i class="fa-solid fa-refresh mr-1"></i> 重置筛选
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              交易类型
            </label>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
            >
              <option value="all">全部类型</option>
              <option value="recharge">充值</option>
              <option value="consume">消费</option>
              <option value="refund">退款</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              交易状态
            </label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
            >
              <option value="all">全部状态</option>
              <option value="success">成功</option>
              <option value="pending">处理中</option>
              <option value="failed">失败</option>
              <option value="refunded">已退款</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              开始日期
            </label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              结束日期
            </label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>
      
      {/* 交易记录列表 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  订单号
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  交易类型
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  游戏角色
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  金额 (元)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  描述
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  日期
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  状态
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                // 加载状态
                Array(itemsPerPage).fill(0).map((_, index) => (
                  <tr key={`loading-${index}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-12"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20"></div>
                    </td>
                  </tr>
                ))
              ) : currentItems.length === 0 ? (
                // 无数据状态
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <i class="fa-solid fa-folder-open text-gray-300 dark:text-gray-600 text-5xl mb-4"></i>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">暂无交易记录</h3>
                      <p className="text-gray-500 dark:text-gray-400 max-w-md">
                        没有找到符合条件的交易记录，请尝试调整筛选条件或进行充值
                      </p>
                      <button 
                        onClick={() => navigate('/recharge')}
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        <i class="fa-solid fa-plus-circle mr-2"></i> 立即充值
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                // 交易记录数据
                currentItems.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {transaction.orderNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.type === 'recharge' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                          : transaction.type === 'consume'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                      }`}>
                        {transaction.type === 'recharge' ? '充值' : 
                         transaction.type === 'consume' ? '消费' : '退款'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {transaction.character} <br />
                      <span className="text-xs text-gray-500 dark:text-gray-400">{transaction.server}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className={transaction.amount >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                        {transaction.amount >= 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {transaction.package}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.status === 'success' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                          : transaction.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                            : transaction.status === 'failed'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                              : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100'
                      }`}>
                        {transaction.status === 'success' ? '成功' : 
                         transaction.status === 'pending' ? '处理中' : 
                         transaction.status === 'failed' ? '失败' : '已退款'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => viewTransactionDetail(transaction)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 mr-3"
                      >
                        详情
                      </button>
                      {transaction.status === 'failed' && (
                        <button 
                          onClick={() => {
                            toast.info(`重新发起充值: ${transaction.orderNumber}`);
                            navigate('/recharge');
                          }}
                          className="text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300"
                        >
                          重试
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* 分页控件 */}
        {!loading && filteredTransactions.length > 0 && (
          <div className="bg-white dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  显示第 <span className="font-medium">{indexOfFirstItem + 1}</span> 到 <span className="font-medium">{Math.min(indexOfLastItem, filteredTransactions.length)}</span> 条，共 <span className="font-medium">{filteredTransactions.length}</span> 条记录
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <span className="sr-only">上一页</span>
                    <i class="fa-solid fa-chevron-left"></i>
                  </button>
                  
                  {[...Array(Math.min(5, totalPages)).keys()].map((i) => {
                    // 计算显示哪些页码（当前页附近）
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium ${
                          currentPage === pageNum
                            ? 'z-10 bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <span className="sr-only">下一页</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}