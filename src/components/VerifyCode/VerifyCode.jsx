import React, { useContext, useState } from "react";
import style from "./VerifyCode.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function VerifyCode() {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);

  function handleVerifyCode(values) {
    setisLoading(true);
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      )
      .then((res) => {
        setisLoading(false);
        // console.log(res.data.status);
        if (res.data.status == "Success") {
          navigate("/resetpassword");
        }
      })
      .catch((res) => {
        setisLoading(false);
      });
  }

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: handleVerifyCode,
  });

  return (
    <>
      <div className="my-8">
        <h2 className="font-bold text-emerald-600 text-2xl pb-5">
          Enter the code sent to you
        </h2>
        <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.resetCode}
              type="text"
              name="resetCode"
              id="resetCode"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="resetCode"
              className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Code
            </label>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 ">
            <button
              type="submit"
              className="mt-3 text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm md:w-1/4 px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Verify code"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
