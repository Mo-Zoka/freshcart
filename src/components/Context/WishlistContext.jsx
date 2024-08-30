import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let WishlistContext = createContext();

export default function WishlistProvider(props) {
  //   const [cartId, setCartId] = useState(0);
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addProductToWishlist(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: productId,
        },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((error) => error);
  }

  function getLoggedUserWishlist() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((res) => {
        //   setCartId(res.data.data._id);
        //   setItemNumber(res.data.numOfCartItems);
        // console.log(res);
        return res;
        // res;
      })
      .catch((res) => res);
  }

    function deleteWishlistItem(productId) {
      return axios
        .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
          headers,
        })
        .then((res) => res)
        .catch((res) => res);
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
