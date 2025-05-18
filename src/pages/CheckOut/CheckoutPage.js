import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteAll } from "../../actions/cart";
import axiosInstance from "../../untils/axiosInstance";
import Swal from "sweetalert2";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cartReducer.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }

    if (cart.length === 0) {
      navigate("/cart");
    }
  }, [isAuthenticated, cart, navigate]);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const res = await axiosInstance.get("/api/v1/users/detail");
        if (res.data.code === 200) {
          const info = res.data.info;
          setFormValues((prev) => ({
            ...prev,
            fullName: info.userName || "",
            phoneNumber: info.userPhone || "",
            address: info.userAddress || "",
          }));
        }
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    if (isAuthenticated) {
      fetchUserDetail();
    }
  }, [isAuthenticated]);

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
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullNameError = validateField("fullName", formValues.fullName);
    const phoneError = validateField("phoneNumber", formValues.phoneNumber);
    const addressError = validateField("address", formValues.address);

    if (!fullNameError && !phoneError && !addressError) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to confirm your order?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, confirm it!",
        cancelButtonText: "No, cancel",
        customClass: {
          popup: "my-swal-popup",
          title: "my-swal-title",
          content: "my-swal-content",
        },
      });

      if (result.isConfirmed) {
        try {
          const orderData = {
            customerInfor: {
              name: formValues.fullName,
              address: formValues.address,
              phone: formValues.phoneNumber,
            },
            orderItemList: cart.map((item) => ({
              productID: item.productID._id,
              productPrice: item.productID.productPrice,
              productDiscountPercentage:
                item.productID.productDiscountPercentage || 0,
              quantity: Number(item.quantity),
            })),
            orderPaymentMethod: "cod",
            promotionID: formValues.promotion || null,
          };

          console.log("Cart item sample:", orderData);

          const res = await axiosInstance.post("/api/v1/orders", orderData);

          if (res.data.code === 200) {
            Swal.fire({
              title: "Order Confirmed!",
              text: "Thank you for your purchase.",
              icon: "success",
              confirmButtonText: "OK",
              customClass: {
                popup: "my-swal-popup",
                title: "my-swal-title",
                content: "my-swal-content",
              },
            });

            dispatch(deleteAll());
            navigate("/");
          } else {
            Swal.fire({
              title: "Error",
              text:
                res.data.message || "Something went wrong. Please try again.",
              icon: "error",
              customClass: {
                popup: "my-swal-popup",
                title: "my-swal-title",
                content: "my-swal-content",
              },
            });
          }
        } catch (error) {
          console.error("Order submission failed", error);

          const errorMessage =
            error?.response?.data?.message ||
            error.message ||
            "Unable to submit your order. Please try again later.";
        
          Swal.fire({
            title: "Error",
            text: errorMessage,
            icon: "error",
            customClass: {
              popup: "my-swal-popup",
              title: "my-swal-title",
              content: "my-swal-content",
            },
          });
        }
      }
    }
  };

  const formatPrice = (value) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.productID.productPrice;
      const discount = item.productID.productDiscountPercentage || 0;
      const discountedPrice = price * (1 - discount / 100);
      return total + discountedPrice * item.quantity;
    }, 0);
  };

  const totalQuantity = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  return (
    <div className="container checkout-page">
      <h2 className="checkout-title">Checkout process</h2>
      <p className="checkout-subtitle">
        You have {totalQuantity} items in your cart
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
                    src={item.productID.productImage}
                    alt={item.productID.productName}
                    width="50"
                  />{" "}
                  {item.productID.productName}
                </td>
                <td>
                  {formatPrice(
                    item.productID.productPrice *
                      (1 - item.productID.productDiscountPercentage / 100)
                  )}
                </td>
                <td>{item.quantity}</td>
                <td>
                  {formatPrice(
                    item.productID.productPrice *
                      (1 - item.productID.productDiscountPercentage / 100) *
                      item.quantity
                  )}
                </td>
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
              {formatPrice(calculateTotal())}
            </span>
          </p>
          <p className="checkout-summary__label">
            Total:{" "}
            <span className="checkout-summary__value">
              {formatPrice(calculateTotal())}
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
            className={`form-control ${formErrors.address ? "is-invalid" : ""}`}
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
              <input
                className="form-check-input"
                type="radio"
                checked
                readOnly
              />
              <label className="form-check-label">Pay on Delivery</label>
            </div>
          </div>
          {/* <div className="col-md-6">
            <label className="form-label">Promotion:</label>
            <input
              type="text"
              name="promotion"
              className="form-control"
              value={formValues.promotion}
              onChange={handleInputChange}
            />
          </div> */}
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
