"use client";
import { addItems } from "../../../../lib/features/cartSlice";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation"; // ✅ Correct way to get params in Next.js 13+
import { useDispatch } from "react-redux";
export default function ProductDetails() {
    const { id } = useParams();
    const products = useSelector((state) => state.cart.products);
    const dispatch = useDispatch();

    const Id = parseInt(id); 
    const product = products.find((p) => p.id === Id); 

    console.log("Selected Product:", product); 

      const handleAdd = (product) => {
        dispatch(addItems(product));
      };

    return (
        <div className="min-h-screen flex items-center justify-center">
            {product ? (
                <div className="bg-white shadow-md rounded-lg p-6">
                  <img src={product.images} alt={product.title} className="w-60 h-60 object-cover mt-4"/>
                  <h1 className="text-2xl font-bold">{product.title}</h1>
                  <p className="text-gray-700">Price: ${product.price}</p>
                  <button
                    onClick={() => handleAdd(product)} 
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                    Add to Cart
                  </button>
                </div>
            ) : (
                <h1 className="text-red-500 text-2xl">Product Not Available</h1>
            )}
        </div>
    );
}
