"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { addItem, setProducts } from "./cartSlice";

const Products = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const products = useSelector(state => state.cart.products);
    const cartItems = useSelector(state => state.cart.cartItems);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://dummyjson.com/products");
                dispatch(setProducts(response.data.products));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [dispatch]);
    
    return (
        <div className="bg-white min-h-screen">
            <nav className="bg-blue-600 text-white py-4 px-6 shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1
                        className="text-xl font-bold cursor-pointer"
                        onClick={() => router.push("/products")}
                    >
                        MyShop
                    </h1>
                    <button className="relative flex items-center" onClick={() => router.push("/products/cart")}>
                        <i className="pi pi-shopping-cart text-2xl"></i>
                        <span className="absolute -top-4 -right-4 bg-red-500 text-xs text-white px-2 py-1 rounded-full">
                            {cartItems.length}
                        </span>
                    </button>
                </div>
            </nav>
            <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold text-center text-gray-900">Products</h2>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative" >
                            <div className="relative">
                                <img
                                    alt={product.title}
                                    src={product.thumbnail}
                                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                                    onClick={()=>router.push(`/products/${product.id}`)}
                                />
                                <span className="absolute top-0 left-0 bg-[#AC1E1E] text-white text-xs font-bold px-3 py-2 rounded-br-md">
                                    -{product.discountPercentage}%
                                </span>
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-sm text-black font-bold">{product.title}</h3>
                                    <p className="text-sm font-bold text-black">${product.price}</p>
                                </div>
                                <button
                                    onClick={() => dispatch(addItem(product))}
                                    className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 flex items-center justify-center gap-2"
                                >
                                    <i className="pi pi-shopping-cart text-lg"></i> Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
