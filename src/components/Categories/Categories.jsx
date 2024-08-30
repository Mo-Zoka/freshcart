import React, { useEffect, useState } from "react";
import style from "./Categories.module.css";
import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategories(res.data.data);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {categories.length > 0 ? (
        <div className="row">
          {categories.map((category) => (
            <div key={category.name} className="w-full sm:w-1/2 md:w-1/3">
              <div className="p-1 my-3 mx-3 border border-emerald-600 shadow-emerald-hover">
                <img
                  src={category.image}
                  className="w-full h-[250px] object-cover"
                  alt=""
                />
                <h4 className="mt-3 text-emerald-600 text-2xl">
                  {category.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      )}
    </>
  );
}
