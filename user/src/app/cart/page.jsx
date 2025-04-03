"use client";
import React from "react";
import { Card } from 'primereact/card';
import { useSelector ,useDispatch } from "react-redux";
import { removeFromCart } from "../redux/CartSlice";
import { incrementQuantity, decrementQuantity } from "../redux/CartSlice";


function Page() {
    const data = useSelector((state) => state.cart); 
    // console.log(data);

    const dispatch=useDispatch();

    

    return (
        <div>


            <div className="card " >
                {
                    data.map((product) => {
                        return (

                            <Card className="mt-5" >
                                <div className="flex flex-row gap-2.5 " >
                                    <div  >
                                        <img src={product.image} className="w-46 h-36 object-cover rounded-lg shadow-md" />
                                    </div>
                                    <div className="ml-[100px]">
                                        <h1 className="text-xl font-bold text-black" >{product.title}</h1>
                                        <p className="text-lg"> Category : {product.category}</p>
                                        <p className="text-xl font-bold text-cyan-600"> Price : $ {product.price * product.quantity}</p>
                                        <p> Discount : {product.discount * product.quantity}%</p>
                                        <div className="flex flex-row gap-3 mt-5">
                                            <button onClick={()=>dispatch(decrementQuantity(product.id))} className="bg-gray-500 w-[30px] rounded-2xl text-white">-</button>
                                            <span>{product.quantity}</span>
                                            <button onClick={()=>dispatch(incrementQuantity(product.id))} className="bg-gray-500 w-[30px] rounded-2xl text-white">+</button>
                                        </div>
                                        <div className="mt-2">
                                            <button onClick={()=>dispatch(removeFromCart(product.id))} className="text-gray-400 hover:text-red-600 cursor-pointer">Delete </button>
                                        </div>

                                    </div>
                                </div>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Page;
