import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from "../../untils/axiosInstance";
import { useAlert } from "../../Context/AlertContext";
import { checkAuth} from '../../actions/auth';
import "./ResetPWPage.css";

const ResetPWPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showAlert } = useAlert();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (!accessToken) {
        dispatch(checkAuth());
    }
  }, [accessToken, dispatch]);
  

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

  const handleSubmit = async (e) => {
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
      try {
        console.log(password);
        const response = await axiosInstance.post("/api/v1/users/password/reset", { newPassword: password });

        if (response.status === 200) {
          showAlert("success", "Password reset successful!");
          navigate("/");
        } else {
          showAlert("error", response.data.message || "Something went wrong!");
        }
      } catch (err) {
        if (err.response?.data?.message) {
          showAlert("error", err.response.data.message);
        } else {
          showAlert("error", "Server error. Please try again.");
        }
      }
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
