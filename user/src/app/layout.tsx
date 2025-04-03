"use client"; 
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import store from './redux/store'
import { Provider } from 'react-redux'


// let findData = state.find((item) => item.id === action.payload.id)
//       if (findData) {
//           findData.quantity += 1
//       } else {

//           state.push(action.payload)
//       }

//     }

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
          {children}
        </Provider>
      </body>
    </html>
  );
}
