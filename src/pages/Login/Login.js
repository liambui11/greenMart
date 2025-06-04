import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Login.css";
import { Link } from "react-router-dom";
import { loginUser } from "../../actions/auth";
import { useAlert } from "../../Context/AlertContext"; 
import { useGoogleLogin } from '@react-oauth/google';
import GoogleButton from "../../components/Google/googleButton";
import errorCodes from "../../config/message";

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
        error = errorCodes.login.VALIDATION_EMAIL_E001;
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = errorCodes.login.VALIDATION_EMAIL_E002;
      }
    }

    if (name === "password") {
      if (!value) {
        error = errorCodes.login.VALIDATION_PASSWORD_E001;
      } else if (value.length < 6) {
        error = errorCodes.login.VALIDATION_PASSWORD_E002;
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
      validationErrors.email = errorCodes.login.VALIDATION_EMAIL_E001;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = errorCodes.login.VALIDATION_EMAIL_E002;
    }

    if (!password) {
      validationErrors.password = errorCodes.login.VALIDATION_PASSWORD_E001;
    } else if (password.length < 6) {
      validationErrors.password = errorCodes.login.VALIDATION_PASSWORD_E002;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const result = await dispatch(loginUser(email, password, showAlert));
    if (result.success) {
      showAlert("success", errorCodes.login.LOGIN_SUCCESS);
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
          showAlert("success", errorCodes.login.GOOGLE_LOGIN_SUCCESS);
          navigate("/");
        } else {
          showAlert("error", data.message || errorCodes.login.GOOGLE_LOGIN_FAILED);
        }
      } catch (error) {
        console.error("Google login error:", error);
        showAlert("error", errorCodes.login.GOOGLE_LOGIN_FAILED);
      }
    },
    onError: () => showAlert("error", errorCodes.login.GOOGLE_LOGIN_FAILED),
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
