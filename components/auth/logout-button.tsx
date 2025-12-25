"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("auth_token")
      window.localStorage.removeItem("auth_user")
    }
    router.replace("/login")
  }, [router])

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
      onClick={handleLogout}
    >
      <LogOut className="h-4 w-4" />
      <span className="hidden sm:inline">Logout</span>
      <span className="sm:hidden">Log out</span>
    </Button>
  )
}
