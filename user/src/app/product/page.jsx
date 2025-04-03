"use client";
import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import axios from "axios";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import { Badge } from "primereact/badge";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import Link from "next/link";

export default function Page() {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    const cartCount = useSelector((state) => state.cart.length || 0);

    useEffect(() => {
        axios.get("https://dummyjson.com/products")
            .then((res) => setData(res.data.products))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    function addProductToCart(cartProduct) {
        const add = {
            id: cartProduct.id,
            title: cartProduct.title,
            image: cartProduct.thumbnail,
            price: cartProduct.price,
            category: cartProduct.category,
            description: cartProduct.description,
            discount: cartProduct.discountPercentage,
            quantity: 1
        };
        dispatch(addToCart(add));
    }

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(8); 

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    return (
        <div className="p-4">
        
            <div className="font-bold text-4xl flex justify-center items-center bg-cyan-600 h-[80px] text-white">
                Product List
            </div>

            
            <div className="flex justify-end mt-6">
                <Link href="/cart">
                    <Button className="p-button-rounded p-button-primary relative">
                        <i className="pi pi-shopping-cart text-xl"></i>
                        {cartCount > 0 && (
                            <Badge value={cartCount} className="absolute top-0 right-0" />
                        )}
                    </Button>
                </Link>
            </div>

           
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {data.slice(first, first + rows).map((product) => (
                    <Card className="shadow-lg p-4" key={product.id}>
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <h1 className="text-lg font-bold mt-2">{product.title}</h1>
                        <p className="text-gray-600 text-sm">{product.description}</p>
                        <p className="text-lg font-bold text-green-600">$ {product.price}</p>

                        <div className="flex gap-3 mt-4">
                            <Link href={`/product/${product.id}`}>
                                <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition">
                                    View Product
                                </button>
                            </Link>
                            <button
                                onClick={() => addProductToCart(product)}
                                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition"
                            >
                                Add To Cart
                            </button>
                        </div>
                    </Card>
                ))}
            </div>

           
            <div className="flex justify-center mt-6">
                <Paginator
                    first={first}
                    rows={rows}
                    totalRecords={data.length}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
}
