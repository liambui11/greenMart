import React, { useEffect, useState } from "react";
import "./MyOrder.css";
// import axios from "axios";
import axiosInstance from "../../untils/axiosInstance";
import {
  fetchOrder,
  fetchOrderByPriceAscending,
  fetchOrderByPriceDescending,
} from "./MyOrderAPI";

function MyOrder() {
  const [orderData, setOrderData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("All Orderss");
  const [visibleCount, setVisibleCount] = useState(5);

  const sumPrice = () => {
    let sum = 0;
    orderData.forEach((order) => {
      sum += order.totalOrderAmount;
    });
    return (Math.floor(sum * 100) / 100).toFixed(2);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/orders");
        setOrderData(response.data.info);
        console.log("APT", response.data.info);
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
      // console.log("searchhhhh", searchQuery);
      const result = await fetchOrder(searchQuery);
      // console.log("searchhh", result);
      setOrderData(result);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className="myorder-container">
      <div className="myorder-top">
        <div className="myorder-top-title">
          <div className="myorder-top-title-avatar">
            <img
              alt=""
              src="/image/slideshow/vegetables-basket_1112-413.jpg"
              width={400}
            />
          </div>
          <div>
            <div className="myorder-top-title-name">
              {Array.isArray(orderData) && orderData.length > 0
                ? orderData[0].customerInfor?.name
                : ""}
            </div>
            <div className="myorder-top-title-phone">
              {Array.isArray(orderData) && orderData.length > 0
                ? orderData[0].customerInfor?.phone
                : ""}
            </div>
          </div>
        </div>
        <div className="myorder-top-info">
          <div className="myorder-top-info-sum-order">
            {Array.isArray(orderData) ? orderData.length : 0} Order
          </div>

          <div className="myorder-top-info-sum-money">
            {sumPrice()} Sum Money
          </div>
        </div>

        <form className="myorder-top-search" onSubmit={handleSearch}>
          <input
            placeholder="Order Search..."
            name="productName"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button>Search</button>
        </form>
        <select
          className="sortOrder"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option>All Orders</option>
          <option>Sort By Price Asc</option>
          <option>Sort By Price Desc</option>
        </select>
      </div>
      <div className="myorder-content">
        <table className="myorder-table">
          <thead className="myorder-table-thead">
            <tr className="myorder-table-thead-tr">
              <th className="myorder-table-thead-th">Img</th>
              <th className="myorder-table-thead-th">Product</th>
              <th className="myorder-table-thead-th">Quantity</th>
              <th className="myorder-table-thead-th">Condition</th>
              <th className="myorder-table-thead-th">Duration</th>
              <th className="myorder-table-thead-th">Price</th>
              <th className="myorder-table-thead-th">PriceSum</th>
            </tr>
          </thead>
          <tbody>
            {orderData
              .flatMap((order, index) =>
                order.orderItemList.map((item, idx) => ({
                  order,
                  item,
                  key: `${index}-${idx}`,
                }))
              )
              .slice(0, visibleCount)
              .map(({ order, item, key }) => (
                <tr className="myorder-table-thead-tr" key={key}>
                  <td className="myorder-table-thead-td">
                    <img
                      alt=""
                      src={item?.productID?.productImage}
                      width="50px"
                    />
                  </td>
                  <td className="myorder-table-thead-td">
                    {item?.productID?.productName}
                  </td>
                  <td className="myorder-table-thead-td">{item.quantity}</td>
                  <td className="myorder-table-thead-td">
                    <div className="myorder-table-thead-td-conditon">
                      {order.orderStatus}
                    </div>
                  </td>
                  <td className="myorder-table-thead-td">
                    {new Date(order.createdAt).toLocaleString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>
                  <td className="myorder-table-thead-td">
                    {item.productPrice}
                  </td>

                  <td className="myorder-table-thead-td">
                    {(Math.floor(order.totalOrderAmount * 100) / 100).toFixed(
                      2
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {visibleCount < orderData.flatMap((o) => o.orderItemList).length && (
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
