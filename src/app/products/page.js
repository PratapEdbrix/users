"use client";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItems , setProducts } from "../../../lib/features/cartSlice";
import { useRouter } from "next/navigation"; // ✅ Fix: Use `next/navigation` instead of `next/router`
import axios from "axios";
import { Button } from "primereact/button";
import { ToastContainer } from 'react-toastify';
export default function ProductList() {
  
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const products = useSelector((state) => state.cart.products)
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
    <div className="min-h-screen bg-gray-150 p-6 mx-12">
           
       <ToastContainer></ToastContainer>

      <div className="flex justify-around items-center">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Product List
          
        </h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition" 
        onClick={()=>router.push(`/cart`)}>Cart : {cartItems.length}</button>
      </div>

    
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg transition"
              >
                <img
                  src={product.images} 
                  alt={product.title}
                  className="w-full h-60 object-cover rounded-md"
                  onClick={() => router.push(`/products/${product.id}`)}
                />
                <h3 className="text-lg font-semibold mt-3">{product.title}</h3>
                <p className="text-gray-600 mb-3">Price: ${product.price}</p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleAdd(product)} 
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                    Add to Cart
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                    Remove
                  </button>
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
  );
}
