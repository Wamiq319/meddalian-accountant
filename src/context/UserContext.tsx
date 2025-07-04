"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "@/types/service";

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    // TODO: Implement login logic
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUser({
        id: "1",
        email,
        name: "Test User",
        orders: [],
      });
      setIsLoading(false);
    }, 1000);
  };

  const logout = () => {
    // TODO: Implement logout logic
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
