import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../actions/auth";
import { useAlert } from "../../Context/AlertContext";
import { useGoogleLogin } from "@react-oauth/google"; 
import GoogleButton from "../../components/Google/googleButton";
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
        error = "Full Name is required";
      } else if (value.length < 3) {
        error = "Full Name must be at least 3 characters";
      }
    }

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!formValues.name) {
      validationErrors.name = "Full Name is required";
    } else if (formValues.name.length < 3) {
      validationErrors.name = "Full Name must be at least 3 characters";
    }

    if (!formValues.email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      validationErrors.email = "Invalid email format";
    }

    if (!formValues.password) {
      validationErrors.password = "Password is required";
    } else if (formValues.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/users/register", {
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
      });

      const data = await response.json();

      if (!response.ok) {
        showAlert("error", data.message || "Registration failed!");
        return;
      }

      const result = await dispatch(
        loginUser(formValues.email, formValues.password, showAlert)
      );

      if (result.success) {
        showAlert("success", "Registration successful! Welcome!");
        navigate("/");

      } else {
        showAlert("error", result.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Registration fetch error:", error);
      showAlert("error", "Server connection error");
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
                {errors.name && <span className="error-message">{errors.name}</span>}
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
                {errors.email && <span className="error-message">{errors.email}</span>}
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
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <button type="submit" className="btn btn-success">
                Sign Up
              </button>

              <div className="register__divider">
                <span className="register__divider-text">or continue with</span>
              </div>
              <div className="register__google-login">
                <GoogleButton onClick={login}/>
              </div>

            </form>
          </div>

          <div className="col-6 register__image-section">
            <img src="/image/login-register/register_img.jpg" alt="Social Login Options" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
