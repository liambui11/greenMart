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
        <div className="myorder-table">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Condition</th>
                <th>OriginalPrice</th>
                <th>Promotion</th>
                <th>PromotionalPrice</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.condition}</td>

                  <td>{item.original}</td>
                  <td>{item.promotion}</td>
                  <td>{item.promotional}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyOrder;
