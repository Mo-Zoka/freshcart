import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [cartId, setCartId] = useState(0);
  const [itemNumber, setItemNumber] = useState(0);
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  async function addProductToCart(productId) {
    try {
      const res = await axios
        .post(
          `https://ecommerce.routemisr.com/api/v1/cart`,
          {
            productId: productId,
          },
          {
            headers,
          }
        );
      return res;
    } catch (error) {
      return error;
    }
  }

  async function getLoggedUserCart() {
    try {
      const res = await axios
        .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
      setCartId(res.data.data._id);
      setItemNumber(res.data.numOfCartItems);
      return res;
    } catch (res_1) {
      return res_1;
    }
  }
  async function updateCartProductQuantity(productId, newCount) {
    try {
      const res = await axios
        .put(
          `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
          { count: newCount },
          { headers }
        );
      return res;
    } catch (res_1) {
      return res_1;
    }
  }

  async function deleteCartItem(productId) {
    try {
      const res = await axios
        .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
          headers,
        });
      return res;
    } catch (res_1) {
      return res_1;
    }
  }

  async function clearCart() {
    try {
      const res = await axios
        .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
      return res;
    } catch (res_1) {
      return res_1;
    }
  }

  async function checkout(cartId, url, formData) {
    try {
      const res = await axios
        .post(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
          {
            shippingAddress: formData,
          },
          { headers }
        );
      return res;
    } catch (res_1) {
      return res_1;
    }
  }

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getLoggedUserCart,
        updateCartProductQuantity,
        deleteCartItem,
        clearCart,
        checkout,
        cartId,
        itemNumber,
        setItemNumber,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
