import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // تنظيف أي جلسة قديمة عند أول تحميل
  useEffect(() => {
    setUser(null);
    localStorage.removeItem('auth_user');
    setIsLoading(false);
  }, []);

  const persist = useCallback((userData) => {
    setUser(userData);
    try {
      if (userData) {
        const userToStore = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role || 'patient',
          avatar: userData.avatar || null
        };
        localStorage.setItem('auth_user', JSON.stringify(userToStore));
      } else {
        localStorage.removeItem('auth_user');
      }
    } catch (error) {
      console.error('Error persisting user data:', error);
    }
  }, []);

  const updateAvatar = async (avatarUrl) => {
    if (!user) return;
    try {
      await axios.patch(`http://localhost:4004/users/${user.id}`, { avatar: avatarUrl });
      const updatedUser = { ...user, avatar: avatarUrl };
      persist(updatedUser);
      return { success: true };
    } catch (error) {
      console.error('Error updating avatar:', error);
      return { success: false, message: 'Failed to update avatar' };
    }
  };

  const removeAvatar = async () => {
    if (!user) return { success: false, message: 'No user logged in' };
    try {
      // Update the user's avatar to null in the database
      await axios.patch(`http://localhost:4004/users/${user.id}`, { avatar: null });

      // Update the local user state
      const updatedUser = { ...user, avatar: null };
      persist(updatedUser);

      return { success: true };
    } catch (error) {
      console.error('Error removing avatar:', error);
      return { success: false, message: 'Failed to remove avatar' };
    }
  };

  // ======= LOGIN برسائل أخطاء ثابتة =======
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:4004/users');
      const found = response.data.find(u => u.email === email);

      if (!found) {
        setIsLoading(false);
        return { success: false, code: 'EMAIL_NOT_FOUND', message: 'email is not exist' };
      }

      if (found.password !== password) {
        setIsLoading(false);
        return { success: false, code: 'INVALID_PASSWORD', message: 'password is incorrect' };
      }

      const userRole = found.role || 'patient';
      const userData = {
        id: found.id,
        name: found.name,
        email: found.email,
        role: userRole,
        avatar: found.avatar
      };

      if (userRole === 'admin') {
        persist(userData); // نحفظ الـ admin
      } else {
        setUser(userData); // غير كده في الذاكرة فقط
      }

      setIsLoading(false);
      return {
        success: true,
        role: userRole,
        redirectTo: userRole === 'admin' ? '/dashboard' : '/'
      };
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
      return { success: false, code: 'LOGIN_FAILED', message: 'Login failed. Please try again.' };
    }
  };

  const loginAsGuest = () => {
    const guestUser = { id: 'guest', name: 'Guest', email: '', role: 'guest' };
    setUser(guestUser);
    return { success: true, role: 'guest', redirectTo: '/' };
  };

  const logout = () => {
    persist(null);
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      const checkResponse = await axios.get('http://localhost:4004/users');
      const existingUser = checkResponse.data.find(u => u.email === email);
      if (existingUser) {
        setIsLoading(false);
        return { success: false, message: 'Email already registered' };
      }

      const newUser = {
        name: name.trim(),
        email: email.trim(),
        password: password,
        role: 'patient'
      };
      const created = await axios.post('http://localhost:4004/users', newUser);
      console.log('New user saved to data.json:', created.data);
      setIsLoading(false);
      return { success: true, message: 'Registration successful! Please log in to continue.' };
    } catch (error) {
      console.error('Registration failed:', error);
      setIsLoading(false);
      return { success: false, message: error.response?.data?.message || 'Registration failed. Please try again.' };
    }
  };

  const value = { user, login, loginAsGuest, logout, isLoading, updateAvatar, removeAvatar, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};