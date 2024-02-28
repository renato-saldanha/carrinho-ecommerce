import { ProdutoProps } from "@/pages";
import { createContext, ReactNode, useState } from "react";

interface CartContextData {
  cart: CartProps[]
  cartAmount: number
  addCartItem: (novoProduto: ProdutoProps) => void
  removeCartItem: (produto: CartProps) => void
  totalResultCart: (items: CartProps[]) => void
  totalCart: string
  selectedItem: ProdutoProps | undefined
  setSelectedItem: React.Dispatch<React.SetStateAction<ProdutoProps | undefined>>
}

interface CartProps {
  id: number
  title: string
  description: string
  price: number
  amount: number
  total: number
  cover: string
}

interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartProps[]>([])
  const [total, setTotal] = useState("")
  const [selectedItem, setSelectedItem] = useState<ProdutoProps>()

  function addCartItem(novoProduto: ProdutoProps) {
    const itemIndex = cart.findIndex(p => p.id === novoProduto.id)

    if (itemIndex !== -1) {
      let cartList = cart
      cartList[itemIndex].amount = cartList[itemIndex].amount + 1
      cartList[itemIndex].total = cartList[itemIndex].amount * cartList[itemIndex].price

      setCart(cartList)
      totalResultCart(cartList)
      return
    }

    const data = {
      ...novoProduto,
      amount: 1,
      total: novoProduto.price
    }

    setCart(p => [...p, data])
    totalResultCart([...cart, data])
  }

  function removeCartItem(produto: CartProps) {
    const itemIndex = cart.findIndex(p => p.id === produto.id)

    if (cart[itemIndex].amount === 0) {
      let cartList = cart
      cartList[itemIndex].amount = cart[itemIndex].amount - 1
      cartList[itemIndex].total = cart[itemIndex].amount - cart[itemIndex].price
      setCart(cartList)

      totalResultCart(cartList)
      setCart(cartList)
      return
    }

    const newCartList = cart.filter(p => p.id !== produto.id)
    setCart(newCartList)
  }

  function totalResultCart(items: CartProps[]) {
    let cart = items
    let result = cart.reduce((acc, obj) => { return acc + obj.total }, 0)
    setTotal(result.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }))
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartAmount: cart.length,
        addCartItem,
        removeCartItem,
        totalResultCart,
        totalCart: total,
        selectedItem,
        setSelectedItem
      }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;