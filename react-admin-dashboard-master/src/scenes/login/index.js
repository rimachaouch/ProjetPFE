import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import sopraLogo from "./SopraLogo.png"; 
 
const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/auth/login";
      const response = await axios.post(url, data);
      console.log( "test",response.data);
      localStorage.setItem("user", JSON.stringify(response.data));

      localStorage.setItem("token", JSON.stringify(response.data));
      console.log( JSON.parse(localStorage.getItem("token")).token);
     window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
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

            <input
              type="email"
              placeholder="Email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign In
            </button>
          </form>
          <Link to="/signup" className={styles.forget_password_link}>
            Créer un compte
          </Link>
        </div>
        
      </div>
    </div>
  );
};
 
export default Login;