import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./styles.module.css";
import sopraLogo from "./SopraLogo.png"; // Replace "sopraLogo.png" with the path to your Sopra logo image

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState(""); // Déclaration et initialisation de la variable email
  const [password, setPassword] = useState(""); // Déclaration et initialisation de la variable password
  const [error, setError] = useState(""); // Déclaration et initialisation de la variable error
  const navigate = useNavigate(); // Hook pour la navigation

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Logique de validation
    if (email === "recruteurinfo.hr@gmail.com" && password === "1234") {
      // Appel de la fonction onLogin pour mettre à jour l'état de connexion
      onLogin(true);
      // Redirection vers la page d'accueil en cas de succès
      navigate("/");
    } else {
      // Affichage du message d'erreur en cas d'échec
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.login_image_container}></div>
        <div className={styles.left}>
          <img src={sopraLogo} alt="Sopra" className={styles.sopra_logo} />
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <br />
            <h1 style={{ color: "#5e01b5" }}>Login</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign In
            </button>
          </form>
          <Link to="/forgetPassword" className={styles.forget_password_link}>
            Forget Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
