import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  let { id, category } = useParams();
  let { addProductToCart } = useContext(CartContext);

  async function addToCart(id) {
    setCurrentId(id);
    setLoading(true);
    let response = await addProductToCart(id);
    // console.log(response.data);

    if (response.data.status == "success") {
      toast.success(response.data.message);
      setLoading(false);
    } else {
      toast.error(response.data.message);
      setLoading(false);
    }
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplayspeed: 2000,
    arrows: false,
  };

  function getProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function getAllProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((res) => {
      let related = res.data.data.filter(
        (product) => product.category.name == category
      );
      setRelatedProduct(related);
    });
  }

  useEffect(() => {
    getProduct(id);
    getAllProducts();
  }, [id, category]);

  return (
    <>
      <div className="row items-center text-start">
        <div className="w-full md:w-1/4">
          <Slider {...settings} className="">
            {product?.images.map((src) => (
              <img src={src} className="w-full" />
            ))}
          </Slider>
        </div>
        <div className="w-full md:w-3/4 p-3">
          <h3 className="font-semibold capitalize text-2xl">
            {product?.title}
          </h3>
          <h4 className="text-gray-700 my-4">{product?.description}</h4>
          <h4 className="text-green-500 my-4">{product?.category.name}</h4>
          <div className="flex justify-between p-3">
            <span>{product?.price} EGP</span>
            <span>
              {" "}
              <i className="fas fa-star text-yellow-400" />{" "}
              {product?.ratingsAverage}
            </span>
          </div>
          <button onClick={() => addToCart(product.id)} className="btn ">
            {loading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Add to cart"
            )}
          </button>
        </div>
      </div>

      <div className="row">
        {relatedProduct.length > 0 ? (
          relatedProduct.map((product) => (
            <div
              key={product.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6"
            >
              <div className="product p-1 my-2 mx-2">
                <Link
                  to={`/productdetails/${product.id}/${product.category.name}`}
                  onClick={window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })}
                >
                  <img src={product.imageCover} alt="" className="w-full" />
                  <h3 className="text-emerald-600">{product.category.name}</h3>
                  <h3 className="font-semibold mb-2">
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
                <button onClick={() => addToCart(product.id)} className="btn ">
                  {loading && currentId == product.id ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Add to cart"
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
          </div>
        )}
      </div>
    </>
  );
}
