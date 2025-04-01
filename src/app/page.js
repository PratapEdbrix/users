import { PrimeReactProvider } from "primereact/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserData from "./UserData";

export default function Home() {
  return (
    <PrimeReactProvider>
      <UserData />
      <ToastContainer position="top-right" autoClose={2000} />
    </PrimeReactProvider>

  );
}
