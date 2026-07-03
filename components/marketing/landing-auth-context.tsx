"use client";

import { createContext, useContext, type ReactNode } from "react";

const LandingAuthContext = createContext(false);

export function LandingAuthProvider({
  isAuthenticated,
  children,
}: {
  isAuthenticated: boolean;
  children: ReactNode;
}) {
  return (
    <LandingAuthContext.Provider value={isAuthenticated}>
      {children}
    </LandingAuthContext.Provider>
  );
}

export function useLandingAuth() {
  return useContext(LandingAuthContext);
}
