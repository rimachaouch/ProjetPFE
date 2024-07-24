import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
  const [data, setData] = useState({
    UserName: "",
    choice: "",
    email: "",
    password: "",
    //confirm_password: "",
    selectedImage: null,
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 
  const handleImageChange = (e) => {
    
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/auth/signup";
      const formData = new FormData();
      formData.append("image", data.selectedImage);
      formData.append("username", data.UserName);
      formData.append("role", data.choice);
      formData.append("email", data.email);
      formData.append("password", data.password);
      //formData.append("confirm_password", data.confirm_password);
console.log(data.selectedImage)
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMsg(response.data.message);
      navigate("/login"); // Redirige vers la page de connexion après inscription réussie

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
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Login</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <div className={styles.scrollable_form}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              
              <h1 style={{ color: "#db4059" }}>New Account</h1>

              <div className={styles.image_input_container}>
                
                <div className={styles.input_container}>
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={styles.image_input}
                  />
                </div>
              </div>
 
              <input
                type="text"
                placeholder="UserName"
                name="UserName"
                value={data.UserName}
                onChange={handleChange}
                required
                className={styles.input}
              />
 
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
                className={styles.input}
              />
 
              <select
                name="choice"
                value={data.choice}
                onChange={handleChange}
                required
                className={styles.input}
              >
               <option value="" disabled>Role</option>
                <option value="responsable_rh">Responable RH</option>
                <option value="recruteur">Recruteur</option>
              </select>
 
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
              {msg && <div className={styles.success_msg}>{msg}</div>}
 
           
 
              {error && <div className={styles.error_msg}>{error}</div>}
              {msg && <div className={styles.success_msg}>{msg}</div>}
 
              <button type="submit" className={styles.green_btn}>
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Signup;