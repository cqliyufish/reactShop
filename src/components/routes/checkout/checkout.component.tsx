import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles";

import CheckoutItem from "components/checkout-item/checkout-item.component";

import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "store/cart/cart.selector";
import PaymentForm from "components/payment-form/payment-form.component";
const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <Total>Product</Total>
        </HeaderBlock>
        <HeaderBlock>
          <Total>Description</Total>
        </HeaderBlock>
        <HeaderBlock>
          <Total>Quantity</Total>
        </HeaderBlock>
        <HeaderBlock>
          <Total>Price</Total>
        </HeaderBlock>
        <HeaderBlock>
          <Total>Remove</Total>
        </HeaderBlock>
      </CheckoutHeader>

      {cartItems.map((cartItem) => {
        const { id, name, quantity } = cartItem;
        return <CheckoutItem key={id} cartItem={cartItem} />;
      })}
      <Total className="total">Total: ${cartTotal}</Total>
      <PaymentForm />
    </CheckoutContainer>
  );
};
export default Checkout;
