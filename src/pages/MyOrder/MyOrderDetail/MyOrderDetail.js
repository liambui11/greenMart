import React, { useEffect, useState } from "react";
import "./MyOrderDetail.css";
// import axios from "axios";
import axiosInstance from "../../../untils/axiosInstance";
import { MdCancelPresentation } from "react-icons/md";
import { FaAlignJustify } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { fetchOrder, fetchUser } from "../MyOrderAPI";
import { useParams } from "react-router-dom";

function MyOrderDetail() {
  const [orderData, setOrderData] = useState({});
  const [user, setUser] = useState([]);
  const { id } = useParams();

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
        const response = await axiosInstance.get(`/api/v1/orders/${id}`);
        setOrderData(response.data);
        console.log("Test detail API", response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);
  return (
    <div className="myorder-detail">
      <div className="myorder-detail-top">
        <div className="myorder-detail-top-title">INVOICE</div>
        <div className="myorder-detail-top-id">
          <p>Id Order: #{id}</p>
          <p>{orderData.orderStatus}</p>
        </div>
      </div>
      <div className="myorder-detail-info">
        <h2 className="myorder-detail-top-info-bill">Bill To:</h2>
        <div className="myorder-detail-info--bill-content">
          Name: {orderData?.customerInfor?.name}
        </div>
        <div>Phone: {orderData?.customerInfor?.phone}</div>
        <div>Address: {orderData?.customerInfor?.address}</div>
      </div>
      <div className="myorder-detail-table">
        <table className="myorder-detail-table-content">
          <thead>
            <tr className="myorder-detail-table-thread-tr">
              <th className="myorder-detail-table-thread-tr-th">Image</th>
              <th className="myorder-detail-table-thread-tr-th">Name</th>
              <th className="myorder-detail-table-thread-tr-th">Price</th>
              <th className="myorder-detail-table-thread-tr-th">Promotion</th>
              <th className="myorder-detail-table-thread-tr-th">NewPrice</th>
              <th className="myorder-detail-table-thread-tr-th">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orderData?.products?.map((item, index) => {
              const promotion = item.promotion || 0; // nếu có khuyến mãi
              const newPrice = item.productPrice * (1 - promotion);
              return (
                <tr key={index} className="myorder-detail-table-tbody-tr">
                  <td className="myorder-detail-table-tbody-tr-td">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td className="myorder-detail-table-tbody-tr-td">
                    {item.productName}
                  </td>
                  <td className="myorder-detail-table-tbody-tr-td">
                    ${item.productPrice.toFixed(2)}
                  </td>
                  <td className="myorder-detail-table-tbody-tr-td">
                    {promotion > 0 ? `${promotion * 100}%` : "0%"}
                  </td>
                  <td className="myorder-detail-table-tbody-tr-td">
                    ${newPrice.toFixed(2)}
                  </td>
                  <td className="myorder-detail-table-tbody-tr-td">
                    {item.quantity}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyOrderDetail;
