"use client";
import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { useParams } from "next/navigation";
import axios from "axios";
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import Link from 'next/link';
import { Badge } from 'primereact/badge';
import { addToCart } from "../../redux/CartSlice";
import { useDispatch, useSelector } from 'react-redux'



function Page() {
    const params = useParams();
    const id = params.product;
    const [singleData, setSingleData] = useState(null);

    // console.log(singleData);
    const dispatch = useDispatch();

    const count = useSelector((state) => {
        // console.log(state.cart);/
        return state.cart
    })

    useEffect(() => {
        axios(`https://dummyjson.com/products/${id}`)
            .then((res) => {
                console.log("Fetched Data:", res.data);
                setSingleData(res.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [id]);


    if (!singleData) {
        return <p className="text-center text-gray-500">Loading product...</p>;
    }

    function addProductToCart(cartProduct) {
            // console.log(cartProduct);
            const add = {
                id: cartProduct.id,
                title: cartProduct.title,
                image: cartProduct.thumbnail,
                price: cartProduct.price,
                category: cartProduct.category,
                description: cartProduct.description,
                discount: cartProduct.discountPercentage,
                quantity: 1
            }
            // console.log(add);
            dispatch(addToCart(add));
    
        }

    return (
        <div>
            <div className='flex justify-end mt-2'>

                <Link href={'/cart'}>
                    <Button className='custombtn'>
                        <i className="pi pi-shopping-cart p-overlay-badge" style={{ fontSize: '2rem' }}>
                            <Badge size="large" value={count.length}></Badge>
                        </i>
                    </Button>
                </Link>
            </div>

            <div className="card flex justify-center mt-6">
                <Card className="shadow-lg p-4">
                    <div className="flex flex-row items-center">
                        <img
                            src={singleData.thumbnail}
                            alt={singleData.title}
                            className="w-[480px] h-[500px] object-cover rounded-lg shadow-md"
                        />
                        <div className="flex flex-col gap-2 justify-center m-18 ">
                            <div className="text-3xl font-bold">
                                <h1>{singleData.title}</h1>
                            </div>
                            <div >
                                <p className="mt-4 text-gray-700">{singleData.description}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-cyan-600"> Price: ${singleData.price}</h3>
                                <h3 className="text-lg font-bold text-gray-800"> Discount: {singleData.discountPercentage} %</h3>

                            </div>
                            <div className="card flex justify-content-center">
                                <Rating value={singleData.rating} cancel={false} />
                            </div>
                            <div >
                                <Button className="custom" onClick={() => addProductToCart(singleData)}>Add To Cart</Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Page;
