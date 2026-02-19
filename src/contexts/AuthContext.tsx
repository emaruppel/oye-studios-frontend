"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "listener" | "artist";
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("oye_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("oye_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const mockUser: User = {
      id: "user1",
      name: email.split("@")[0],
      email,
      role: email.includes("artist") ? "artist" : "listener",
      avatar: `https://picsum.photos/seed/${email}/100/100`,
      createdAt: new Date().toISOString(),
    };
    setUser(mockUser);
    localStorage.setItem("oye_user", JSON.stringify(mockUser));
    localStorage.setItem("oye_token", "mock_token_123");
    setIsLoading(false);
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const mockUser: User = {
      id: "user_new",
      name: data.name,
      email: data.email,
      role: data.role,
      avatar: `https://picsum.photos/seed/${data.email}/100/100`,
      createdAt: new Date().toISOString(),
    };
    setUser(mockUser);
    localStorage.setItem("oye_user", JSON.stringify(mockUser));
    localStorage.setItem("oye_token", "mock_token_456");
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("oye_user");
    localStorage.removeItem("oye_token");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
