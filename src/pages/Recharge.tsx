import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';

// 模拟充值套餐数据
const rechargePackages = [
  { id: 1, amount: 10, price: 10, bonus: 0, icon: "fa-gem", popular: false },
  { id: 2, amount: 50, price: 50, bonus: 5, icon: "fa-diamond", popular: false },
  { id: 3, amount: 100, price: 100, bonus: 15, icon: "fa-crown", popular: true },
  { id: 4, amount: 200, price: 200, bonus: 35, icon: "fa-trophy", popular: false },
  { id: 5, amount: 500, price: 500, bonus: 100, icon: "fa-star", popular: false },
  { id: 6, amount: 1000, price: 1000, bonus: 220, icon: "fa-medal", popular: false },
  { id: 7, amount: 2000, price: 2000, bonus: 450, icon: "fa-award", popular: false },
  { id: 8, amount: 5000, price: 5000, bonus: 1200, icon: "fa-trophy", popular: false }
];

// 模拟支付方式
const paymentMethods = [
  { id: 1, name: "支付宝", icon: "fa-cc-alipay", color: "bg-blue-500" },
  { id: 2, name: "微信支付", icon: "fa-weixin", color: "bg-green-500" },
  { id: 3, name: "QQ钱包", icon: "fa-qq", color: "bg-blue-400" },
  { id: 4, name: "银行卡支付", icon: "fa-credit-card", color: "bg-purple-500" }
];

// 模拟游戏角色数据
const gameRoles = [
  { id: 1, name: "问道真人", server: "紫禁之巅", level: 125 },
  { id: 2, name: "道法自然", server: "问道新区", level: 108 }
];

