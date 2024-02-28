import { FiShoppingCart } from 'react-icons/fi'

import Link from 'next/link'
import { useContext } from 'react'
import { CartContext } from '@/context/CartContext'

export default function Header() {
  const { cartAmount } = useContext(CartContext)

  return (
    <header className="w-full px-1 bg-slate-200">
      <nav className="w-full max-w-7xl h-14 flex items-center justify-between px-5 mx-auto">
        <Link className="font-bold text-2xl" href="/"> Home </Link>
        <Link className="relative" href="/cart">
          <FiShoppingCart className="relative -bottom-1" size={24} color='#121212' />
          {cartAmount > 0 && (
            <span className="absolute -top-3 -right-3 px-2.5 bg-sky-500 rounded-full w-6 h-6 flex items-center justify-center text-white cursor-pointer">
              {cartAmount}
            </span>
          )}
        </Link>

      </nav>
    </header>

  )
}