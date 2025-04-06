import React, { useState } from "react";
import "./ResetPWPage.css";

const ResetPWPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    if (name === "password") {
      if (!value) {
        error = "Password is required";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters";
      }
    }

    if (name === "confirmPassword") {
      if (!value) {
        error = "Please confirm your password";
      } else if (value !== password) {
        error = "Passwords do not match";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
    
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
  
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      alert("Password reset successful!");
    }
  };
  
  

  return (
    <div className="reset-password">
      <h2 className="reset-password__title">RESET PASSWORD</h2>
      <p className="reset-password__subtitle">Kindly set your password</p>

      <form className="reset-password__form" onSubmit={handleSubmit} noValidate>
        <label className="reset-password__label">New password</label>
        <input
          className={`reset-password__input ${errors.password ? "is-invalid" : ""}`}
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        {errors.password && <span className="error-message">{errors.password}</span>}

        <label className="reset-password__label">Re-enter password</label>
        <input
          className={`reset-password__input ${errors.confirmPassword ? "is-invalid" : ""}`}
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
        />
        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}

        <button className="reset-password__button" type="submit">Confirm</button>
      </form>
    </div>
  );
};

export default ResetPWPage;
