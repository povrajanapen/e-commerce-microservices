"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import ProductForm from "@/components/products/product-form"
import ProductList from "@/components/products/product-list"

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://product-service:3002/products")
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddProduct = async (title: string, author: string, price: number) => {
    try {
      const res = await fetch("http://product-service:3002/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, price }),
      })
      const newProduct = await res.json()
      setProducts([...products, newProduct])
    } catch (error) {
      console.error("Failed to create product:", error)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
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
            <ProductList products={products} loading={loading} />
          </div>
        </div>
      </div>
    </main>
  )
}
