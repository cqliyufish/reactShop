import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  //if already exists, increase quantity

  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  //return new array
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToDel) => {
  //find the cart item
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToDel.id
  );
  //if quantity == 1, remove item from cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToDel.id);
  } else {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToDel.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
};

const clearCartItem = (cartItems, cartItemToDel) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToDel.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  //添加item
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  //删除item数量
  const removeItemFromCart = (cartItemToDel) => {
    setCartItems(removeCartItem(cartItems, cartItemToDel));
  };

  //clear item
  const clearItemFromCart = (cartItemToDel) => {
    setCartItems(clearCartItem(cartItems, cartItemToDel));
  };

  // cartItems change, recount the number of items
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  // cartItems change, recount the total
  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
