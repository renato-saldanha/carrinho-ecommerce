import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/header";
import CartProvider from "@/context/CartContext";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Toaster
        position="top-center"
        reverseOrder={false} />
      <Header />
      <Component {...pageProps} />
    </CartProvider>
  );
}
