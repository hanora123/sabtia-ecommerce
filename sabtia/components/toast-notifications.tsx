"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Toast {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  message?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastContextType {
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...toast, id }
    setToasts((prev) => [...prev, newToast])

    // Auto remove after duration
    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id)
      }, toast.duration || 5000)
    }
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation
    setTimeout(() => setIsVisible(true), 10)
  }, [])

  const handleRemove = () => {
    setIsVisible(false)
    setTimeout(() => onRemove(toast.id), 300)
  }

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }

  const colors = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  }

  const iconColors = {
    success: "text-green-500",
    error: "text-red-500",
    warning: "text-yellow-500",
    info: "text-blue-500",
  }

  const Icon = icons[toast.type]

  return (
    <div
      className={`
        transform transition-all duration-300 ease-in-out
        ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
        ${colors[toast.type]}
        border rounded-lg shadow-lg p-4 max-w-sm w-full
      `}
      dir="rtl"
    >
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${iconColors[toast.type]}`} />

        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm">{toast.title}</div>
          {toast.message && <div className="text-sm opacity-90 mt-1">{toast.message}</div>}

          {toast.action && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toast.action.onClick}
              className="mt-2 h-8 px-2 text-xs hover:bg-white/50"
            >
              {toast.action.label}
            </Button>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          className="h-6 w-6 p-0 hover:bg-white/50 flex-shrink-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// Helper functions for common toast types
export const toast = {
  success: (title: string, message?: string, options?: Partial<Toast>) => ({
    type: "success" as const,
    title,
    message,
    ...options,
  }),

  error: (title: string, message?: string, options?: Partial<Toast>) => ({
    type: "error" as const,
    title,
    message,
    ...options,
  }),

  warning: (title: string, message?: string, options?: Partial<Toast>) => ({
    type: "warning" as const,
    title,
    message,
    ...options,
  }),

  info: (title: string, message?: string, options?: Partial<Toast>) => ({
    type: "info" as const,
    title,
    message,
    ...options,
  }),
}
