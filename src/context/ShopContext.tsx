import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { Storage } from '../lib/storage'
import type { CartLine, User } from '../types'

const ShopContext = createContext<{
  Cart: CartLine[]
  Wishlist: string[]
  User: User | null
  AddToCart: (ProductId: string, Quantity?: number) => void
  ChangeQuantity: (ProductId: string, Quantity: number) => void
  RemoveFromCart: (ProductId: string) => void
  ToggleWishlist: (ProductId: string) => void
  Login: (UserValue: User) => void
  Logout: () => void
  CartCount: number
}>({ Cart: [], Wishlist: [], User: null, AddToCart: () => undefined, ChangeQuantity: () => undefined, RemoveFromCart: () => undefined, ToggleWishlist: () => undefined, Login: () => undefined, Logout: () => undefined, CartCount: 0 })

export function ShopProvider({ children }: { children: ReactNode }) {
  const [Cart, SetCart] = useState<CartLine[]>(() => Storage.Get('azp_cart', []))
  const [Wishlist, SetWishlist] = useState<string[]>(() => Storage.Get('azp_wishlist', []))
  const [User, SetUser] = useState<User | null>(() => Storage.Get<User | null>('azp_user', null))
  const AddToCart = (ProductId: string, Quantity = 1) => SetCart(Current => {
    const Next = Current.some(Line => Line.productId === ProductId) ? Current.map(Line => Line.productId === ProductId ? { ...Line, quantity: Line.quantity + Quantity } : Line) : [...Current, { productId: ProductId, quantity: Quantity }]
    Storage.Set('azp_cart', Next)
    return Next
  })
  const ChangeQuantity = (ProductId: string, Quantity: number) => SetCart(Current => {
    const Next = Quantity < 1 ? Current.filter(Line => Line.productId !== ProductId) : Current.map(Line => Line.productId === ProductId ? { ...Line, quantity: Quantity } : Line)
    Storage.Set('azp_cart', Next)
    return Next
  })
  const RemoveFromCart = (ProductId: string) => ChangeQuantity(ProductId, 0)
  const ToggleWishlist = (ProductId: string) => SetWishlist(Current => {
    const Next = Current.includes(ProductId) ? Current.filter(Id => Id !== ProductId) : [...Current, ProductId]
    Storage.Set('azp_wishlist', Next)
    return Next
  })
  const Login = (UserValue: User) => {
    const Session = { name: UserValue.name, email: UserValue.email, phone: UserValue.phone }
    Storage.Set('azp_user', Session)
    SetUser(Session)
  }
  const Logout = () => { Storage.Remove('azp_user'); SetUser(null) }
  const CartCount = useMemo(() => Cart.reduce((Count, Line) => Count + Line.quantity, 0), [Cart])
  return <ShopContext.Provider value={{ Cart, Wishlist, User, AddToCart, ChangeQuantity, RemoveFromCart, ToggleWishlist, Login, Logout, CartCount }}>{children}</ShopContext.Provider>
}

export const useShop = () => useContext(ShopContext)
