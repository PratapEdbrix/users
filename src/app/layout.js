import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "primereact/resources/themes/lara-light-blue/theme.css"; 
import "primereact/resources/primereact.min.css"; 
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import { StoreProvider } from "./StoreProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
        <PrimeReactProvider>
          <main>{children}</main>
        </PrimeReactProvider>
        </StoreProvider>
      </body>
    </html>
  );
}