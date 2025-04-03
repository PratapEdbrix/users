"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button } from "primereact/button";

const ProductDetails = () => {
    const params = useParams();
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const cartItems = useSelector(state => state.cart.cartItems);

    useEffect(() => {
        const fetchProduct = async (id) => {
            try {
                const response = await axios.get(`https://dummyjson.com/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        if (params?.id) fetchProduct(params.id);
    }, [params?.id]);

    if (!product) return <p className="text-center mt-10">Loading...</p>;

    return (
        <>
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
            <div className="max-w-5xl mx-auto p-6 h-[90vh] flex flex-col justify-center">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 shadow-lg rounded-lg bg-white p-6">
                    <div className="relative h-[350px] flex justify-center">
                        <img
                            alt="product"
                            src={product.thumbnail}
                            className="w-full h-full rounded-md object-cover"
                        />
                        <span className="absolute top-0 left-0 bg-[#AC1E1E] text-white text-xs font-bold px-3 py-2 rounded-br-md">
                            -{product.discountPercentage}%
                        </span>
                    </div>
                    <div className="space-y-4 md:pl-8">
                        <h2 className="text-gray-700 font-bold">{product.brand}</h2>
                        <h1 className="text-3xl font-bold">{product.title}</h1>

                        <div className="flex items-center gap-6">
                            <p className="text-2xl font-semibold">${product.price}</p>
                            <p className="inline-block bg-green-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow">
                                {product.rating.toFixed(1)}☆
                            </p>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{product.description}</p>

                        {product.reviews?.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                {product.reviews.map((review, index) => (
                                    <div key={index} className="p-4 bg-white shadow-md rounded-md border border-gray-200">
                                        <p className="text-gray-900">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-center mt-6">
                    <Button
                        label="Continue Shopping"
                        className="px-6 py-3 text-lg bg-purple-950 text-white rounded-md hover:bg-purple-900 "
                        onClick={() => router.push("/products")}
                    />
                </div>
            </div>

        </>
    );
};

export default ProductDetails;
