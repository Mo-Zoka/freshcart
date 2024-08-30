import React from "react";
import style from "./Notfound.module.css";
import error from "../../assets/error.svg";

export default function Notfound() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <img className="mt-3" src={error} alt="" />
        <h2 className="text-3xl text-emerald-600 font-semibold mt-8">Page not found</h2>
      </div>
    </>
  );
}
