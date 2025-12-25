"use client"

import { useState } from "react"
import { Pencil, Trash2, User, Users } from "lucide-react"

interface UserListProps {
  users: any[]
  loading: boolean
  onUpdate: (id: string, name: string, email: string) => void
  onDelete: (id: string) => void
}

export default function UserList({ users, loading, onUpdate, onDelete }: UserListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")
  const [editEmail, setEditEmail] = useState("")

  const startEdit = (user: any) => {
    setEditingId(user._id)
    setEditName(user.name)
    setEditEmail(user.email)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditName("")
    setEditEmail("")
  }

  const saveEdit = (id: string) => {
    if (!editName || !editEmail) return
    onUpdate(id, editName, editEmail)
    cancelEdit()
  }
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
              <div className="flex items-center gap-3 flex-1">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">{user.name.charAt(0).toUpperCase()}</span>
                </div>
                {editingId === user._id ? (
                  <div className="flex flex-col gap-2 w-full max-w-md">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3 py-1 rounded-md border border-border bg-background text-sm"
                    />
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full px-3 py-1 rounded-md border border-border bg-background text-sm"
                    />
                  </div>
                ) : (
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {editingId === user._id ? (
                  <>
                    <button
                      type="button"
                      onClick={() => saveEdit(user._id)}
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
                      onClick={() => startEdit(user)}
                      className="inline-flex items-center justify-center rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground hover:bg-muted"
                    >
                      <Pencil className="mr-1 h-3 w-3" /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(user._id)}
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
