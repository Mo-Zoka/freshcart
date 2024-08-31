import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  let {
    getLoggedUserCart,
    updateCartProductQuantity,
    deleteCartItem,
    clearCart,
    itemNumber,
    setItemNumber,
  } = useContext(CartContext);
  const [CartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  async function getCartItems() {
    let response = await getLoggedUserCart();
    // console.log(response.data);

    if (response.data.status == "success") {
      setCartDetails(response.data.data);
      setPageLoading(false);
    }
  }

  async function updateProduct(id, count) {
    if (count == 0) {
      deleteItem(id);
    } else {
      let response = await updateCartProductQuantity(id, count);
      if (response.data.status == "success") {
        setCartDetails(response.data.data);
        toast.success("Product updated successfully");
      } else {
        toast.error("Failed to update");
      }
    }
  }

  async function deleteItem(id) {
    let response = await deleteCartItem(id);
    if (response.data.status == "success") {
      setCartDetails(response.data.data);
      setItemNumber(itemNumber - 1);
      toast.success("Product deleted successfully");
    } else {
      toast.error("Failed to delete");
    }
  }

  async function clearItems() {
    setLoading(true);
    let response = await clearCart();
    // console.log(response.data.message);

    if (response.data.message == "success") {
      setCartDetails(null);
      setItemNumber(0);
      toast.success("Cart cleared successfully");
      setLoading(false);
    } else {
      toast.error("Failed to clear the cart");
      setLoading(false);
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      {pageLoading ? ( // Show loading
        <div className="loading-screen">
          <i className="fas fa-spinner fa-spin text-4xl text-emerald-600 mb-5"></i>
          <p>Loading your cart...</p>
        </div>
      ) : CartDetails?.products?.length > 0 ? (
        <>
          {" "}
          <h2 className="text-center text-2xl text-emerald-600 font-bold mb-5">
            Total Price: {CartDetails?.totalCartPrice}
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
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {CartDetails?.products.map((product) => (
                  <tr
                    key={product.product.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt="Apple Watch"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateProduct(product.product.id, product.count - 1)
                          }
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <span>{product.count}</span>
                        </div>
                        <button
                          onClick={() =>
                            updateProduct(product.product.id, product.count + 1)
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.price * product.count} EGP
                    </td>
                    <td className="px-6 py-4">
                      <span
                        onClick={() => deleteItem(product.product.id)}
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
          <div className="flex gap-4 my-8 mx-24">
            <Link to={"/checkout"} className="w-full">
              <button className="btn w-1/2">Checkout</button>
            </Link>
            <button onClick={clearItems} className="btn2 w-1/2">
              {loading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Clear cart"
              )}
            </button>
          </div>
        </>
      ) : (
        <h1 className="text-3xl text-red-600 font-bold text-center my-6">
          Cart is empty
        </h1>
      )}
    </>
  );
}
