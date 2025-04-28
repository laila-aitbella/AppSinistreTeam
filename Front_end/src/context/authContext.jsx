// Sert à gérer l'état d'authentification global dans ton app React. 🎯

import React, { createContext, useContext, useState, useEffect } from 'react';

// 🎯 Crée un contexte vide pour l'utilisateur
const UserContext = createContext();

// 🧠 Composant Provider global
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 👤 Stocke l'utilisateur connecté

  // 🔄 Charger user depuis localStorage au démarrage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // 🔐 Fonction appelée lors du login
  const login = (userData) => {
    setUser(userData); // Stocke dans le state
    localStorage.setItem("user", JSON.stringify(userData)); // 🔥 Et dans le localStorage aussi
  };

  // 🔓 Fonction appelée lors du logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // 🔥 Enlève l'utilisateur
    localStorage.removeItem("token"); // 🔥 Et enlève le token
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
