"use client"

import './globals.css'


import { PrimeReactProvider } from 'primereact/api';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PrimeReactProvider>
          <main>{children}</main>
        </PrimeReactProvider>
      </body>
    </html>
  );
}