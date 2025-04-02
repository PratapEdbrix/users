"use client"

import './globals.css'


import { PrimeReactProvider } from 'primereact/api';
import { StoreProvider } from './storeProvider';

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