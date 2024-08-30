import React, { useContext, useEffect, useState } from "react";
import style from "./RecentProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";
import toast from "react-hot-toast";

export default function RecentProducts() {
  // const [products, setProducts] = useState([]);

  // function getProducts() {
  //   axios
  //     .get(`https://ecommerce.routemisr.com/api/v1/products`)
  //     .then((res) => {
  //       setProducts(res.data.data);
  //     })
  //     .catch((res) => {});
  // }

  // useEffect(() => {
  //   getProducts();
  // }, []);

  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  let { addProductToCart, itemNumber, setItemNumber } = useContext(CartContext);
  let { addProductToWishlist } = useContext(WishlistContext);

  async function addToCart(id) {
    setCurrentId(id);
    setLoading(true);
    let response = await addProductToCart(id);
    // console.log(response.data);

    if (response.data.status == "success") {
      toast.success(response.data.message);
      setItemNumber(itemNumber + 1);
      setLoading(false);
    } else {
      toast.error(response.data.message);
      setLoading(false);
    }
  }

  async function addToWishlist(id) {
    let response = await addProductToWishlist(id);
    // console.log(response.data);

    if (response.data.status == "success") {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, isError, error, isLoading, isFetching } = useQuery({
    queryKey: ["recentProduct"],
    queryFn: getProducts,
    staleTime: 15000,
    gcTime: 10000,
  });

  if (isLoading) {
    return (
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    );
  }

  return (
    <>
      <div className="row">
        {data?.data?.data.map((product) => (
          <div
            key={product.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6"
          >
            <div className="product p-1 my-2 mx-2 relative">
              <Link
                to={`/productdetails/${product.id}/${product.category.name}`}
              >
                <img src={product.imageCover} alt="" className="w-full" />
                <h3 className="text-emerald-600 text-start px-1">
                  {product.category.name}
                </h3>
                <h3 className="font-semibold mb-2 text-start px-1">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="flex justify-between p-3">
                  <span>{product.price} EGP</span>
                  <span>
                    {" "}
                    <i className="fas fa-star text-yellow-400" />{" "}
                    {product.ratingsAverage}
                  </span>
                </div>
              </Link>
              <i
                onClick={() => addToWishlist(product.id)}
                className="fa-solid fa-heart cursor-pointer absolute right-2 top-[70%]"
              ></i>
              <button onClick={() => addToCart(product.id)} className="btn ">
                {loading && currentId == product.id ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Add to cart"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
