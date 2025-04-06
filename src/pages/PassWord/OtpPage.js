import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OtpPage.css";

const OtpPage = () => {
  const location = useLocation();
  const email = location.state?.email || "your-email@example.com";
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/password/reset");
  };

  return (
    <div className="otp-container">
      <h3 className="otp-title">CHECK YOUR EMAIL</h3>
      <p className="otp-description">
        Please check your email and enter the OTP below
      </p>
      <form className="otp-form" onSubmit={handleSubmit}>
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
            onChange={(e) => setOtp(e.target.value)}
            required
            className="otp-input"
          />
          <span className="otp-resend">Resend OTP</span>
        </div>

        <button type="submit" className="otp-button">
          Confirm & Continue
        </button>
      </form>
    </div>
  );
};

export default OtpPage;
