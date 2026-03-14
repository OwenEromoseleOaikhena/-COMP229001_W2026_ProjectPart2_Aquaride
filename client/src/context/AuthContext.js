// ============================================================
// Student ID: 301475618
// App: AquaRide
// Description: Auth context - manages global login/logout state across app
// ============================================================

import React, { createContext, useState, useContext } from 'react';

// Create the Auth context
const AuthContext = createContext();

// AuthProvider wraps the app and provides user state globally
export const AuthProvider = ({ children }) => {
  // Load user from localStorage on first render (persists login)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('aquaride_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Login: save user and token to state and localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('aquaride_user', JSON.stringify(userData));
  };

  // Logout: clear user state and localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('aquaride_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context easily in any component
export const useAuth = () => useContext(AuthContext);
