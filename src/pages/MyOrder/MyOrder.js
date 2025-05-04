import React from "react";
import "./MyOrder.css";

function MyOrder() {
  const data = [
    {
      name: "Ip16 Pro",
      quantity: 1,
      original: 12000000,
      promotion: 0.3,
      promotional: 8000000,
      condition: "Confirmed",
    },
  ];
  return (
    <div className="myorder-container">
      <div className="myorder-top">
        <div className="myorder-top-title">
          <div className="myorder-top-title-avatar">
            {/* <img alt="" src="/image/slideshow/img3.jpg" width={400} /> */}
          </div>
          <div>
            <div className="myorder-top-title-name">NGUYEN NGOC LONG</div>
            <div className="myorder-top-title-phone">0123456789</div>
          </div>
        </div>
        <div className="myorder-top-info">
          <div className="myorder-top-info-sum-order">3 Order</div>
          <div className="myorder-top-info-sum-money">200k Sum Money</div>
        </div>

        <form className="myorder-top-search">
          <select>
            <option>All Orderss</option>
            <option>Order Pending Confirmation</option>
            <option>Confirmed Order</option>
          </select>
          <input placeholder="Order Search..." />
          <button>Search</button>
        </form>
      </div>
      <div className="myorder-content">
        <table className="myorder-table">
          <thead className="myorder-table-thead">
            <tr className="myorder-table-thead-tr">
              <th className="myorder-table-thead-th">Product</th>
              <th className="myorder-table-thead-th">Quantity</th>
              <th className="myorder-table-thead-th">Condition</th>
              <th className="myorder-table-thead-th">OriginalPrice</th>
              <th className="myorder-table-thead-th">Promotion</th>
              <th className="myorder-table-thead-th">PromotionalPrice</th>
              <th className="myorder-table-thead-th">OrderDetail</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr className="myorder-table-thead-tr" key={index}>
                <td className="myorder-table-thead-td">{item.name}</td>
                <td className="myorder-table-thead-td">{item.quantity}</td>
                <td className="myorder-table-thead-td">{item.condition}</td>
                <td className="myorder-table-thead-td">{item.original}</td>
                <td className="myorder-table-thead-td">{item.promotion}</td>
                <td className="myorder-table-thead-td">{item.promotional}</td>
                <td className="myorder-table-thead-td">See Detail</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyOrder;
