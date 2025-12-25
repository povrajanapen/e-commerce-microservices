"use client"

import { User, Users } from "lucide-react"

interface UserListProps {
  users: any[]
  loading: boolean
}

export default function UserList({ users, loading }: UserListProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Users className="h-5 w-5" />
        Users ({users.length})
      </h2>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">Loading users...</div>
        </div>
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <User className="h-12 w-12 text-muted-foreground/30 mb-3" />
          <p className="text-muted-foreground">No users yet</p>
          <p className="text-sm text-muted-foreground/70">Add your first user to get started</p>
        </div>
      ) : (
        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:border-border hover:bg-background/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">{user.name.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
