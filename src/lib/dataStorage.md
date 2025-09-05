# 问道充值平台数据存储说明

## 数据存储方式

本项目是纯前端应用，无需配置数据库，所有数据通过浏览器的`localStorage`实现本地持久化存储。

## 本地存储实现

### 用户认证数据
在`src/contexts/authContext.ts`中实现了用户认证状态的存储：

```typescript
// 登录时保存用户数据
const login = (userData: User) => {
  setIsAuthenticated(true);
  setCurrentUser(userData);
  localStorage.setItem('user', JSON.stringify(userData));
};

// 退出时清除用户数据
const logout = () => {
  setIsAuthenticated(false);
  setCurrentUser(null);
  localStorage.removeItem('user');
};
```

### 主题设置存储
在`src/hooks/useTheme.ts`中实现了主题偏好的存储：

```typescript
const [theme, setTheme] = useState<Theme>(() => {
  const savedTheme = localStorage.getItem('theme') as Theme;
  if (savedTheme) {
    return savedTheme;
  }
  // 默认主题逻辑...
});

useEffect(() => {
  // 保存主题偏好到localStorage
  localStorage.setItem('theme', theme);
}, [theme]);
```

## 模拟数据使用

项目中使用模拟数据(Mock Data)模拟后端API响应：

1. **用户数据**：在`src/pages/Login.tsx`中定义了模拟用户数组
2. **游戏账号数据**：在`src/pages/AccountManagement.tsx`中定义了模拟游戏账号
3. **充值套餐数据**：在`src/pages/Recharge.tsx`中定义了充值套餐信息
4. **交易记录数据**：在`src/pages/TransactionHistory.tsx`中生成了模拟交易记录

## 如何集成后端数据库(扩展说明)

如果需要连接真实后端数据库，需要：

1. 创建API服务层，例如`src/services/api.ts`
2. 使用fetch或axios调用后端API
3. 修改现有context和hooks，将localStorage存储替换为API调用
4. 后端需提供用户认证、充值记录等接口

示例API调用实现：

```typescript
// 示例：用户登录API调用
const login = async (username: string, password: string) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const userData = await response.json();
    setIsAuthenticated(true);
    setCurrentUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
```

## 数据安全说明

- 本地存储数据仅保存在用户浏览器中，不会上传到服务器
- 敏感信息(如密码)在实际项目中应通过HTTPS传输并在后端加密存储
- 当前项目为演示目的，密码以明文形式存储在mock数据中，生产环境需修改