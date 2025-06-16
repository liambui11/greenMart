import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useAlert } from "../../Context/AlertContext";
import "./OtpPage.css";

const OtpPage = () => {
  const location = useLocation();
  const email = location.state?.email || "your-email@example.com";
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      setErrors({ otp: "OTP is required" });
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/users/password/otp`,
        { email, otp },
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate("/password/reset");
      } else {
        setErrors({ otp: response.data.message || "OTP verification failed" });
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setErrors({ otp: err.response.data.message });
      } else {
        setErrors({ otp: "Server error. Please try again later." });
      }
    }
  };

  const handleChange = (e) => {
    setOtp(e.target.value);
    setErrors({ ...errors, otp: "" });
  };

  const handleResendOTP = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/users/password/forgot`,
        { email }
      );

      if (response.status === 200) {
        showAlert("success", "OTP has been resent to your email.");
      } else {
        showAlert(
          "error",
          response.data.message || "Something went wrong while resending OTP."
        );
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        showAlert("error", err.response.data.message);
      } else {
        showAlert("error", "Cannot connect to the server. Please try again.");
      }
    }
  };

  return (
    <div className="otp-container">
      <h3 className="otp-title">CHECK YOUR EMAIL</h3>
      <p className="otp-description">
        Please check your email and enter the OTP below
      </p>
      <form className="otp-form" onSubmit={handleSubmit} noValidate>
        <label className="otp-label">Email</label>
        <input
          type="email"
          value={email}
          disabled
          className="otp-input otp-email"
        />

        <label className="otp-label">OTP</label>
        <div className="otp-input-container">
          <input
            type="text"
            value={otp}
            onChange={handleChange}
            required
            className={`otp-input ${errors.otp ? "is-invalid" : ""}`}
          />
          <span
            className="otp-resend"
            onClick={handleResendOTP}
            style={{ cursor: "pointer" }}
          >
            Resend OTP
          </span>
        </div>
        {errors.otp && <p className="error-message">{errors.otp}</p>}

        <button type="submit" className="otp-button">
          Confirm & Continue
        </button>
      </form>
    </div>
  );
};

export default OtpPage;
