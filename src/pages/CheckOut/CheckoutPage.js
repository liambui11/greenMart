import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cartReducer);

  const [formValues, setFormValues] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    promotion: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    if (name === "fullName") {
      if (!value.trim()) {
        error = "Full name is required";
      } else if (value.length < 3) {
        error = "Full name must be at least 3 characters";
      }
    }

    if (name === "phoneNumber") {
      if (!value.trim()) {
        error = "Phone number is required";
      } else if (!/^\d{9,11}$/.test(value)) {
        error = "Invalid phone number format";
      }
    }

    if (name === "address") {
      if (!value.trim()) {
        error = "Address is required";
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

    validateField("fullName", formValues.fullName);
    validateField("phoneNumber", formValues.phoneNumber);
    validateField("address", formValues.address);

    if (
      !formErrors.fullName &&
      !formErrors.phoneNumber &&
      !formErrors.address
    ) {
      // alert("Order Confirmed!");
      // Gửi thông tin đi đâu đó nếu cần
    }
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.info.productPrice * item.quantity,
      0
    );
  };

  return (
    <div className="container checkout-page">
      <h2 className="checkout-title">Checkout process</h2>
      <p className="checkout-subtitle">
        You have {cart.length} items in your cart
      </p>

      <div className="table-responsive">
        <table className="table table-bordered checkout-table">
          <thead className="table-head">
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.info.productImage}
                    alt={item.info.productName}
                    width="50"
                  />{" "}
                  {item.info.productName}
                </td>
                <td>${item.info.productPrice}</td>
                <td>{item.quantity}</td>
                <td>${item.info.productPrice * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col checkout-summary">
          <p className="checkout-summary__label">
            Subtotal:{" "}
            <span className="checkout-summary__value">
              ${calculateTotal()}
            </span>
          </p>
          <p className="checkout-summary__label">
            Total:{" "}
            <span className="checkout-summary__value">
              ${calculateTotal()}
            </span>
          </p>
        </div>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit} noValidate>
        <p className="checkout-instruction">
          Please enter your information to complete the checkout process.
        </p>

        <div className="row">
          <div className="col-md-6 form-group">
            <label>Full name</label>
            <input
              type="text"
              name="fullName"
              className={`form-control ${
                formErrors.fullName ? "is-invalid" : ""
              }`}
              value={formValues.fullName}
              onChange={handleInputChange}
              required
            />
            {formErrors.fullName && (
              <span className="error-message">{formErrors.fullName}</span>
            )}
          </div>
          <div className="col-md-6 form-group">
            <label>Phone number</label>
            <input
              type="text"
              name="phoneNumber"
              className={`form-control ${
                formErrors.phoneNumber ? "is-invalid" : ""
              }`}
              value={formValues.phoneNumber}
              onChange={handleInputChange}
              required
            />
            {formErrors.phoneNumber && (
              <span className="error-message">{formErrors.phoneNumber}</span>
            )}
          </div>
        </div>

        <div className="mb-3 form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            className={`form-control ${
              formErrors.address ? "is-invalid" : ""
            }`}
            value={formValues.address}
            onChange={handleInputChange}
            required
          />
          {formErrors.address && (
            <span className="error-message">{formErrors.address}</span>
          )}
        </div>

        <div className="row align-items-center">
          <div className="col-md-6">
            <label className="form-label">Payment Method:</label>
            <div className="form-check">
              <input className="form-check-input" type="radio" checked readOnly />
              <label className="form-check-label">Pay on Delivery</label>
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Promotion:</label>
            <input
              type="text"
              name="promotion"
              className="form-control"
              value={formValues.promotion}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="text-center mt-4">
          <button type="submit" className="btn btn-success btn-lg">
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
