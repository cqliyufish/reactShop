import "./cart-dropdown.styles.scss";
import { useContext } from "react";
import Button from "components/button/button.component";
import CartItem from "components/cart-item/cart-item.component";

import { CartContext } from "context/cart.context";
const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
