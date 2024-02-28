import { CartContext } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export default function Cart() {
  const { cart, cartAmount, removeCartItem, addCartItem, totalCart } = useContext(CartContext)

  return (
    <div className="w- max-w-7xl px-4 mx-auto">
      <h1 className="font-medium text-2xl text-center my-4"> Meu carrinho </h1>

      {cartAmount === 0 && (
        <div className="flex flex-col justify-center items-center">
          <p className="font-medium">Ops seu carrinho está vazio!</p>
          <Link className="bg-slate-600 my-3 p-1 px-3 text-white dibt-medium rounded" href="/" > Ir para às compras </Link>
        </div>
      )}

      {cart.map(produto => (
        <section className="flex items-center justify-between border-b-2 bprder-gray" key={produto.id}>
          <Image
            className="w-28"
            src={produto.cover}
            alt="logo"
            width={50}
            height={50} />
          <strong> Preço: {produto.price.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}</strong>

          <div className="flex items-center justify-center gap-3">
            <button className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center" onClick={() => removeCartItem(produto)}>
              -
            </button>

            {produto.amount}

            <button className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center" onClick={() => addCartItem(produto)}>
              +
            </button>
          </div>

          <strong className="float-right">Sub total: {produto.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong>
        </section>
      ))
      }
      {cartAmount !== 0 && <p className="font-bold mt-4">Total: {totalCart}</p>}

    </div >
  )
}