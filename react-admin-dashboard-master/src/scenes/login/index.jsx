import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import sopraLogo from "./SopraLogo.png"; // Replace "sopraLogo.png" with the path to your Sopra logo image
 
const Login = () => {
  const [error, setError] = useState(""); // Déclaration et initialisation de la variable error
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Votre logique de gestion de la soumission du formulaire
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
              //value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              //value={data.password}
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
        <div className={styles.right}>
          <h1>New Account</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
 
export default Login;
