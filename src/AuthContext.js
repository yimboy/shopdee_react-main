import React, { createContext, useContext, useState } from "react";

// ✅ สร้าง Context
const AuthContext = createContext(null);

// ✅ สร้าง Hook `useAuth`
export const useAuth = () => {
  return useContext(AuthContext);
};

// ✅ สร้าง Provider
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
