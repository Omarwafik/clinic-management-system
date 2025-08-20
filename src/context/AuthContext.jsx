import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext(null);
const phoneRegex = /^01[0125][0-9]{8}$/; // أرقام مصرية صحيحة

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Persist user to localStorage
  const persist = useCallback((userData) => {
    setUser(userData);
    if (userData) localStorage.setItem("auth_user", JSON.stringify(userData));
    else localStorage.removeItem("auth_user");
  }, []);

  // Login
// Login
const login = async (email, password) => {
  setIsLoading(true);
  try {
    const { data } = await axios.get("https://clinic-backend-production-9c79.up.railway.app/users");
    const found = data.find(
      u => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!found) {
      return { success: false, errors: { email: "Email does not exist" } };
    }

    // enforce same password rules as register
    if (password.length < 8) {
      return { success: false, errors: { password: "Password must be at least 8 characters" } };
    }

    if (found.password !== password) {
      return { success: false, errors: { password: "Password is incorrect" } };
    }

    const userData = {
      id: found.id,
      name: found.name,
      email: found.email,
      phone: found.phone,
      role: found.role || "patient",
      avatar: found.avatar || null,
    };

    persist(userData);
    return { success: true, role: userData.role };
  } catch (error) {
    console.error("Login failed:", error);
    return { success: false, message: "Login failed" };
  } finally {
    setIsLoading(false);
  }
};

  // Register
  const register = async (name, email, phone, password) => {
    setIsLoading(true);
    if (!phoneRegex.test(phone)) return { success: false, message: "Invalid phone number format" };

    try {
      const { data } = await axios.get("https://clinic-backend-production-9c79.up.railway.app/users");
      if (data.find(u => u.email === email)) return { success: false, message: "Email already registered" };

      const newUser = { name, email, phone, password, role: "patient", avatar: null };
      const created = await axios.post("https://clinic-backend-production-9c79.up.railway.app/users", newUser);

      persist(created.data);
      return { success: true, message: "Registration successful" };
    } catch (error) {
      console.error("Registration failed:", error);
      return { success: false, message: "Registration failed" };
    } finally {
      setIsLoading(false);
    }
  };

  // Login as Guest
  const loginAsGuest = async () => {
    const guestUser = {
      id: "guest",
      name: "Guest User",
      email: "guest@example.com",
      role: "guest",
      avatar: null
    };
    persist(guestUser);
    return { success: true, role: "guest" };
  };

  // Logout
  const logout = () => persist(null);

  // Update avatar
  const updateAvatar = async (dataUrl) => {
    try {
      if (!user) throw new Error("No user logged in");

      const updatedUser = { ...user, avatar: dataUrl };
      await axios.put(`https://clinic-backend-production-9c79.up.railway.app/users/${user.id}`, updatedUser);

      persist(updatedUser);
      return { success: true };
    } catch (error) {
      console.error("Failed to update avatar:", error);
      return { success: false, message: error.message };
    }
  };

  // Remove avatar
  const removeAvatar = async () => {
    try {
      if (!user) throw new Error("No user logged in");

      const updatedUser = { ...user, avatar: null };
      await axios.put(`https://clinic-backend-production-9c79.up.railway.app/users/${user.id}`, updatedUser);

      persist(updatedUser);
      return { success: true };
    } catch (error) {
      console.error("Failed to remove avatar:", error);
      return { success: false, message: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loginAsGuest,
        updateAvatar,
        removeAvatar,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
