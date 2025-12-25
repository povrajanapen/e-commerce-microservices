"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import OrderForm from "@/components/orders/order-form"
import OrderList from "@/components/orders/order-list"

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [ordersRes, usersRes, productsRes] = await Promise.all([
        fetch("http://order-service:3003/orders"),
        fetch("http://user-service:3001/users"),
        fetch("http://product-service:3002/products"),
      ])
      const [ordersData, usersData, productsData] = await Promise.all([
        ordersRes.json(),
        usersRes.json(),
        productsRes.json(),
      ])
      setOrders(ordersData)
      setUsers(usersData)
      setProducts(productsData)
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddOrder = async (userId: string, productId: string, quantity: number) => {
    try {
      const res = await fetch("http://order-service:3003/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId, quantity }),
      })
      if (res.ok) {
        const newOrder = await res.json()
        setOrders([...orders, newOrder])
      }
    } catch (error) {
      console.error("Failed to create order:", error)
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
          <h1 className="text-3xl font-bold text-foreground">Manage Orders</h1>
          <p className="mt-2 text-muted-foreground">Process and track customer orders</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-1">
            <OrderForm users={users} products={products} onSubmit={handleAddOrder} />
          </div>

          {/* Orders List */}
          <div className="lg:col-span-2">
            <OrderList orders={orders} users={users} products={products} loading={loading} />
          </div>
        </div>
      </div>
    </main>
  )
}
