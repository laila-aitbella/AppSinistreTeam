// Sert à gérer l'état d'authentification global dans ton app React. 🎯

import React, { createContext, useContext, useState } from 'react';

// 🎯 Crée un contexte vide pour l'utilisateur
const UserContext = createContext();

// 🧠 Composant Provider global
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 👤 Stocke l'utilisateur connecté

  // 🔐 Fonction appelée lors du login
  const login = (userData) => {
    setUser(userData); // Stocke les infos de l'utilisateur dans le contexte
  };

  // 🔓 Fonction appelée lors du logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// 📦 Hook personnalisé pour accéder facilement au contexte
export const useAuth = () => useContext(UserContext);

// 📤 Export du composant provider
export default AuthProvider;
