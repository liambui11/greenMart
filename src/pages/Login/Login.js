import React, { useState } from "react";
import "./Login.css";
import loginImage from "../../assets/image/login_img.jpg";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    if (name === "email") {
      if (!value) {
        error = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Invalid email format";
      }
    }

    if (name === "password") {
      if (!value) {
        error = "Password is required";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    
    // Kiểm tra ngay khi nhập
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateField("email", email);
    validateField("password", password);

    if (!errors.email && !errors.password) {
      console.log("Form submitted successfully");
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="row login__content">
          {/* Image Section */}
          <div className="col-6 login__image-section">
            <img src={loginImage} alt="Login Illustration" />
          </div>
          {/* Login Form Section */}
          <div className="col-xl-6 col-lg-6 col-sm-12 login__form-box">
            <h1>Login</h1>
            <p>
              If you don't have an account? <Link to="/register">Create a new account</Link>
            </p>
            <h4>Welcome back.</h4>
            <hr />
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className={`form-control login__form-input ${errors.email ? "is-invalid" : ""}`}
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className={`form-control login__form-input ${errors.password ? "is-invalid" : ""}`}
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="login__form-footer">
                <div className="login__checkbox-group">
                  <input type="checkbox" id="remember-me" />
                  <label htmlFor="remember-me">Remember me</label>
                </div>
                <Link to="/password/forgot">Forgot password?</Link>
              </div>

              <button type="submit" className="btn-submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
