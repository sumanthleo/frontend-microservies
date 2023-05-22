// CartContext.js
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem._id === item._id
    );
    if (!existingItem) {
      const updatedCartItems = [...cartItems, { ...item, count: 1 }];
      setCartItems(updatedCartItems);
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
