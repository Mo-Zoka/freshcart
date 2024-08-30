import React, { useEffect, useState } from "react";
import style from "./AllOrders.module.css";
import axios from "axios";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);

  async function getAllOrders() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`).then((res) => {
      console.log(res.data.data);
      setOrders(res.data.data);
    });

    // if (response.data.status == "success") {
    //   setCartDetails(response.data.data);
    //   setPageLoading(false);
    // }
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Date
              </th>
              <th scope="col" class="px-6 py-3">
                payment method
              </th>
              <th scope="col" class="px-6 py-3">
                items
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  key={order._id}
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {order.createdAt}
                </th>
                <td class="px-6 py-4">{order.paymentMethodType}</td>
                <td class="px-6 py-4">{order.cartItems.length}</td>
                <td class="px-6 py-4">${order.totalOrderPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
