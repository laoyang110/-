import { createContext } from "react";

// 定义用户类型接口
export interface User {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
}

// 定义Context接口
export interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// 创建Context
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  currentUser: null,
  login: () => {},
  logout: () => {}
});