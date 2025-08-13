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

/* ===================== إعدادات ===================== */
const SESSION_KEY = 'auth_user';
const USERS_CACHE_KEY = 'users';
// لو عندك .env استخدمي REACT_APP_USERS_URL، وإلا fallback للـ 4004 اللي عندك:
const API_USERS_URL = process.env.REACT_APP_USERS_URL || 'http://localhost:4004/users';

/* ===================== Helpers ===================== */
function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) { return null; }
}
function saveSession(userObj) {
  try {
    if (userObj) localStorage.setItem(SESSION_KEY, JSON.stringify(userObj));
    else localStorage.removeItem(SESSION_KEY);
  } catch (_) {}
}

function loadUsersCache() {
  try {
    const raw = localStorage.getItem(USERS_CACHE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    if (parsed && Array.isArray(parsed.users)) return parsed.users;
    return [];
  } catch (_) { return []; }
}
function saveUsersCache(list) {
  try {
    localStorage.setItem(USERS_CACHE_KEY, JSON.stringify(Array.isArray(list) ? list : []));
  } catch (_) {}
}

async function fetchUsersFromServer() {
  const resp = await axios.get(API_USERS_URL, { headers: { 'Cache-Control': 'no-cache' } });
  const data = resp && resp.data ? resp.data : [];
  return Array.isArray(data) ? data : (data && Array.isArray(data.users) ? data.users : []);
}

function mergeByEmail(serverList, localList) {
  const map = {};
  for (let i = 0; i < serverList.length; i++) {
    const u = serverList[i] || {};
    const k = u.email ? String(u.email).toLowerCase() : '';
    if (k) map[k] = u;
  }
  for (let j = 0; j < localList.length; j++) {
    const u = localList[j] || {};
    const k = u.email ? String(u.email).toLowerCase() : '';
    if (k && !map[k]) map[k] = u;
  }
  return Object.values(map);
}

/* ===================== AuthProvider ===================== */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Start false

  // حمّلي الجلسة من localStorage (بدل ما كنا بنعمل clear)
  useEffect(() => {
    const u = loadSession();
    if (u) setUser(u);
  }, []);

  const persist = useCallback((userData) => {
    setUser(userData);
    try {
      if (userData) {
        const userToStore = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role ? userData.role : 'patient',
          avatar: userData.avatar ? userData.avatar : null
        };
        saveSession(userToStore);
      } else {
        saveSession(null);
      }
    } catch (error) {
      console.error('Error persisting user data:', error);
    }
  }, []);

  /* ============ Avatar APIs ============ */
  const updateAvatar = async (avatarUrl) => {
    if (!user) return { success: false, message: 'No active user' };
    try {
      // PATCH للسيرفر
      await axios.patch(`${API_USERS_URL}/${encodeURIComponent(String(user.id))}`, { avatar: avatarUrl });
    } catch (e) {
      // لو السيرفر مش شغّال هنكمل محلي
      console.warn('updateAvatar server patch failed:', e && e.message ? e.message : e);
    }

    // حدّث الجلسة
    const updatedUser = Object.assign({}, user, { avatar: avatarUrl });
    persist(updatedUser);
    // حدّث الكاش المحلي للمستخدمين
    const cache = loadUsersCache();
    const meEmail = updatedUser.email ? String(updatedUser.email).toLowerCase() : '';
    for (let i = 0; i < cache.length; i++) {
      const u = cache[i] || {};
      const k = u.email ? String(u.email).toLowerCase() : '';
      if (k === meEmail) {
        cache[i] = Object.assign({}, u, { avatar: avatarUrl });
        break;
      }
    }
    saveUsersCache(cache);

    return { success: true };
  };

  const removeAvatar = async () => {
    if (!user) return { success: false, message: 'No active user' };
    try {
      await axios.patch(`${API_USERS_URL}/${encodeURIComponent(String(user.id))}`, { avatar: null });
    } catch (e) {
      console.warn('removeAvatar server patch failed:', e && e.message ? e.message : e);
    }

    const updatedUser = Object.assign({}, user, { avatar: null });
    persist(updatedUser);

    const cache = loadUsersCache();
    const meEmail = updatedUser.email ? String(updatedUser.email).toLowerCase() : '';
    for (let i = 0; i < cache.length; i++) {
      const u = cache[i] || {};
      const k = u.email ? String(u.email).toLowerCase() : '';
      if (k === meEmail) {
        cache[i] = Object.assign({}, u, { avatar: null });
        break;
      }
    }
    saveUsersCache(cache);

    return { success: true };
  };

  /* ============ Auth APIs ============ */
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      let serverUsers = [];
      try {
        serverUsers = await fetchUsersFromServer();
      } catch (e) {
        console.warn('GET /users failed. Falling back to local cache.', e && e.message ? e.message : e);
      }

      const localUsers = loadUsersCache();
      // دمج القوائم علشان لو السيرفر أقدم من الكاش
      let usersList = mergeByEmail(serverUsers, localUsers);
      if (usersList.length === 0) {
        // آخر محاولة: استخدم اللي جاي من السيرفر لو كان موجود
        usersList = serverUsers;
      }
      saveUsersCache(usersList); // مزامنة الكاش

      const inEmail = email ? String(email).toLowerCase() : '';
      const found = usersList.find((u) => {
        const uEmail = u && u.email ? String(u.email).toLowerCase() : '';
        return uEmail === inEmail;
      });

      if (!found) {
        setIsLoading(false);
        return { success: false, code: 'EMAIL_NOT_FOUND', message: 'email is not exist' };
      }

      const storedPwd = found.password ? String(found.password) : '';
      const inputPwd = password ? String(password) : '';
      if (storedPwd !== inputPwd) {
        setIsLoading(false);
        return { success: false, code: 'INVALID_PASSWORD', message: 'password is incorrect' };
      }

      const role = found.role ? found.role : 'patient';
      const userData = {
        id: found.id,
        name: found.name,
        email: found.email,
        role: role,
        avatar: found.avatar ? found.avatar : null
      };

      // Persist لكل الأدوار علشان يفضل مسجّل وهو بيتنقل
      persist(userData);

      setIsLoading(false);
      return {
        success: true,
        role: role,
        redirectTo: role === 'admin' ? '/dashboard' : '/'
      };
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  const loginAsGuest = () => {
    const guestUser = { id: 'guest', name: 'Guest', email: '', role: 'guest', avatar: null };
    // ضيف: ما نعملش persist علشان يخرج بتحديث الصفحة
    setUser(guestUser);
    return { success: true, role: 'guest', redirectTo: '/' };
  };

  const logout = () => {
    persist(null);
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      // اتأكد مفيش يوزر بنفس الإيميل (من السيرفر أو الكاش)
      let serverUsers = [];
      try { serverUsers = await fetchUsersFromServer(); } catch (_) {}
      const localUsers = loadUsersCache();
      const existing = mergeByEmail(serverUsers, localUsers);
      const emailLower = email ? String(email).trim().toLowerCase() : '';
      const exists = existing.some((u) => {
        const uEmail = u && u.email ? String(u.email).toLowerCase() : '';
        return uEmail === emailLower;
      });
      if (exists) {
        setIsLoading(false);
        return { success: false, message: 'Email already registered' };
      }

      const newUser = {
        name: name ? String(name).trim() : '',
        email: email ? String(email).trim() : '',
        password: password ? String(password) : '',
        role: 'patient',
        avatar: null
      };

      // اكتب في data.json عبر json-server
      const response = await axios.post(API_USERS_URL, newUser, { headers: { 'Content-Type': 'application/json' } });
      const saved = response && response.data ? response.data : newUser;
      if (!saved.id) saved.id = String(Date.now());

      // حدّث الكاش المحلي
      const updatedCache = mergeByEmail([saved], existing);
      saveUsersCache(updatedCache);

      setIsLoading(false);
      return { success: true, message: 'Registration successful! Please log in to continue.' };
    } catch (error) {
      console.error('Registration failed:', error);
      setIsLoading(false);
      const msg = (error && error.response && error.response.data && error.response.data.message)
        ? error.response.data.message
        : 'Registration failed. Please try again.';
      return { success: false, message: msg };
    }
  };

  const value = { user, login, loginAsGuest, logout, isLoading, updateAvatar, removeAvatar, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};