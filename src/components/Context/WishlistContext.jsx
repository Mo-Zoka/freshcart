import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let WishlistContext = createContext();

export default function WishlistProvider(props) {
  //   const [cartId, setCartId] = useState(0);
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  async function addProductToWishlist(productId) {
    try {
      const res = await axios
        .post(
          `https://ecommerce.routemisr.com/api/v1/wishlist`,
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

  async function getLoggedUserWishlist() {
    try {
      const res = await axios
        .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers });
      return res;
    } catch (res_1) {
      return res_1;
    }
  }

    async function deleteWishlistItem(productId) {
      try {
        const res = await axios
          .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            headers,
          });
        return res;
      } catch (res_1) {
        return res_1;
      }
    }

    // useEffect(() => {
    //   getLoggedUserWishlist();
    // }, []);

  return (
    <WishlistContext.Provider
      value={{ addProductToWishlist, getLoggedUserWishlist, deleteWishlistItem }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
}
