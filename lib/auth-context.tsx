"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type UserRole = "professional" | "admin" | null;

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  role: UserRole;
  login: (email: string, password: string, role: "professional" | "admin") => Promise<boolean>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  whatsapp: string;
  specialty: string;
  description: string;
  city: string;
  state: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = useCallback(
    async (email: string, password: string, role: "professional" | "admin"): Promise<boolean> => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, role }),
        });
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
          return true;
        }
        return false;
      } catch {
        return false;
      }
    },
    []
  );

  const register = useCallback(
    async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        if (result.success) {
          setUser(result.user);
          return { success: true };
        }
        return { success: false, error: result.error };
      } catch {
        return { success: false, error: "Erro ao registrar" };
      }
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role ?? null,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
