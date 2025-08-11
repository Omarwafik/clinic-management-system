import React, { createContext, useContext, useEffect, useState } from 'react';

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

  useEffect(() => {
    const stored = localStorage.getItem('auth_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (_e) {
        // ignore
      }
    }
  }, []);

  const persist = (u) => {
    setUser(u);
    if (u) localStorage.setItem('auth_user', JSON.stringify(u));
    else localStorage.removeItem('auth_user');
  };

  const login = async (email, password) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (String(email).trim() && String(password).trim()) {
      // Determine role based on email domain
      const role = email.endsWith('@clinic.com') || email.endsWith('@doctor.com') ? 'admin' : 'patient';
      const nameFromEmail = String(email).split('@')[0] || (role === 'admin' ? 'Admin' : 'Patient');
      
      persist({
        id: `${role}-${Date.now()}`,
        name: role === 'admin' ? `Dr. ${nameFromEmail}` : nameFromEmail,
        email,
        role,
      });
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const loginAsGuest = () => {
    persist({ id: 'guest', name: 'Guest', email: '', role: 'guest' });
  };

  const logout = () => {
    persist(null);
  };

  const updateAvatar = (avatarUrl) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, avatarUrl };
      localStorage.setItem('auth_user', JSON.stringify(updated));
      return updated;
    });
  };

  const value = { user, login, loginAsGuest, logout, isLoading, updateAvatar };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
