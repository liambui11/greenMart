import { useDispatch } from "react-redux";
import { deleteItem, updateQuantity } from "../../actions/cart"
import { FaRegTrashCan } from "react-icons/fa6";

import "./CartItem.css"

function CartItemMini(props) {
    const {item} = props;
    const dispatch = useDispatch();


    const handleChange = (e) => {
      const newQuantity = Number(e.target.value);
      if (newQuantity > 0) {
          dispatch(updateQuantity(item.id, newQuantity - item.quantity));
      }
    };

    const handleUp = () => {
        dispatch(updateQuantity(item.id));
    }

    const handleDown = () => {
        if(item.quantity > 1) {
            dispatch(updateQuantity(item.id, -1));
        }
    }

    const handleDelete = () => {
        dispatch(deleteItem(item.id));
    }

    return (
        <>
            <div className="cart__item">
                <div className="cart__image">
                  <img src={item.info.productImage} alt={item.info.productName} />
                </div>
                <div className="cart__content">
                  <h4 className="cart__title">
                    {item.info.productName}
                  </h4>
                  <div className="cart__price">
                  {item.info.productPrice}$
                  </div>
                </div>
                <div className="cart__quantity">
                  <button onClick={handleDown}>-</button>
                  <input value={item.quantity} onChange={handleChange} type="number" min="1"/>
                  <button onClick={handleUp}>+</button>
                </div>
                <button className="cart__delete-btn" onClick={handleDelete}><FaRegTrashCan /></button>
            </div>
        </>
    )
}

export default CartItemMini;