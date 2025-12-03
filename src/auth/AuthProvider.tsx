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
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      // localStorage not available or JSON parse failed
      return null;
    }
  });

  const login = async (email: string, role: Role = "superadmin") => {
    // In a real app you'd call your API here and receive the user's role.
    const next: User = { email, role };
    setUser(next);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore write errors
      }
    }
  };

  const updateProfile = (patch: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next: User = { ...prev, ...patch };
      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore write errors
        }
      }
      return next;
    });
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore write errors
      }
    }
  };

  const value = React.useMemo(
    () => ({ user, login, updateProfile, logout }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}

export default AuthProvider;
