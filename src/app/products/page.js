"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { addItems, setProducts } from "../../../lib/feature/cartSlice";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const products = useSelector((state) => state.cart.products);
  const router = useRouter();
  const [skip, setskip] = useState(0);
  const [pages, setpages] = useState([]);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products?skip=${skip}`)
      .then((res) => {
        dispatch(setProducts(res.data.products));
        const pagscount = Math.ceil(res.data.total / res.data.limit);
        setpages(Array.from({ length: pagscount }, (_, index) => index + 1));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, skip]);

  const handleAdd = (product) => {
    dispatch(addItems(product));
  };

  return (
    <PrimeReactProvider>
      <div className="min-h-screen bg-gray-150 p-6 mx-12">
        <div className="flex justify-around items-center my-5">
          <h2 className="text-2xl font-semibold text-center text-gray-800 ">
            Product List
          </h2>
          <Button
            label={`Cart : ${cartItems.length}`}
            onClick={() => router.push(`/cart`)}
          />
        </div>

        <div className="flex justify-center">
          <div className="w-[75%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border-2 border-black rounded-lg p-4 text-center hover:shadow-lg transition"
                >
                  <img
                    src={product.images}
                    alt={product.title}
                    className="w-full h-60 object-cover rounded-md"
                    onClick={() => router.push(`/products/${product.id}`)}
                  />
                  <h3 className="text-lg font-semibold mt-3">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-3">Price: ${product.price}</p>
                  <div className="flex justify-center gap-4">
                    <Button
                      onClick={() => handleAdd(product)}
                      label="Add to Cart"
                      severity="danger"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">Loading products...</p>
            )}
          </div>
        </div>
        <div className=" flex mx-auto my-5 items-center gap-5 w-fit">
          {pages.map((page) => (
            <Button
              severity="help"
              label={page}
              onClick={() => setskip((page - 1) * 30)}
            />
          ))}
        </div>
      </div>
    </PrimeReactProvider>
  );
}
