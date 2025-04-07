import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});

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
      if (!value.trim()) {
        error = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Invalid email format";
      }
    }

    if (name === "password") {
      if (!value.trim()) {
        error = "Password is required";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters";
      }
    }

    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateField("name", formValues.name);
    validateField("email", formValues.email);
    validateField("password", formValues.password);

    if (!formErrors.name && !formErrors.email && !formErrors.password) {
      console.log("Form submitted successfully!");
    }
  };

  return (
    <div className="register">
      <div className="container">
        <div className="row register__content">
          <div className="col-xl-6 col-lg-6 col-sm-12 register__form-box">
            <h1>Create an Account</h1>
            <p>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className={`form-control register__form-input ${formErrors.name ? "is-invalid" : ""}`}
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
                />
                {formErrors.name && <span className="error-message">{formErrors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className={`form-control register__form-input ${formErrors.email ? "is-invalid" : ""}`}
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                />
                {formErrors.email && <span className="error-message">{formErrors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className={`form-control register__form-input ${formErrors.password ? "is-invalid" : ""}`}
                  name="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                />
                {formErrors.password && <span className="error-message">{formErrors.password}</span>}
              </div>

              <button type="submit" className="btn btn-success">
                Sign Up
              </button>
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
