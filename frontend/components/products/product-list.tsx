"use client"

import { BookOpen, Package } from "lucide-react"

interface ProductListProps {
  products: any[]
  loading: boolean
}

export default function ProductList({ products, loading }: ProductListProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Package className="h-5 w-5" />
        Books ({products.length})
      </h2>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">Loading products...</div>
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground/30 mb-3" />
          <p className="text-muted-foreground">No books in catalog</p>
          <p className="text-sm text-muted-foreground/70">Add your first book to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-accent hover:bg-background/50 transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{product.title}</h3>
                <p className="text-sm text-muted-foreground">{product.author}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-accent">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
