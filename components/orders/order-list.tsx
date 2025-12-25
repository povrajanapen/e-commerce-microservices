"use client"

import { useState } from "react"
import { Pencil, ShoppingCart, Trash2 } from "lucide-react"

interface OrderListProps {
  orders: any[]
  users: any[]
  products: any[]
  loading: boolean
  onUpdate: (id: string, userId: string, productId: string, quantity: number) => void
  onDelete: (id: string) => void
}

export default function OrderList({ orders, users, products, loading, onUpdate, onDelete }: OrderListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editUserId, setEditUserId] = useState("")
  const [editProductId, setEditProductId] = useState("")
  const [editQuantity, setEditQuantity] = useState(1)

  const startEdit = (order: any) => {
    setEditingId(order._id)
    setEditUserId(order.userId)
    setEditProductId(order.productId)
    setEditQuantity(order.quantity)
  }

  const cancelEdit = () => {
    setEditingId(null)
  }

  const saveEdit = (id: string) => {
    if (!editUserId || !editProductId || editQuantity < 1) return
    onUpdate(id, editUserId, editProductId, editQuantity)
    setEditingId(null)
  }
  const getUserName = (userId: string) => {
    return users.find((u) => u._id === userId)?.name || "Unknown"
  }

  const getProductTitle = (productId: string) => {
    return products.find((p) => p._id === productId)?.title || "Unknown"
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <ShoppingCart className="h-5 w-5" />
        Orders ({orders.length})
      </h2>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">Loading orders...</div>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <ShoppingCart className="h-12 w-12 text-muted-foreground/30 mb-3" />
          <p className="text-muted-foreground">No orders yet</p>
          <p className="text-sm text-muted-foreground/70">Create your first order to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order._id}
              className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-accent hover:bg-background/50 transition-colors"
            >
              <div className="flex-1 mr-4">
                {editingId === order._id ? (
                  <div className="space-y-2">
                    <select
                      value={editUserId}
                      onChange={(e) => setEditUserId(e.target.value)}
                      className="w-full px-3 py-1 rounded-md border border-border bg-background text-sm"
                    >
                      <option value="">Select customer</option>
                      {users.map((u) => (
                        <option key={u._id} value={u._id}>
                          {u.name}
                        </option>
                      ))}
                    </select>
                    <select
                      value={editProductId}
                      onChange={(e) => setEditProductId(e.target.value)}
                      className="w-full px-3 py-1 rounded-md border border-border bg-background text-sm"
                    >
                      <option value="">Select book</option>
                      {products.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min={1}
                      value={editQuantity}
                      onChange={(e) => setEditQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                      className="w-full px-3 py-1 rounded-md border border-border bg-background text-sm"
                    />
                  </div>
                ) : (
                  <>
                    <p className="font-semibold text-foreground">
                      {getUserName(order.userId)} ordered{" "}
                      <span className="text-accent">{getProductTitle(order.productId)}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">Quantity: {order.quantity}</p>
                  </>
                )}
              </div>
              <div className="flex flex-col items-end gap-2 text-right">
                <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium">
                  Order ID: {order._id?.slice(0, 8)}
                </span>
                {editingId === order._id ? (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => saveEdit(order._id)}
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
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(order)}
                      className="inline-flex items-center justify-center rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground hover:bg-muted"
                    >
                      <Pencil className="mr-1 h-3 w-3" /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(order._id)}
                      className="inline-flex items-center justify-center rounded-md border border-destructive/40 bg-destructive/10 px-2 py-1 text-xs text-destructive hover:bg-destructive/20"
                    >
                      <Trash2 className="mr-1 h-3 w-3" /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
