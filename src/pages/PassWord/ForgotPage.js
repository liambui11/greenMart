import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPage.css"; // Import CSS

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

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

        // try {
        //     const response = await fetch("/api/auth/forgot-password", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({ email }),
        //     });

        //     const data = await response.json();
        //     if (data.success) {
        //         navigate("/password/otp", { state: { email } });
        //     } else {
        //         setErrors({ email: data.message || "Something went wrong!" });
        //     }
        // } catch (err) {
        //     setErrors({ email: "Cannot connect to the server. Please try again." });
        // }
        navigate("/password/otp", { state: { email } });
    };

    return (
        <div className="forgot-password-container">
            <h2 className="forgot-password-title">FORGOT YOUR PASSWORD?</h2>
            <p>Please enter your email so that we can send you an OTP.</p>

            <form onSubmit={handleSubmit} noValidate>
                <label htmlFor="email" className="forgot-password-label">Email</label>
                <input
                    type="email"
                    id="email"
                    className={`forgot-password-input ${errors.email ? "is-invalid" : ""}`}
                    value={email}
                    onChange={handleChange}
                    required
                />
                {errors.email && <p className="error-message">{errors.email}</p>}

                <button type="submit" className="forgot-password-btn">Continue</button>
            </form>
        </div>
    );
}

export default ForgotPassword;
