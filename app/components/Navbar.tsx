'use client'

// components/IconButtonBar.tsx
import * as React from "react";

type Props = {
  onHome?: () => void;
  onSearch?: () => void;
  onProfile?: () => void;
  onCart?: () => void;
  className?: string;
  userName?: string;
};

export default function Navbar({
  onHome,
  onSearch,
  onProfile,
  onCart,
  className = "",
  userName = "Student",
}: Props) {
  return (
    <div
      className={[
        "group flex h-16 w-80 items-center justify-between rounded-xl px-4",
        // glassmorphism background
        "bg-white/20 backdrop-blur-md",
        // glassmorphism border
        "border border-white/30",
        // glassmorphism shadow
        "shadow-[0_8px_32px_rgba(31,38,135,0.37)]",
        "transition-all duration-500 hover:w-96",
        className,
      ].join(" ")}
      role="toolbar"
      aria-label="Snelle acties"
    >
      {/* User Profile Section */}
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white"></div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-700">{userName}</span>
          <span className="text-xs text-slate-500">Online</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        {/* Home */}
        <button
          type="button"
          onClick={onHome}
          aria-label="Home"
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-700 outline-none transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-slate-400"
        >
          <svg
            className="h-4 w-4"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            aria-hidden="true"
          >
            <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
          </svg>
        </button>

        {/* Search */}
        <button
          type="button"
          onClick={onSearch}
          aria-label="Zoeken"
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-700 outline-none transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-slate-400"
        >
          <svg
            className="h-4 w-4"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

        {/* Cart */}
        <button
          type="button"
          onClick={onCart}
          aria-label="Winkelwagen"
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-700 outline-none transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-slate-400 relative"
        >
          <svg
            className="h-4 w-4"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {/* Cart Badge */}
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
            3
          </span>
        </button>

        {/* Settings */}
        <button
          type="button"
          onClick={onProfile}
          aria-label="Instellingen"
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-700 outline-none transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-slate-400"
        >
          <svg
            className="h-4 w-4"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
