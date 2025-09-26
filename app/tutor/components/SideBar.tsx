"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

interface SideBarProps {
  className?: string
}

export default function SideBar({ className = "" }: SideBarProps) {
  const [activeItem, setActiveItem] = useState("chat")
  const router = useRouter()

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
      label: "Progress",
      icon: "📈",
      href: "/userDashboard/progress"
    },
    {
      id: "settings",
      label: "Settings",
      icon: "⚙️",
      href: "/userDashboard/settings"
    }
  ]

  const quickActions = [
    {
      id: "new-chat",
      label: "New Chat",
      icon: "✨",
      action: () => console.log("New chat")
    },
    {
      id: "history",
      label: "History",
      icon: "📚",
      action: () => console.log("View history")
    }
  ]

  return (
    <div className={`h-full flex flex-col bg-slate-50 border-r border-slate-200 ${className}`}>
     
      {/* User Profile */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/my-apps')}
            className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="text-sm font-medium">My Apps</span>
          </button>
          <div className="flex-1">
            <h3 className="font-medium text-slate-800">Student</h3>
            <p className="text-sm text-muted-foreground">Demo Account</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 border-b border-slate-200">
        <h4 className="text-xs font-medium text-slate-600 mb-3">Quick Actions</h4>
        <div className="space-y-1">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className="group w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-100 hover:text-slate-800 transition-colors text-left text-slate-600"
            >
              <span className="text-sm">{action.icon}</span>
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 p-6">
        <h4 className="text-xs font-medium text-slate-600 mb-3">Navigation</h4>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setActiveItem(item.id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeItem === item.id
                  ? "bg-blue-100 text-blue-800"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              <span className="text-sm">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            © Stellar Education
          </div>
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
