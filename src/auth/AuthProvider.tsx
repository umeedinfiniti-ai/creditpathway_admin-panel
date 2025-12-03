import React from "react";

type Role = "superadmin" | "support";

type User = {
  email: string;
  role: Role;
};

type AuthContextValue = {
  user: User | null;
  login: (email: string, role?: Role, password?: string) => Promise<void>;
  updateProfile: (patch: Partial<User>) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "app-user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const login = async (email: string, role: Role = "superadmin") => {
    // In a real app you'd call your API here and receive the user's role.
    const next: User = { email, role };
    setUser(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };

  const updateProfile = (patch: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const value = React.useMemo(() => ({ user, login, updateProfile, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}

export default AuthProvider;
