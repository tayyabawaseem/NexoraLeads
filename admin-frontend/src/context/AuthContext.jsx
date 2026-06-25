import React, { createContext, useContext, useState, useCallback } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("adminToken"));
  const [admin, setAdmin] = useState(null);

  const login = useCallback(async (email, password) => {
    const response = await api.post("/admin/login", { email, password });
    const { token: newToken, admin: adminData } = response.data;

    localStorage.setItem("adminToken", newToken);
    setToken(newToken);
    setAdmin(adminData);

    return adminData;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("adminToken");
    setToken(null);
    setAdmin(null);
  }, []);

  const value = {
    token,
    admin,
    isAuthenticated: Boolean(token),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
