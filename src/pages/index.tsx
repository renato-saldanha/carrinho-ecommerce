import { CartContext } from "@/context/CartContext";
import { api } from "@/services/api";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsCartPlus } from 'react-icons/bs'

export interface ProdutoProps {
  id: number
  title: string
  description: string
  price: number
  cover: string
}

export default function Home() {
  const [produtos, setProdutos] = useState<ProdutoProps[]>([])
  const { addCartItem, setSelectedItem } = useContext(CartContext)
  const router = useRouter()


  function handleAddCartItem(produto: ProdutoProps) {
    addCartItem(produto)

    toast.success("Produto adicionado ao carrinho!", {
      style: {
        borderRadius: 10,
        backgroundColor: "#121212",
        color: "#FFF"
      }
    })
  }

  function handleSeeItemDescription(produto: ProdutoProps) {
    setSelectedItem(produto)
    router.push('/itemDescription')
  }

  useEffect(() => {
    async function getProdutos() {
      const response = await api.get("/products")
      setProdutos(response.data)
    }

    getProdutos()
  }, [])

  return (
    <div>
      <main className="w- max-w-7xl px-4 mx-auto">
        <h1 className="font-bold text-2xl mb-4 mt-10 text-center"> Produtos em alta</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-6 lg:grid-cols-5">
          {produtos.map(produto => (
            <section className="w-full" key={produto.id}>
              <Image
                className="w-full rounded-lg max-h-70 mb-2 cursor-pointer transform transition duration-500 hover:scale-110"
                src={produto.cover}
                alt={produto.title}
                width={100}
                height={100}
                onClick={() => handleSeeItemDescription(produto)} />
              <p className="font-medium mt-1 mb-2"> {produto.title} </p>

              <div className="flex gap-3 items-center">
                <strong className="text-zinc-700/90">
                  {produto.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </strong>

                <button className="bg-zinc-900 p-1 rounded hover:bg-white hover:border-1 " onClick={() => handleAddCartItem(produto)}>
                  <BsCartPlus className="text-white hover:text-zinc-900" size={20} />
                </button>
              </div>
            </section>
          ))}
        </div>
      </main>

    </div>
  );
}
