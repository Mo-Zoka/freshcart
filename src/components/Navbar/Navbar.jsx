import React, { useContext, useState } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { CartContext } from "../Context/CartContext";

export default function Navbar() {
  let { userLogin, setUserLogin } = useContext(UserContext);
  let navigate = useNavigate();

  let {itemNumber} = useContext(CartContext);

  function signout() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="bg-slate-200 border-gray-200 fixed top-0 left-0 right-0 z-10">
        <div className="flex flex-wrap justify-center md:justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="flex items-center gap-5">
            <Link
              to=""
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src={logo}
                width="120px"
                className="h-8"
                alt="Flowbite Logo"
              />
            </Link>

            {userLogin != null ? (
              <>
                <ul className="flex gap-4">
                  <li>
                    <Link to="">Home</Link>
                  </li>
                  <li>
                    <Link className="relative" to="cart">Cart
                    <div className="absolute top-[-14px] right-[-14px] size-5 bg-emerald-600 text-white rounded-full flex justify-center items-center p-1">{itemNumber}</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="wishlist">Wishlist</Link>
                  </li>
                  <li>
                    <Link to="products">Products</Link>
                  </li>
                  <li>
                    <Link to="categories">Categories</Link>
                  </li>
                  <li>
                    <Link to="brands">Brands</Link>
                  </li>
                </ul>
              </>
            ) : null}
          </div>

          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <div className="icons flex gap-4">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-linkedin"></i>
              <i className="fab fa-youtube"></i>
              <i className="fab fa-tiktok"></i>
              <i className="fab fa-twitter"></i>
            </div>

            <div className="links flex gap-4">
              {userLogin ? (
                <span
                  onClick={signout}
                  to=""
                  className="cursor-pointer text-sm"
                >
                  Sign-Out
                </span>
              ) : (
                <>
                  <Link to="login" className="text-sm">
                    Login
                  </Link>
                  <Link to="register" className="text-sm">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
