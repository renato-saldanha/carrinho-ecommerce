import { CartContext } from "@/context/CartContext"
import Image from "next/image"
import { useContext } from "react"
import { BsCartPlus } from "react-icons/bs"
import { ProdutoProps } from ".."
import { useRouter } from "next/router"

export default function ItemDescription() {
  const { selectedItem,addCartItem } = useContext(CartContext)
  const router = useRouter()

  function handleAddCartItem(selectedItem: ProdutoProps) {
    addCartItem(selectedItem)
    router.push("/")
  }

  return (
    <>
      {selectedItem && (
        <div className="flex mx-60 mt-24">
          <div className="flex-auto  w-64">
            <Image
              className="w-full rounded-lg max-h-72 mb-2 object-contain"
              src={selectedItem.cover}
              alt={selectedItem.title}
              width={50}
              height={50} />
          </div>
          <div className="flex-auto  w-64">
            <h1 className="font-bold text-xl mb-4">{selectedItem.title}</h1>
            <p className="text-justify">{selectedItem.description}</p>
            <div className="flex gap-3 items-center mt-4">
                <strong className="text-zinc-700/90">
                  {selectedItem.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </strong>

                <button className="bg-zinc-900 p-1 rounded hover:bg-white hover:border-1 " onClick={() => handleAddCartItem(selectedItem)}>
                  <BsCartPlus className="text-white hover:text-zinc-900" size={20} />
                </button>
              </div>
          </div>
        </div>
      )}
    </>
  )
}