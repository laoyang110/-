import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';

// 模拟活动数据
const mockPromotions = {
  ongoing: [
    {
      id: 1,
      title: "首充大礼包",
      description: "首次充值任意金额即可获得价值198元豪华礼包，包含高级装备、稀有宠物和大量元宝",
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Game%20Promotion%2C%20gift%20package%2C%20red%20and%20gold%20colors&sign=aa23999859840b886e22c386c345dec7",
      startDate: "2025-09-01",
      endDate: "2025-09-30",
      type: "firstRecharge",
      tag:"新用户专享",
      popularity: 5,
      details: "首次充值任意金额即可获得：高级武器*1、稀有宠物蛋*1、1000元宝、经验丹*5"
    },
    {
      id: 2,
      title: "充值返利活动",
      description: "充值满200元返30%，满500元返40%，多充多送，元宝返利即时到账",
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Game%20Promotion%2C%20recharge%20bonus%2C%20blue%20and%20gold%20colors&sign=84ef26ea4eeffc83f7a468893ee2f1e7",
      startDate: "2025-09-05",
      endDate: "2025-09-20",
      type: "recharge",
      tag: "限时特惠",
      popularity: 4,
      details: "充值200元返60元(30%)，充值500元返200元(40%)，充值1000元返450元(45%)，充值2000元返1000元(50%)"
    },
    {
      id:3,
      title: "每日签到领元宝",
      description: "连续签到7天可获得额外元宝奖励，累计签到30天可获得稀有称号",
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Game%20Promotion%2C%20daily%20check-in%2C%20green%20and%20gold%20colors&sign=940d34945b91842e1d31982c0a10b244",
      startDate: "2025-08-01",
      endDate: "2025-12-31",
      type: "checkin",
      tag: "长期活动",
      popularity: 3,
      details: "连续签到1天：50元宝，3天：100元宝，7天：300元宝+道具礼包，30天：500元宝+稀有称号"
    },
    {
      id:4,
      title: "邀请好友得奖励",
      description: "成功邀请好友注册并充值，双方均可获得丰厚奖励，多邀多得",
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Game%20Promotion%2C%20invite%20friends%2C%20purple%20and%20gold%20colors&sign=2ea8414ac01a4d758f12d669688fca8b",
      startDate: "2025-09-01",
      endDate: "2025-10-15",
      type: "invite",
      tag: "全民参与",
      popularity: 4,
      details: "邀请好友注册：双方各得100元宝，好友首次充值：邀请者获得充值金额20%的元宝奖励，上不封顶"
    }
  ],
  upcoming: [
    {
      id: 101,
      title: "国庆特惠活动",
      description: "国庆期间充值享受双倍元宝，更有稀有坐骑限时抽取",
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Game%20Promotion%2C%20national%20day%2C%20red%20and%20gold%20colors&sign=018859769c7c7e0bb4e266e40c1e034a",
      startDate: "2025-09-25",
      endDate: "2025-10-10",
      type: "holiday",
      tag: "国庆专属"
    },
    {
      id: 102,
      title: "新服开启活动",
      description: "新服务器\"问道乾坤\"开启，入驻即送豪华新手礼包",
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Game%20Promotion%2C%20new%20server%2C%20orange%20and%20gold%20colors&sign=cc6bd4aae0f88fae83d5daa3b67ca849",
      startDate: "2025-10-01",
      endDate: "2025-10-15",
      type: "newServer",
      tag: "新服专享"
    }
  ]
};

// 活动类型
const activityTypes = [
  { id: "all", name: "全部活动" },
  { id: "firstRecharge", name: "首充活动" },
  { id: "recharge", name: "充值返利" },
  { id: "checkin", name: "签到活动" },
  { id: "invite", name: "邀请活动" },
  { id: "holiday", name: "节日活动" },
  { id: "newServer", name: "新服活动" }
];

