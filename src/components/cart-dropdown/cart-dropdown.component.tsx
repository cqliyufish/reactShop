import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles";

import { useNavigate } from "react-router-dom";
import Button from "components/button/button.component";
import CartItem from "components/cart-item/cart-item.component";

import { selectCartItems } from "store/cart/cart.selector";
import { useSelector } from "react-redux";
const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  //1. import useNavigate from Router
  //2. checkout page跳转
  const navigate = useNavigate();
  // 3. 定义onClick事件函数
  const goToCheckOutHandle = () => {
    navigate("/checkout");
  };
  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is Empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckOutHandle}>CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
