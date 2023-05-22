import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Retrieve cart items from localStorage
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);
  }, []);

  useEffect(() => {
    // Update cart items in localStorage whenever cartItems change
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItemToCart = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem._id === item._id
    );
    if (!existingItem) {
      const updatedCartItems = [...cartItems, { ...item, count: 1 }];
      setCartItems(updatedCartItems);
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
