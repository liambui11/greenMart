import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import OverlayLoading from "../../components/OverlayLoading/OverlayLoading";
import axios from "axios";
import "./ForgotPage.css"; // Import CSS

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format";
    return "";
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: validateEmail(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);

    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/users/password/forgot`,
        { email }
      );

      if (response.status === 200) {
        navigate("/password/otp", { state: { email } });
      } else {
        setErrors({ email: response.data.message || "Something went wrong!" });
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setErrors({ email: err.response.data.message });
      } else {
        setErrors({ email: "Cannot connect to the server. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2 className="forgot-password-title">FORGOT YOUR PASSWORD?</h2>
      <p>Please enter your email so that we can send you an OTP.</p>

      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="email" className="forgot-password-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          className={`forgot-password-input ${errors.email ? "is-invalid" : ""}`}
          value={email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error-message">{errors.email}</p>}

        <button type="submit" className="forgot-password-btn">
          Continue
        </button>
      </form>

      {isLoading && <OverlayLoading />}
    </div>
  );
}

export default ForgotPassword;
