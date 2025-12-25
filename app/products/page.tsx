"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { LogoutButton } from "@/components/auth/logout-button"
import ProductForm from "@/components/products/product-form"
import ProductList from "@/components/products/product-list"

type Product = {
  _id: string
  title: string
  author: string
  price: number
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  const baseUrl = process.env.NEXT_PUBLIC_PRODUCTS_SERVICE_URL

  const router = useRouter()

  useEffect(() => {
    if (typeof window === "undefined") return
    const token = window.localStorage.getItem("auth_token")
    if (!token) {
      router.replace("/login")
      return
    }

    fetchProducts()
  }, [router])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/products`)
      const data: Product[] = await res.json()
      setProducts(data)
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddProduct = async (title: string, author: string, price: number) => {
    try {
      const res = await fetch(`${baseUrl}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, price }),
      })
      const newProduct: Product = await res.json()
      setProducts((prev) => [...prev, newProduct])
    } catch (error) {
      console.error("Failed to create product:", error)
    }
  }

  const handleUpdateProduct = async (id: string, title: string, author: string, price: number) => {
    try {
      const res = await fetch(`${baseUrl}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, price }),
      })
      if (!res.ok) return
      const updated: Product = await res.json()
      setProducts((prev) => prev.map((p) => (p._id === id ? updated : p)))
    } catch (error) {
      console.error("Failed to update product:", error)
    }
  }

  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await fetch(`${baseUrl}/products/${id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== id))
      }
    } catch (error) {
      console.error("Failed to delete product:", error)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <LogoutButton />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Manage Products</h1>
          <p className="mt-2 text-muted-foreground">Browse and add books to your catalog</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-1">
            <ProductForm onSubmit={handleAddProduct} />
          </div>

          {/* Products List */}
          <div className="lg:col-span-2">
            <ProductList
              products={products}
              loading={loading}
              onUpdate={handleUpdateProduct}
              onDelete={handleDeleteProduct}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
