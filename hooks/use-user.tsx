"use client";

import { UserFragment } from "@/graphql/generated";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface UserContextType {
  user: UserFragment | undefined;
  login: (user: UserFragment) => void;
  logout: () => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserFragment | undefined>(undefined);

  const login = (user: UserFragment) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(undefined);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
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

export function SignedIn({ children }: { children: ReactNode }) {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return <>{children}</>;
}

export function SignedOut({ children }: { children: ReactNode }) {
  const { user } = useUser();

  if (user) {
    return null;
  }

  return <>{children}</>;
}
