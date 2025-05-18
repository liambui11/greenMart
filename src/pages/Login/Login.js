import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Login.css";
import { Link } from "react-router-dom";
import { loginUser } from "../../actions/auth";
import { useAlert } from "../../Context/AlertContext"; 
import { useGoogleLogin } from '@react-oauth/google';
import GoogleButton from "../../components/Google/googleButton";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { showAlert } = useAlert(); 

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

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
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Invalid email format";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const result = await dispatch(loginUser(email, password, showAlert));
    if (result.success) {
      showAlert("success", "Login successful!");
      navigate("/");
    }
  };

  // google
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { access_token } = tokenResponse;

      try {
        const res = await fetch(`http://localhost:3000/api/v1/users/google-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ access_token }),
          credentials: "include",
        });

        const data = await res.json();
        if (res.ok) {
          dispatch({ type: "LOGIN_SUCCESS", payload: { accessToken: data.accessToken } });
          showAlert("success", "Google login successful!");
          navigate("/");
        } else {
          showAlert("error", data.message || "Google login failed.");
        }
      } catch (error) {
        console.error("Google login error:", error);
        showAlert("error", "Google login failed.");
      }
    },
    onError: () => showAlert("error", "Google login failed."),
    scope: "openid email profile",
  });



  return (
    <div className="login">
      <div className="container">
        <div className="row login__content">
          <div className="col-6 login__image-section">
            <img src="/image/login-register/login_img.jpg" alt="Login Illustration" />
          </div>
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
                <GoogleButton onClick={login}/>

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
