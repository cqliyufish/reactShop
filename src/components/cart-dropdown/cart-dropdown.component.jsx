import "./cart-dropdown.styles.scss";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "components/button/button.component";
import CartItem from "components/cart-item/cart-item.component";

import { CartContext } from "context/cart.context";
const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  //1. import useNavigate from Router
  //2. checkout page跳转
  const navigate = useNavigate();
  // 3. 定义onClick事件函数
  const goToCheckOutHandle = () => {
    navigate("/checkout");
  };
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={goToCheckOutHandle}>CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
