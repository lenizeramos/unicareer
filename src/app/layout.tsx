"use client";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Provider } from "react-redux";
import store from "./context/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <PrimeReactProvider>
        <Provider store={store}>
          <html lang="en">
            <body className="antialiased">{children}</body>
          </html>
        </Provider>
      </PrimeReactProvider>
    </ClerkProvider>
  );
}
