import React, { useEffect, useState } from "react";
import "./MyOrder.css";
// import axios from "axios";
import axiosInstance from "../../untils/axiosInstance";
import { MdCancelPresentation } from "react-icons/md";
import { FaAlignJustify } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { TiCancelOutline } from "react-icons/ti";
import {
  fetchOrder,
  fetchOrderByPriceAscending,
  fetchOrderByPriceDescending,
  fetchUser,
} from "./MyOrderAPI";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function MyOrder() {
  const [orderData, setOrderData] = useState([]);
  const [user, setUser] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("All Orders");
  const [visibleCount, setVisibleCount] = useState(10);
  const navigateOrderDetail = useNavigate();

  const sumPrice = () => {
    let sum = 0;
    orderData.forEach((order) => {
      sum += order.totalOrderAmount;
    });
    return (Math.floor(sum * 100) / 100).toFixed(2);
  };

  const sumProduct = () => {
    let sum = 0;
    orderData.forEach((order) => {
      order.orderItemList.forEach((item) => {
        sum += item.quantity;
      });
    });
    return sum;
  };

  useEffect(() => {
    const userData = async () => {
      const result = await fetchUser();
      setUser(result);
    };
    userData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/orders");
        setOrderData(response.data.info);
        // console.log("APT", response.data.info);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchSortedOrders = async () => {
      try {
        let result = [];
        if (sortOption === "Sort By Price Asc") {
          result = await fetchOrderByPriceAscending(searchQuery);
        } else if (sortOption === "Sort By Price Desc") {
          result = await fetchOrderByPriceDescending(searchQuery);
        } else {
          result = await fetchOrder(searchQuery);
        }
        setOrderData(result);
      } catch (error) {
        console.error("fetchSortedOrders error:", error);
      }
    };

    fetchSortedOrders();
  }, [sortOption, searchQuery]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const result = await fetchOrder(searchQuery);
      setOrderData(result);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  // Test sửa lại
  const [selectedTab, setSelectedTab] = useState("all");

  const filteredOrders = orderData.filter((order) => {
    if (selectedTab === "all") return true;
    return order.orderStatus === selectedTab;
  });

  const handleCancel = async (item) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are canceling this order!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      try {
        console.log("Canceling order ID:", item._id);
        await axiosInstance.patch(`/api/v1/orders/cancel/${item._id}`);
        Swal.fire({
          title: "Canceled!",
          text: "Order canceled successfully.",
          icon: "success",
        });
        const response = await axiosInstance.get("/api/v1/orders");
        setOrderData(response.data.info);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.message || "Failed to cancel the order.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="myorder-container">
      <div className="myorder-top">
        <div className="myorder-top-title">
          <div className="myorder-top-title-avatar">
            <img alt="" src={user.userAvatar} width={400} />
          </div>
          <div>
            <div className="myorder-top-title-name">{user.userName}</div>
            <div className="myorder-top-title-phone">{user.userPhone}</div>
          </div>
        </div>
        <div className="myorder-top-info">
          <div className="myorder-top-info-sum-order">
            {Array.isArray(orderData) ? orderData.length : 0} Order
          </div>

          <div className="myorder-top-info-sum-product">
            {sumProduct()} Product
          </div>

          <div className="myorder-top-info-sum-money">
            ${sumPrice()} Sum Money
          </div>
        </div>

        {/* <form className="myorder-top-search" onSubmit={handleSearch}>
          <input
            placeholder="Order Search..."
            name="productName"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button>Search</button>
        </form> */}
      </div>
      <div className="myorder-content">
        <div className="order-tabs">
          <button
            className={selectedTab === "all" ? "active" : ""}
            onClick={() => setSelectedTab("all")}
          >
            All Order
          </button>
          <button
            className={selectedTab === "success" ? "active" : ""}
            onClick={() => setSelectedTab("success")}
          >
            Success Order
          </button>
          <button
            className={selectedTab === "pending" ? "active" : ""}
            onClick={() => setSelectedTab("pending")}
          >
            Pending Order
          </button>
          <button
            className={selectedTab === "cancel" ? "active" : ""}
            onClick={() => setSelectedTab("cancel")}
          >
            Cancel Order
          </button>
        </div>

        <table className="order-table">
          <thead className="order-table-thread">
            <tr className="order-table-thread-tr">
              <th className="order-table-thread-tr-th">ID ORDER</th>
              <th className="order-table-thread-tr-th">Duration</th>
              <th className="order-table-thread-tr-th">Quantity</th>
              <th className="order-table-thread-tr-th">Status</th>
              <th className="order-table-thread-tr-th">Price</th>
              <th className="order-table-thread-tr-th">Detail</th>
              <th className="order-table-thread-tr-th">Action</th>
            </tr>
          </thead>
          <tbody className="order-table-tbody">
            {filteredOrders.slice(0, visibleCount).map((order, index) => {
              const totalPrice = order.orderItemList.reduce((sum, item) => {
                const discount =
                  (item.productPrice * (item.productDiscountPercentage || 0)) /
                  100;
                return sum + (item.productPrice - discount) * item.quantity;
              }, 0);
              return (
                <tr key={order._id}>
                  <td className="order-table-tbody-tr-td">#{order._id}</td>
                  <td className="order-table-tbody-tr-td">
                    {new Date(order.createdAt).toLocaleString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="order-table-tbody-tr-td">
                    {order.orderItemList.length}
                  </td>
                  <td className="order-table-tbody-tr-td">
                    {order.orderStatus}
                  </td>
                  <td className="order-table-tbody-tr-td">
                    ${totalPrice.toLocaleString("vi-VN")}{" "}
                  </td>
                  <td className="order-table-tbody-tr-td">
                    <FaAlignJustify
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigateOrderDetail(
                          `/myorder/myorderdetail/${order._id}`
                        )
                      }
                    />
                  </td>
                  <td className="order-table-tbody-tr-td">
                    {order.orderStatus === "pending" ? (
                      <MdCancelPresentation
                        style={{ color: "orange" }}
                        onClick={() => handleCancel(order)}
                      />
                    ) : order.orderStatus === "success" ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <TiCancelOutline style={{ color: "red" }} />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {visibleCount < filteredOrders.length && (
          <div className="load-more-container">
            <button onClick={handleLoadMore} className="load-more-button">
              View More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrder;
