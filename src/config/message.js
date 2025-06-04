const errorCodes = {
  login: {
    VALIDATION_EMAIL_E001: "Email is required",
    VALIDATION_EMAIL_E002: "Invalid email format",
    VALIDATION_PASSWORD_E001: "Password is required",
    VALIDATION_PASSWORD_E002: "Password must be at least 6 characters",
    LOGIN_SUCCESS: "Login successful!",
    LOGIN_FAILED: "Login failed. Please check your credentials.",
    GOOGLE_LOGIN_SUCCESS: "Google login successful!",
    GOOGLE_LOGIN_FAILED: "Google login failed.",
  },

  register: {
    VALIDATION_NAME_E001: "Full Name is required",
    VALIDATION_NAME_E002: "Full Name must be at least 3 characters",
    VALIDATION_EMAIL_E001: "Email is required",
    VALIDATION_EMAIL_E002: "Invalid email format",
    VALIDATION_PASSWORD_E001: "Password is required",
    VALIDATION_PASSWORD_E002: "Password must be at least 6 characters",
    REGISTER_SUCCESS: "Registration successful! Welcome!",
    REGISTER_FAILED: "Registration failed!",
    SERVER_ERROR: "Server connection error",
  },
};

export default errorCodes;
