import React from "react";
import style from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className="bg-slate-200 w-full absolute left-0 right-0 mx-auto">
      <div className="px-8 py-8 text-start">
        <h2 className="text-xl font-semibold px-10">Get the FeshCart app</h2>
        <p className="text-slate-500 px-10 pb-4">
          We will send you a link, open it on your phone to download the app.
        </p>

        <form className="flex items-center mx-auto px-16">
          <label htmlFor="simple-search" className="sr-only">
            Email
          </label>
          <div className="relative md:w-3/4">
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email"
              required
            />
          </div>
          <button
            type="submit"
            className="md:w-1/4 p-2.5 ms-2 text-sm font-medium text-white bg-emerald-700 rounded-lg border border-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
          >
            Share App Link
            <span className="sr-only">Search</span>
          </button>
        </form>
      </div>
    </footer>
  );
}
