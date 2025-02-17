"use client";

import { UserFragment } from "@/graphql/generated";
import { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  user: UserFragment | undefined;
  login: (user: UserFragment) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserFragment | undefined>(undefined);

  const login = (user: UserFragment) => {
    setUser(user);
  };

  const logout = () => {
    setUser(undefined);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
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
