"use client";

import "../globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Provider } from "react-redux";
import store from "../context/store";


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Provider store={store}>
        <main className="flex-grow">{children}</main>
      </Provider>
      <Footer />
    </div>
  );
}
