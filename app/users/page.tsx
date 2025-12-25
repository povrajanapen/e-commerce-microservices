"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import UserForm from "@/components/users/user-form"
import UserList from "@/components/users/user-list"

interface User {
  _id: string
  name: string
  email: string
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

  const baseUrl = process.env.NEXT_PUBLIC_USERS_SERVICE_URL

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/users`)
      const data = await res.json()
      setUsers(data)
    } catch (error) {
      console.error("Failed to fetch users:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateUser = async (id: string, name: string, email: string) => {
    try {
      const res = await fetch(`${baseUrl}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      })
      if (!res.ok) return
      const updated = await res.json()
      setUsers(users.map((u: any) => (u._id === id ? updated : u)))
    } catch (error) {
      console.error("Failed to update user:", error)
    }
  }

  const handleDeleteUser = async (id: string) => {
    try {
      const res = await fetch(`${baseUrl}/users/${id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        setUsers(users.filter((u: any) => u._id !== id))
      }
    } catch (error) {
      console.error("Failed to delete user:", error)
    }
  }

  const handleAddUser = async (name: string, email: string) => {
    try {
      const res = await fetch(`${baseUrl}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      })
      const newUser = await res.json()
      setUsers([...users, newUser])
    } catch (error) {
      console.error("Failed to create user:", error)
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
          <h1 className="text-3xl font-bold text-foreground">Manage Users</h1>
          <p className="mt-2 text-muted-foreground">Create and manage customer accounts</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-1">
            <UserForm onSubmit={handleAddUser} />
          </div>

          {/* Users List */}
          <div className="lg:col-span-2">
            <UserList users={users} loading={loading} onUpdate={handleUpdateUser} onDelete={handleDeleteUser} />
          </div>
        </div>
      </div>
    </main>
  )
}
