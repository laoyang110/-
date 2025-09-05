export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start">
              <img 
                src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Wendao%20Game%20Logo%2C%20Chinese%20style%2C%20blue%20and%20gold%20colors&sign=c8971f22c7505e7fe4ae5d3d5875efde" 
                alt="问道游戏" 
                className="h-6 w-6 rounded-md mr-2"
              />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">问道充值中心</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center md:text-left">
              © 2025 问道游戏官方充值平台. 保留所有权利.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <i class="fa-solid fa-file-text-o mr-1"></i>服务条款
            </a>
            <a href="#" className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <i class="fa-solid fa-shield mr-1"></i>隐私政策
            </a>
            <a href="#" className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <i class="fa-solid fa-question-circle mr-1"></i>帮助中心
            </a>
            <a href="#" className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <i class="fa-solid fa-headphones mr-1"></i>客服支持
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}