import React, { useEffect, useState } from "react";
import style from "./Brands.module.css";
import axios from "axios";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function getBrands() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`).then((res) => {
      setBrands(res.data.data);
      //   console.log(res.data.data);
    });
  }

  function getOneBrand(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then((res) => {
        // console.log(res.data.data);
        setSelectedBrand(res.data.data);
        setIsModalOpen(true);
      });
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedBrand(null);
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      {brands.length > 0 ? (
        <>
          <h2 className="my-4 text-emerald-600 text-3xl font-semibold">
            All Brands
          </h2>
          <div className="row">
            {brands.map((brand) => (
              <div
                key={brand._id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 cursor-pointer"
                onClick={() => getOneBrand(brand._id)}
              >
                <div className="p-1 my-3 mx-3 border border-emerald-600 shadow-emerald-hover">
                  <img src={brand.image} className="w-full" alt={brand.name} />
                  <h4 className="mt-2">{brand.name}</h4>
                </div>
              </div>
            ))}
          </div>

          {/* Modal */}
          {isModalOpen && selectedBrand && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="fixed inset-0 bg-black opacity-50"></div>
              <div className="bg-white p-8 rounded-lg shadow-lg z-10 relative">
                <button
                  className="absolute top-2 right-4 text-3xl font-bold"
                  onClick={closeModal}
                >
                  &times;
                </button>
                <img
                  src={selectedBrand.image}
                  className="w-full h-[250px] object-cover mb-4"
                  alt={selectedBrand.name}
                />
                <h2 className="text-emerald-600 text-2xl font-bold">
                  {selectedBrand.name}
                </h2>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      )}
    </>
  );
}
