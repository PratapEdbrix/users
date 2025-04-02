"use client";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
export default function Cartlist() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const imageTemplate = (rowData) => {
    return (
      <img
        src={rowData.images}
        alt={rowData.title}
        className="w-16 h-16 rounded-md"
      />
    );
  };

  return (
    <>
      <DataTable value={cartItems} className="px-8 mt-5">
        <Column field="title" header="Product Name"></Column>
        <Column field="price" header="Price"></Column>
        <Column body={imageTemplate} header="image"></Column>
        <Column field="brand" header="brand"></Column>
      </DataTable>
    </>
  );
}
