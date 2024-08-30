import React, { useContext, useEffect, useState } from "react";
import style from "./Wishlist.module.css";
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { WishlistContext } from "../Context/WishlistContext";

export default function Wishlist() {
  let { getLoggedUserWishlist, deleteWishlistItem } =
    useContext(WishlistContext);
  let { addProductToCart } = useContext(CartContext);

  const [wishlist, setWishlist] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  async function getWishlist() {
    let response = await getLoggedUserWishlist();
    // console.log(response.data);

    if (response.data.status == "success") {
      setWishlist(response.data.data);
      setPageLoading(false);
    }
  }

  async function addToCart(id) {
    let response = await addProductToCart(id);
    // console.log(response.data);
    if (response.data.status == "success") {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  async function deleteItem(id) {
    let response = await deleteWishlistItem(id);
    if (response.data.status == "success") {
      getWishlist();
      // console.log(response)
      toast.success("Product deleted successfully");
    } else {
      toast.error("Failed to delete");
    }
  }

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <>
      {pageLoading ? ( // Show loading
        <div className="loading-screen">
          <i className="fas fa-spinner fa-spin text-4xl text-emerald-600 mb-5"></i>
          <p>Loading your wishlist...</p>
        </div>
      ) : wishlist.length > 0 ? (
        <>
          {" "}
          <h2 className="text-center text-2xl text-emerald-600 font-bold mb-5">
            Your wishlist
          </h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Add
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody>
                {wishlist?.map((product) => (
                  <tr
                    key={product._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt="Apple Watch"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.title}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.price} EGP
                    </td>
                    <td className="px-6 py-4">
                      <span
                        onClick={() => {
                          addToCart(product.id);
                          deleteItem(product.id);
                        }}
                        className="cursor-pointer font-medium text-emerald-600 dark:text-emerald-500 hover:underline"
                      >
                        Add to cart
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        onClick={() => deleteItem(product.id)}
                        className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <h1 className="text-3xl text-red-600 font-bold text-center my-6">
          Wishlist is empty
        </h1>
      )}
    </>
  );
}
