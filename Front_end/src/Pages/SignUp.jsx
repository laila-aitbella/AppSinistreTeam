// 🔒 Icône du mot de passe
import { TbLockPassword } from "react-icons/tb";
// 👤 Icône de l'utilisateur
import { FaRegUserCircle } from "react-icons/fa";
// 🧩 Bouton personnalisé
import Button from "../Componnents/Button";
// 🔁 Hook pour gérer l'état interne (cin, password, erreur)
import { useState } from "react";
// 🚀 Permet de naviguer vers une autre page
import { useNavigate } from "react-router-dom";
// 🌐 Pour les appels HTTP vers l’API backend
import axios from "axios";
// 🔐 Accès au contexte utilisateur
import { useAuth } from "../context/authContext";

const SignUp = () => {
  const [cin, setCIN] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Pour stocker l'utilisateur connecté

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        cin,
        password,
      });

      if (response.data.success) {
        // ✅ Stocker l'utilisateur dans le contexte
        login(response.data.user);

        // ✅ (Optionnel) Sauvegarder le token
        localStorage.setItem("token", response.data.token);

        // 🔁 Rediriger selon le rôle
        const role = response.data.user.role;
        if (role === "admin") {
          navigate("/AdminDashboard");
        } else {
          navigate("/UserDashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Erreur serveur");
      }
    }
  };

  return (
    <div className="login-container">
      <h2 className="form-title">Login avec votre compte</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Numéro d'Identité Nationale"
            value={cin}
            onChange={(e) => setCIN(e.target.value)}
            className="input-field"
            required
          />
          <i><FaRegUserCircle fontSize={24} /></i>
        </div>

        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          <i><TbLockPassword fontSize={24} /></i>
        </div>

        <a href="#" className="forgot-pass-link">Mot de passe oublié ?</a>

        <Button text="Log In" />
      </form>

      <p className="signup-text">
        Vous n'avez pas de compte ? <a href="#">Inscrivez-vous</a>
      </p>
    </div>
  );
};

export default SignUp;
