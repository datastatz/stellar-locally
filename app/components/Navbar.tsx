'use client'

// components/IconButtonBar.tsx
import * as React from "react";

type Props = {
  onHome?: () => void;
  onSearch?: () => void;
  onProfile?: () => void;
  onCart?: () => void;
  className?: string;
};

export default function Navbar({
  onHome,
  onSearch,
  onProfile,
  onCart,
  className = "",
}: Props) {
  return (
    <div
      className={[
        "group flex h-10 w-64 items-center justify-around rounded-xl",
        // glassmorphism background
        "bg-white/20 backdrop-blur-md",
        // glassmorphism border
        "border border-white/30",
        // glassmorphism shadow
        "shadow-[0_8px_32px_rgba(31,38,135,0.37)]",
        "transition-all duration-500 hover:w-72",
        className,
      ].join(" ")}
      role="toolbar"
      aria-label="Snelle acties"
    >
      {/* Home */}
      <button
        type="button"
        onClick={onHome}
        aria-label="Home"
        className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 outline-none transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-slate-400"
      >
        <svg
          className="h-5 w-5"
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
        className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 outline-none transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-slate-400"
      >
        <svg
          className="h-5 w-5"
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

      {/* Profile */}
      <button
        type="button"
        onClick={onProfile}
        aria-label="Profiel"
        className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 outline-none transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-slate-400"
      >
        <svg
          className="h-5 w-5"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z" />
        </svg>
      </button>

      {/* Cart */}
      <button
        type="button"
        onClick={onCart}
        aria-label="Winkelwagen"
        className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 outline-none transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-slate-400"
      >
        <svg
          className="h-5 w-5"
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
      </button>
    </div>
  );
}
