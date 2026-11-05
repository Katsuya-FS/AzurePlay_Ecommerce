export type Product = {
  id: string
  sku: string
  name: string
  brand: string
  category: string
  platform: string[]
  price: number
  salePrice: number
  currency: string
  stock: number
  rating: number
  reviewCount: number
  images: string[]
  description: string
  specs: Record<string, string>
  tags: string[]
  isFeatured: boolean
}

export type CartLine = { productId: string; quantity: number }
export type User = { name: string; email: string; password?: string; phone?: string }
export type Order = { id: string; date: string; status: string; total: number; items: CartLine[]; address: string; payment: string }
