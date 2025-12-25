"use client"

import Link from "next/link"
import { BookOpen, Users, ShoppingCart, ArrowRight } from "lucide-react"

export default function Home() {
  const features = [
    {
      name: "Manage Users",
      description: "Create and manage customer accounts",
      icon: Users,
      href: "/users",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      name: "Manage Products",
      description: "Browse and add books to your catalog",
      icon: BookOpen,
      href: "/products",
      color: "from-violet-500/20 to-blue-500/20",
    },
    {
      name: "Manage Orders",
      description: "Process and track customer orders",
      icon: ShoppingCart,
      href: "/orders",
      color: "from-cyan-500/20 to-emerald-500/20",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Books Store</h1>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="border-b border-border px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-4 text-center">
            <h2 className="text-4xl font-bold text-foreground text-balance">Microservices Management</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Manage your book store inventory, customers, and orders with our modern, intuitive dashboard
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Link key={feature.href} href={feature.href}>
                  <div className="group relative h-full overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20">
                    {/* Background gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity group-hover:opacity-100`}
                    />

                    {/* Content */}
                    <div className="relative z-10 space-y-3">
                      <div className="inline-flex rounded-lg bg-primary/20 p-3">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{feature.name}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                      <div className="flex items-center gap-2 pt-4 text-primary">
                        <span className="text-sm font-medium">Get started</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center text-sm text-muted-foreground">
          <p>Books Store Microservices Demo · Powered by Next.js</p>
        </div>
      </footer>
    </main>
  )
}