export default function Recharge() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(rechargePackages[2]); // 默认选择热门套餐
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0]);
  const [selectedRole, setSelectedRole] = useState(gameRoles[0]);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      toast.error('请先登录后再进行充值');
    }
  }, [currentUser, navigate]);

  const handleRecharge = () => {
    if (!agreeTerms) {
      toast.warning('请阅读并同意充值协议');
      return;
    }

    setProcessing(true);
    
    // 模拟支付处理
    setTimeout(() => {
      setProcessing(false);
      toast.success(`充值成功！您已成功充值${selectedPackage.price}元，获得${selectedPackage.amount + selectedPackage.bonus}元宝`);
      navigate('/transactions');
    }, 2000);
  };

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <i class="fa-solid fa-credit-card text-blue-500 mr-2"></i> 充值中心
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          为您的游戏账号充值元宝，畅享问道游戏乐趣
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：充值套餐选择 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 充值套餐选择 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">选择充值套餐</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {rechargePackages.map(pkg => (
                <div 
                  key={pkg.id}
                  className={`border rounded-lg overflow-hidden transition-all cursor-pointer group ${
                    selectedPackage.id === pkg.id
                      ? 'border-blue-500 shadow-md ring-2 ring-blue-500'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                  } ${pkg.popular ? 'relative' : ''}`}
                  onClick={() => setSelectedPackage(pkg)}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-yellow-400 text-white text-xs font-bold px-2 py-1">
                      热门
                    </div>
                  )}
                  <div className={`p-4 ${selectedPackage.id === pkg.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{pkg.price}元</h3>
                      <i class={`fa-solid ${pkg.icon} text-blue-500`}></i>
                    </div>
                    <div className="mb-3">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">{pkg.amount}</span>
                      <span className="text-gray-500 dark:text-gray-400"> 元宝</span>
                    </div>
                    {pkg.bonus > 0 && (
                      <div className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full inline-block">
                        赠送{pkg.bonus}元宝
                      </div>
                    )}
                    <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                      总计: {pkg.amount + pkg.bonus}元宝
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 自定义充值金额 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">自定义充值金额</h2>
            
            <div className="grid grid-cols-4 gap-3 mb-4">
              {[20, 30, 40, 60].map(amount => (
                <button
                  key={amount}
                  className="border border-gray-200 dark:border-gray-700 rounded-md py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => {
                    // 这里可以添加自定义金额选择逻辑
                    toast.info(`您选择了自定义金额：${amount}元`);
                  }}
                >
                  {amount}元
                </button>
              ))}
            </div>
            
            <div className="flex items-center">
              <span className="text-gray-700 dark:text-gray-300 mr-3">其他金额：</span>
              <div className="relative flex-1 max-w-md">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
                  ￥
                </span>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  className="block w-full pl-7 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="请输入金额（1-10000元）"
                />
              </div>
              <button className="ml-3 px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                确定
              </button>
            </div>
          </div>

          {/* 充值须知 */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
            <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-300 flex items-center mb-4">
              <i class="fa-solid fa-info-circle mr-2"></i> 充值须知
            </h2>
            
            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-400"><li className="flex items-start">
                <i class="fa-solid fa-check-circle mt-1 mr-2"></i>
                <span>1元=10问道元宝，充值成功后元宝将直接发放至您选择的游戏角色</span>
              </li>
              <li className="flex items-start">
                <i class="fa-solid fa-check-circle mt-1 mr-2"></i>
                <span>请确保选择正确的游戏服务器和角色，元宝一旦充值无法转移</span>
              </li>
              <li className="flex items-start">
                <i class="fa-solid fa-check-circle mt-1 mr-2"></i>
                <span>充值过程中如遇问题，请联系在线客服或拨打客服热线：400-123-4567</span>
              </li>
              <li className="flex items-start">
                <i class="fa-solid fa-check-circle mt-1 mr-2"></i>
                <span>所有充值记录可在"交易记录"中查询，系统保留6个月交易记录</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 右侧：订单信息和支付方式 */}
        <div className="space-y-6">
          {/* 订单信息 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">订单信息</h2>
            
            <div className="space-y-4">
              {/* 选择游戏角色 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  选择游戏角色
                </label>
                <div className="relative">
                  <select
                    value={selectedRole.id}
                    onChange={(e) => {
                      const selectedId = parseInt(e.target.value);
                      setSelectedRole(gameRoles.find(role => role.id === selectedId) || gameRoles[0]);
                    }}
                    className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    {gameRoles.map(role => (
                      <option key={role.id} value={role.id}>
                        {role.name} - {role.server} (等级: {role.level})
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <i class="fa-solid fa-chevron-down text-gray-400"></i>
                  </div>
               </div>
             </div>
             
             <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
               <div className="flex items-start">
                 <i class="fa-solid fa-check-circle text-green-500 mt-1 mr-2"></i>
                 <p className="text-sm text-green-800 dark:text-green-100">
                   充值的元宝将直接发放至您选择的游戏角色账号中，请确保角色信息正确。
                 </p>
               </div>
             </div>
             
             <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
               <div className="flex justify-between text-sm">
                 <span className="text-gray-600 dark:text-gray-400">充值金额</span>
                 <span className="text-gray-900 dark:text-white">{selectedPackage.price}元</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-600 dark:text-gray-400">基础元宝</span>
                  <span className="text-gray-900 dark:text-white">{selectedPackage.amount}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-600 dark:text-gray-400">赠送元宝</span>
                  <span className="text-green-600 dark:text-green-400">+{selectedPackage.bonus}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-600 dark:text-gray-400">支付方式</span>
                  <span className="text-gray-900 dark:text-white">{selectedPaymentMethod.name}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span className="text-gray-900 dark:text-white">应付金额</span>
                  <span className="text-red-600 dark:text-red-400">￥{selectedPackage.price}</span>
                </div>
              </div>
              
              {/* 支付方式选择 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  选择支付方式
                </label>
                <div className="space-y-2">
                  {paymentMethods.map(method => (
                    <div 
                      key={method.id}
                      className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${
                        selectedPaymentMethod.id === method.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                      }`}
                      onClick={() => setSelectedPaymentMethod(method)}
                    >
                      <div className={`w-10 h-10 rounded-full ${method.color} flex items-center justify-center text-white mr-3`}>
                        <i class={`fa-brands ${method.icon}`}></i>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{method.name}</span>
                      <div className="ml-auto">
                        {selectedPaymentMethod.id === method.id && (
                          <i class="fa-solid fa-check-circle text-blue-500"></i>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-600 dark:text-gray-400">
                    我已阅读并同意<a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">《充值服务协议》</a>
                  </label>
                </div>
              </div>
              
              <button
                onClick={handleRecharge}
                disabled={processing}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-80 transition-colors"
              >
                {processing ? (
                  <>
                    <i class="fa-solid fa-circle-notch fa-spin mr-2"></i> 处理中...
                  </>
                ) : (
                  <>
                    <i class="fa-solid fa-credit-card mr-2"></i> 确认支付 {selectedPackage.price}元
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 客服支持 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">客服支持</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mr-4">
                  <i class="fa-solid fa-headphones text-green-600 dark:text-green-400 text-xl"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">充值遇到问题？</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">400-123-4567</p>
                </div>
              </div>
              
              <button className="w-full flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                <i class="fa-solid fa-comments mr-2"></i> 在线客服
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}