import Image from "next/image";
import "primeicons/primeicons.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import UserCrud from "./UserCrud";

export default function Home() {
  return (
    <PrimeReactProvider>
      <UserCrud />
    </PrimeReactProvider>
  );
}
