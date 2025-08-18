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
    const { data } = await axios.get("http://localhost:5000/api/users");
    const found = data.find(
      u => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!found) {
      return { success: false, errors: { email: "Email does not exist" } };
    }

    if (password.length < 8) {
      return { success: false, errors: { password: "Password must be at least 8 characters" } };
    }

    if (found.password !== password) {
      return { success: false, errors: { password: "Password is incorrect" } };
    }

    const userData = {
      id: found._id || found.id, // backend بيرجع _id لو mongo
      name: found.name,
      email: found.email,
      phone: found.phone,
      role: found.role || "patient",
      avatar: found.avatar || null,
    };
    console.log("Found user:", found);


    persist(userData);

    // رجّع اليوزر كله بدل بس role
    return { success: true, user: userData };
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
    const { data } = await axios.get("http://localhost:5000/api/users");
    if (data.find(u => u.email === email)) return { success: false, message: "Email already registered" };
    
    const newUser = { name, email, phone, password, role: "patient", avatar: null };
    const { data: created } = await axios.post("http://localhost:5000/api/users", newUser);
    
    const userData = {
      id: created._id || created.id, 
      name: created.name,
      email: created.email,
      phone: created.phone,
      role: created.role || "patient",
      avatar: created.avatar || null,
    };
    
    console.log("Created user:", created);
    persist(userData);
    
    return { success: true, user: userData };
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
  const updateAvatar = (avatarUrl) => {
  if (!user) return { success: false, message: "No user logged in" };

  const updatedUser = { ...user, avatar: avatarUrl };
  persist(updatedUser);
  return { success: true };
};

  // Remove avatar
// AuthContext.jsx
const removeAvatar = async (userId) => {
  try {
    if (!userId) throw new Error("No user logged in");
   
    console.log("Requesting remove-avatar for:", userId); // للتأكد

    const response = await axios.post(
      `http://localhost:5000/api/users/remove-avatar/${userId}`
    );
    if (user) {
      const updatedUser = { ...user, avatar: null };
      persist(updatedUser);
    }
    return { success: true, user: response.data.user };
  } catch (error) {
    console.error("Failed to remove avatar:", error.response?.data || error.message);
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
