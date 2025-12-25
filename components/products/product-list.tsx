"use client"

import { useState } from "react"
import { BookOpen, Package, Pencil, Trash2 } from "lucide-react"

interface ProductListProps {
  products: any[]
  loading: boolean
  onUpdate: (id: string, title: string, author: string, price: number) => void
  onDelete: (id: string) => void
}

export default function ProductList({ products, loading, onUpdate, onDelete }: ProductListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editAuthor, setEditAuthor] = useState("")
  const [editPrice, setEditPrice] = useState("")

  const startEdit = (product: any) => {
    setEditingId(product._id)
    setEditTitle(product.title)
    setEditAuthor(product.author)
    setEditPrice(String(product.price))
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditTitle("")
    setEditAuthor("")
    setEditPrice("")
  }

  const saveEdit = (id: string) => {
    const priceNumber = Number.parseFloat(editPrice)
    if (!editTitle || !editAuthor || Number.isNaN(priceNumber)) return
    onUpdate(id, editTitle, editAuthor, priceNumber)
    cancelEdit()
  }
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
              <div className="flex-1 mr-4">
                {editingId === product._id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-3 py-1 rounded-md border border-border bg-background text-sm"
                    />
                    <input
                      type="text"
                      value={editAuthor}
                      onChange={(e) => setEditAuthor(e.target.value)}
                      className="w-full px-3 py-1 rounded-md border border-border bg-background text-sm"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="w-full px-3 py-1 rounded-md border border-border bg-background text-sm"
                    />
                  </div>
                ) : (
                  <>
                    <h3 className="font-semibold text-foreground">{product.title}</h3>
                    <p className="text-sm text-muted-foreground">{product.author}</p>
                  </>
                )}
              </div>
              <div className="flex items-center gap-3">
                <p className="font-semibold text-accent">
                  ${product.price.toFixed(2)}
                </p>
                {editingId === product._id ? (
                  <>
                    <button
                      type="button"
                      onClick={() => saveEdit(product._id)}
                      className="inline-flex items-center justify-center rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground hover:bg-muted"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="inline-flex items-center justify-center rounded-md border border-border bg-background px-2 py-1 text-xs text-muted-foreground hover:bg-muted"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => startEdit(product)}
                      className="inline-flex items-center justify-center rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground hover:bg-muted"
                    >
                      <Pencil className="mr-1 h-3 w-3" /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(product._id)}
                      className="inline-flex items-center justify-center rounded-md border border-destructive/40 bg-destructive/10 px-2 py-1 text-xs text-destructive hover:bg-destructive/20"
                    >
                      <Trash2 className="mr-1 h-3 w-3" /> Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
