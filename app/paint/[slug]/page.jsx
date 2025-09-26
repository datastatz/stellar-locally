"use client";

import dynamic from "next/dynamic";
import "tldraw/tldraw.css";

// Dynamic import to prevent SSR issues
const Tldraw = dynamic(() => import("tldraw").then((mod) => ({ default: mod.Tldraw })), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-slate-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-slate-600">Loading Paint App...</p>
      </div>
    </div>
  ),
});

export default function Whiteboard() {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Tldraw />
      <style jsx global>{`
        /* Hide tldraw watermark/license text */
        [data-testid="help-menu-button"],
        [data-testid="help-menu"],
        .tlui-help-menu,
        .tlui-menu__group:has([data-testid="help-menu-button"]),
        .tlui-menu__group:has([data-testid="help-menu"]),
        .tlui-menu__group:has(.tlui-help-menu) {
          display: none !important;
        }
        
        /* Hide any license-related text */
        [class*="license"],
        [class*="watermark"],
        [class*="pro"],
        [class*="upgrade"] {
          display: none !important;
        }
        
        /* Hide help menu and any license prompts */
        .tlui-menu__group:last-child {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
