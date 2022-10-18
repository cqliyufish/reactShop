import { CartItemContainer, ItemDetails } from "./cart-item.styles";
import { CartItem as CartItemO } from "store/cart/cart.types";
import { FC } from "react";

type CartItemProps = {
  cartItem: CartItemO;
};

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <span className="name">{name}</span>
        <span className="name">
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