export default function Promotions() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ongoing');
  const [selectedType, setSelectedType] = useState('all');
  const [filteredActivities, setFilteredActivities] = useState(mockPromotions.ongoing);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      toast.error('请先登录后再查看活动');
    } else {
      // 初始筛选
      filterActivities();
    }
  }, [currentUser, navigate, activeTab, selectedType]);

  const filterActivities = () => {
    const activities = activeTab === 'ongoing' ? mockPromotions.ongoing : mockPromotions.upcoming;
    
    if (selectedType === 'all') {
      setFilteredActivities(activities);
    } else {
      setFilteredActivities(activities.filter(activity => activity.type === selectedType));
    }
  };

  const handleViewDetails = (activity) => {
    setSelectedActivity(activity);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedActivity(null);
  };

  const handleGoToRecharge = () => {
    navigate('/recharge');
    handleCloseDetails();
  };

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <i className="fa-solid fa-gift text-blue-500 mr-2"></i> 优惠活动
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          参与充值活动，获取额外奖励，畅享问道游戏乐趣
        </p>
      </div>

      {/* 活动分类和筛选 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="flex border-b border-gray-200 dark:border-gray-700 md:border-b-0">
            <button
              onClick={() => setActiveTab('ongoing')}
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === 'ongoing'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border-b-2 border-transparent'
              }`}
            >
              进行中活动 ({mockPromotions.ongoing.length})
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === 'upcoming'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border-b-2 border-transparent'
              }`}
            >
              即将开始 ({mockPromotions.upcoming.length})
            </button>
          </div>
          
          <div className="mt-4 md:mt-0 w-full md:w-auto">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="block w-full md:w-auto pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
            >
              {activityTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* 活动列表 */}
        {filteredActivities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <i className="fa-solid fa-search text-gray-300 dark:text-gray-600 text-5xl mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">未找到活动</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              当前没有符合条件的活动，请尝试其他筛选条件或稍后再来查看
            </p>
            <button 
              onClick={() => setSelectedType('all')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <i className="fa-solid fa-refresh mr-2"></i> 查看全部活动
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredActivities.map(activity => (
              <div 
                key={activity.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => handleViewDetails(activity)}
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      activity.tag === '新用户专享' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100' :
                      activity.tag === '限时特惠' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' :
                      activity.tag === '长期活动' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                      activity.tag === '全民参与' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' :
                      activity.tag === '国庆专属' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' :
                      activity.tag === '新服专享' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
                    }`}>
                      {activity.tag}
                    </span>
                  </div>
                  {activeTab === 'upcoming' && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                        即将开始
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {activity.title}
                    </h3>
                    {activeTab === 'ongoing' && activity.popularity && (
                      <div className="flex items-center">
                        {Array(5).fill(0).map((_, i) => (
                          <i 
                            key={i} 
                            className={`fa-solid fa-star ${
                              i < activity.popularity 
                                ? 'text-yellow-400' 
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                            style={{ fontSize: '0.8rem' }}
                          ></i>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                    {activity.description}
                  </p>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                    <span>
                      <i className="fa-solid fa-calendar mr-1"></i> 
                      {activeTab === 'ongoing' ? (
                        <>
                          进行中: {activity.startDate} - {activity.endDate}
                        </>
                      ) : (
                        <>
                          即将开始: {activity.startDate}
                        </>
                      )}
                    </span>
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium flex items-center">
                      查看详情 <i className="fa-solid fa-angle-right ml-1"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* 活动详情模态框 */}
      {showDetails && selectedActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedActivity.image}
                alt={selectedActivity.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 right-4">
                <button
                  onClick={handleCloseDetails}
                  className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-colors"
                >
                  <i className="fa-solid fa-times"></i>
                </button>
              </div>
              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  selectedActivity.tag === '新用户专享' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100' :
                  selectedActivity.tag === '限时特惠' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' :
                  selectedActivity.tag === '长期活动' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                  selectedActivity.tag === '全民参与' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' :
                  selectedActivity.tag === '国庆专属' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' :
                  selectedActivity.tag === '新服专享' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
                }`}>
                  {selectedActivity.tag}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedActivity.title}
              </h2>
              
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-6">
                <span className="flex items-center mr-4">
                  <i className="fa-solid fa-calendar mr-1"></i>
                  {activeTab === 'ongoing' ? (
                    <>
                      活动时间: {selectedActivity.startDate} - {selectedActivity.endDate}
                    </>
                  ) : (
                    <>
                      开始时间: {selectedActivity.startDate}
                    </>
                  )}
                </span>
                {activeTab === 'ongoing' && selectedActivity.popularity && (
                  <span className="flex items-center">
                    <i className="fa-solid fa-star text-yellow-400 mr-1"></i>
                    人气: {selectedActivity.popularity}/5
                  </span>
                )}
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-5 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">活动详情</h3>
                <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                  <p>{selectedActivity.details}</p>
                  
                  {selectedActivity.type === 'recharge' && (
                    <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <h4 className="font-medium mb-2">充值返利规则:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>充值200元返60元(30%)</li>
                        <li>充值500元返200元(40%)</li>
                        <li>充值1000元返450元(45%)</li>
                        <li>充值2000元返1000元(50%)</li>
                      </ul>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        注: 返利元宝将在充值成功后立即发放至您的游戏账号
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800 mb-6">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 flex items-center mb-2">
                  <i className="fa-solid fa-lightbulb mr-2"></i> 活动提示
                </h3>
                <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
                  <li className="flex items-start">
                    <i className="fa-solid fa-check-circle mt-1 mr-2"></i>
                    <span>请确保您的游戏角色已绑定，奖励将直接发放至您选择的角色</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check-circle mt-1 mr-2"></i>
                    <span>活动奖励数量有限，先到先得，请及时参与</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check-circle mt-1 mr-2"></i>
                    <span>如有活动相关问题，请联系在线客服咨询</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleCloseDetails}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  关闭
                </button>
                {activeTab === 'ongoing' && selectedActivity.type !== 'checkin' && selectedActivity.type !== 'invite' && (
                  <button
                    onClick={handleGoToRecharge}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <i className="fa-solid fa-credit-card mr-2"></i> 立即参与
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}