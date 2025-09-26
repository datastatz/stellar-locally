"use client"

import Link from "next/link"
import { useState } from "react"

interface SideBarProps {
  className?: string
}

export default function SideBar({ className = "" }: SideBarProps) {
  const [activeItem, setActiveItem] = useState("chat")

  const menuItems = [
    {
      id: "chat",
      label: "Chat",
      icon: "💬",
      href: "/userDashboard/chat"
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "📊",
      href: "/userDashboard"
    },
    {
      id: "progress",
      label: "Voortgang",
      icon: "📈",
      href: "/userDashboard/progress"
    },
    {
      id: "settings",
      label: "Instellingen",
      icon: "⚙️",
      href: "/userDashboard/settings"
    }
  ]

  const quickActions = [
    {
      id: "new-chat",
      label: "Nieuwe Chat",
      icon: "✨",
      action: () => console.log("New chat")
    },
    {
      id: "history",
      label: "Geschiedenis",
      icon: "📚",
      action: () => console.log("View history")
    }
  ]

  return (
    <div className={`h-full flex flex-col bg-background border-r border-border ${className}`}>
     
      {/* User Profile */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white text-sm">👤</span>
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-foreground">Scholier</h3>
            <p className="text-sm text-muted-foreground">Demo Account</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 border-b border-border">
        <h4 className="text-xs font-medium text-muted-foreground mb-3">Snelle Acties</h4>
        <div className="space-y-1">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className="group w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-left"
            >
              <span className="text-sm">{action.icon}</span>
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 p-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3">Navigatie</h4>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setActiveItem(item.id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeItem === item.id
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <span className="text-sm">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            © Stellar Education
          </div>
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Terug naar Home
          </Link>
        </div>
      </div>
    </div>
  )
}
