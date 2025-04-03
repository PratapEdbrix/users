"use client"; // Ensures this runs only on the client side
 
import { Provider } from "react-redux";
import store from "./products/store";

 
export function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
 