"use client"

import { ShoppingCart } from "lucide-react"

interface OrderListProps {
  orders: any[]
  users: any[]
  products: any[]
  loading: boolean
}

export default function OrderList({ orders, users, products, loading }: OrderListProps) {
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
              <div className="flex-1">
                <p className="font-semibold text-foreground">
                  {getUserName(order.userId)} ordered{" "}
                  <span className="text-accent">{getProductTitle(order.productId)}</span>
                </p>
                <p className="text-sm text-muted-foreground">Quantity: {order.quantity}</p>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium">
                  Order ID: {order._id?.slice(0, 8)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
