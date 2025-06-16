import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../actions/auth";
import { useAlert } from "../../Context/AlertContext";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleButton from "../../components/Google/googleButton";
import errorCodes from "../../config/message";
import "./Register.css";

const RegisterPage = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
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

    if (name === "name") {
      if (!value.trim()) {
        error = errorCodes.register.VALIDATION_NAME_E001;
      } else if (value.length < 3) {
        error = errorCodes.register.VALIDATION_NAME_E002;
      }
    }

    if (name === "email") {
      if (!value) {
        error = errorCodes.register.VALIDATION_EMAIL_E001;
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = errorCodes.register.VALIDATION_EMAIL_E002;
      }
    }

    if (name === "password") {
      if (!value) {
        error = errorCodes.register.VALIDATION_PASSWORD_E001;
      } else if (value.length < 6) {
        error = errorCodes.register.VALIDATION_PASSWORD_E002;
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!formValues.name) {
      validationErrors.name = errorCodes.register.VALIDATION_NAME_E001;
    } else if (formValues.name.length < 3) {
      validationErrors.name = errorCodes.register.VALIDATION_NAME_E002;
    }

    if (!formValues.email) {
      validationErrors.email = errorCodes.register.VALIDATION_EMAIL_E001;
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      validationErrors.email = errorCodes.register.VALIDATION_EMAIL_E002;
    }

    if (!formValues.password) {
      validationErrors.password = errorCodes.register.VALIDATION_PASSWORD_E001;
    } else if (formValues.password.length < 6) {
      validationErrors.password = errorCodes.register.VALIDATION_PASSWORD_E001;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/users/register",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: formValues.name,
            userEmail: formValues.email,
            userPassword: formValues.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        showAlert("error", data.message || errorCodes.register.REGISTER_FAILED);
        return;
      }

      const result = await dispatch(
        loginUser(formValues.email, formValues.password, showAlert)
      );

      if (result.success) {
        showAlert("success", errorCodes.register.REGISTER_SUCCESS);
        navigate("/");
      } else {
        showAlert(
          "error",
          result.message || errorCodes.register.REGISTER_FAILED
        );
      }
    } catch (error) {
      console.error("Registration fetch error:", error);
      showAlert("error", errorCodes.register.SERVER_ERROR);
    }
  };

  // google
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { access_token } = tokenResponse;

      try {
        const res = await fetch(
          `http://localhost:3000/api/v1/users/google-login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ access_token }),
            credentials: "include",
          }
        );

        const data = await res.json();
        if (res.ok) {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { accessToken: data.accessToken },
          });
          showAlert("success", errorCodes.login.GOOGLE_LOGIN_SUCCESS);
          navigate("/");
        } else {
          showAlert(
            "error",
            data.message || errorCodes.login.GOOGLE_LOGIN_FAILED
          );
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
    <div className="register">
      <div className="container">
        <div className="row register__content">
          <div className="col-xl-6 col-lg-6 col-sm-12 register__form-box">
            <h1>Create an Account</h1>
            <p>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className={`form-control register__form-input ${errors.name ? "is-invalid" : ""}`}
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
                />
                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className={`form-control register__form-input ${errors.email ? "is-invalid" : ""}`}
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className={`form-control register__form-input ${errors.password ? "is-invalid" : ""}`}
                  name="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                />
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>

              <button type="submit" className="btn btn-success">
                Sign Up
              </button>

              <div className="register__divider">
                <span className="register__divider-text">or continue with</span>
              </div>
              <div className="register__google-login">
                <GoogleButton onClick={login} />
              </div>
            </form>
          </div>

          <div className="col-6 register__image-section">
            <img
              src="/image/login-register/register_img.jpg"
              alt="Social Login Options"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
