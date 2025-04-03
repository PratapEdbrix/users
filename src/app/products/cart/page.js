"use client";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { incrementQuantity, decrementQuantity, removeItem } from "../cartSlice";

export default function Cartlist() {
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();
    const router = useRouter();

    const productData = (rowData) => (
        <div className="flex items-center space-x-3">
            <img src={rowData.images} alt={rowData.title} className="w-16 h-16 rounded-md" />
            <p className="text-lg font-semibold">{rowData.title}</p>
        </div>
    );

    const quantityData = (rowData) => (
        <div className="flex items-center space-x-2">
            <Button
                icon="pi pi-minus"
                className="p-button-text p-button-rounded"
                onClick={() => dispatch(decrementQuantity(rowData.id))}
                disabled={rowData.quantity <= 1}
            />
            <span className="text-lg font-semibold">{rowData.quantity}</span>
            <Button
                icon="pi pi-plus"
                className="p-button-text p-button-rounded"
                onClick={() => dispatch(incrementQuantity(rowData.id))}
            />
        </div>
    );

    const subtotalData = (rowData) => `$${(rowData.price * rowData.quantity).toFixed(2)}`;

    const removeData = (rowData) => (
        <Button
            icon="pi pi-trash"
            className="p-button-text p-button-rounded text-red-500 hover:text-red-700"
            onClick={() => dispatch(removeItem(rowData.id))}
        />
    );

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
        
            <div className="px-8 mt-5">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">Cart Products</h2>

                {cartItems.length > 0 ? (
                    <DataTable value={cartItems} className="shadow-md rounded-lg">
                        <Column header="Product" body={productData}></Column>
                        <Column body={quantityData} header="Quantity"></Column>
                        <Column body={subtotalData} header="Subtotal"></Column>
                        <Column body={removeData} header="Remove"></Column>
                    </DataTable>
                ) : (
                    <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
                )}

                <div className="flex justify-center mt-6">
                    <Button
                        label="Continue Shopping"
                        className="px-6 py-3 text-lg bg-purple-950 text-white rounded-md hover:bg-purple-900"
                        onClick={() => router.push("/products")}
                    />
                </div>

            </div>
        </>
    );
}
