"use client"; 
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import store from './redux/store'
import { Provider } from 'react-redux'
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";


let persistStoreInstance = persistStore(store);
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        >
        <Provider store={store}>
          <PersistGate persistor={persistStoreInstance} loading={null}>
          {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
