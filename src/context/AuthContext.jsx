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
  const [isLoading, setIsLoading] = useState(false); // Start as false to prevent initial flash

  // Track user state changes
  useEffect(() => {
    console.log('User state changed:', user);
  }, [user]);

  // Clear any existing authentication state on initial load
  useEffect(() => {
    console.log('=== Initial Auth Load ===');
    console.log('Clearing any existing authentication state');
    
    // Clear user state and localStorage
    setUser(null);
    localStorage.removeItem('auth_user');
    
    console.log('Authentication state cleared');
    
    setIsLoading(false);
    console.log('=== End Initial Auth Load ===');
    
    // Cleanup function
    return () => {
      console.log('Auth context unmounting');
    };
  }, []);

  const persist = useCallback((userData) => {
    console.log('Persisting user data:', userData);
    setUser(userData);
    try {
      if (userData) {
        const userToStore = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role || 'patient', // Default to patient if role is not specified
          avatar: userData.avatar || null
        };
        localStorage.setItem('auth_user', JSON.stringify(userToStore));
        console.log('User data saved to localStorage');
      } else {
        localStorage.removeItem('auth_user');
        console.log('User data removed from localStorage');
      }
    } catch (error) {
      console.error('Error persisting user data:', error);
    }
  }, []);

  const updateAvatar = async (avatarUrl) => {
    if (!user) return;
    
    try {
      // Update user data in the backend
      await axios.patch(`http://localhost:4004/users/${user.id}`, {
        avatar: avatarUrl
      });
      
      // Update local user state
      const updatedUser = { ...user, avatar: avatarUrl };
      persist(updatedUser);
      
      return { success: true };
    } catch (error) {
      console.error('Error updating avatar:', error);
      return { success: false, message: 'Failed to update avatar' };
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    console.log('Attempting login with email:', email);
    try {
      // Check if user exists in the database
      const response = await axios.get('http://localhost:4004/users');
      console.log('Fetched users:', response.data);
      
      const user = response.data.find(u => u.email === email);
      console.log('Found user:', user);
      
      if (!user) {
        console.log('Email not found in database');
        setIsLoading(false);
        return { success: false, message: 'Email not exist' };
      }

      // Verify password
      if (user.password !== password) {
        console.log('Incorrect password');
        setIsLoading(false);
        return { success: false, message: 'Incorrect password' };
      }
      
      // Determine user role (admin or patient)
      const userRole = user.role || 'patient';
      
      console.log('Login successful, persisting user:', {
        name: user.name,
        email: user.email,
        role: userRole
      });
      
      // Persist the complete user session data
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: userRole,
        avatar: user.avatar
      };
      
      // Only persist admin users
      if (userRole === 'admin') {
        persist(userData);
      } else {
        // For non-admin users, just set in memory (won't persist after refresh)
        setUser(userData);
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
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  const loginAsGuest = () => {
    const guestUser = { id: 'guest', name: 'Guest', email: '', role: 'guest' };
    setUser(guestUser); // Only set in memory, don't persist
    return { 
      success: true,
      role: 'guest',
      redirectTo: '/'
    };
  };

  const logout = () => {
    persist(null);
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      // Check if user already exists in the database
      const checkResponse = await axios.get('http://localhost:4004/users');
      const existingUser = checkResponse.data.find(user => user.email === email);
      
      if (existingUser) {
        setIsLoading(false);
        return { success: false, message: 'Email already registered' };
      }

      // Create new user object
      const newUser = {
        name: name.trim(),
        email: email.trim(),
        password: password, // In a real app, you should hash the password
        role: 'patient' // Default role for new users
      };

      // Save to JSON Server
      const response = await axios.post('http://localhost:4004/users', newUser);
      console.log('New user saved to data.json:', response.data);
      
      setIsLoading(false);
      return { 
        success: true, 
        message: 'Registration successful! Please log in to continue.'
      };
    } catch (error) {
      console.error('Registration failed:', error);
      setIsLoading(false);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed. Please try again.' 
      };
    }
  };

  const value = { user, login, loginAsGuest, logout, isLoading, updateAvatar, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
