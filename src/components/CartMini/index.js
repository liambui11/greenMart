import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import CartList from "./CartListMini";
import "./Cart.css";
import { deleteAll } from "../../actions/cart";
// import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaBagShopping } from "react-icons/fa6";
import { useNavigate, useLocation  } from "react-router-dom";


function CartMini() {
  const cart = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const total = cart.reduce((sum, item) => {
    return sum + item.info.productPrice * item.quantity;
    }, 0);

  const totalQuantity = cart.reduce((sum, item) => {
    return sum + item.quantity;
    }, 0);

  const handleDeleteAll = () => {
    dispatch(deleteAll());
  };

  const handleViewCart = () => {
    setIsOpen(false);
    navigate("/cart");
  };

  const handleCartClick = () => {
    if (location.pathname === "/cart" || location.pathname === "/checkout") {
      navigate("/cart");
    } else {
      setIsOpen(true); 
    }
  };

  return (
    <>
      {/* Nút mở giỏ hàng */}
      <button className="cart-button" onClick={handleCartClick}>
        <HiOutlineShoppingBag className="cart-icon" />
        {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
      </button>

      {/* Overlay nền tối khi mở */}
      {isOpen && <div className="offcanvas-backdrop" onClick={() => setIsOpen(false)}></div>}

      {/* Offcanvas giỏ hàng */}
      <div className={`offcanvas ${isOpen ? "show" : ""}`}>
        <div className="offcanvas-header">
          <div><FaBagShopping /> Your Cart</div>
          <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
        </div>
        <div className="offcanvas-body">
          {cart.length > 0 ? (
            <>
              <CartList cart={cart} />
              <div className="cart__footer">
                <div className="cart__total">
                  Total: <span>{total.toFixed(0)}$</span>
                </div>
                <div className="cart__actions">
                  <button onClick={handleDeleteAll} className="btn btn-danger">
                    Clear All
                  </button>
                  <button onClick={handleViewCart} className="btn btn-info">
                    View Cart Details
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p className="empty-cart">🛒 Your cart is empty</p>
          )}
        </div>
      </div>
    </>
  );
}

export default CartMini;
