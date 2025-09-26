'use client'
import dynamic from "next/dynamic";
import ChatSidebar from "./components/ChatSidebar.jsx";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

// Dynamic import met SSR uit, anders krijg je hydration/DOM issues
const PDFViewer = dynamic(() => import("./components/ViewerPane"), {
  ssr: false,
});

export default function aiBook() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Topbar */}
      <div className="h-20 px-6 flex items-center justify-between bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/my-apps')}
            className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="text-sm font-medium">My Apps</span>
          </button>
          <div className="w-px h-6 bg-slate-300"></div>
          <div className="flex items-center gap-3">
           
            <div className="text-xl font-semibold text-slate-800">OpenStax with AI Assistant</div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <span className="opacity-70">License: CC BY (OpenStax)</span>
          <a
            href="https://openstax.org/"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-blue-600 transition-colors"
          >
            Source
          </a>
        </div>
      </div>

      {/* Main Content - 2 Column Layout */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
        {/* PDF Viewer - 75% on desktop, full width on mobile */}
        <div className="flex-1 p-3 lg:p-6">
          <div className="h-full rounded-xl overflow-hidden shadow-xl border border-slate-200">
            <PDFViewer fileUrl="/books/openstax.pdf" />
          </div>
        </div>

        {/* Chat Sidebar - 25% on desktop, full width on mobile */}
        <div className="w-full lg:w-1/4 lg:min-w-[320px] border-t lg:border-t-0 lg:border-l border-slate-200">
          <ChatSidebar />
        </div>
      </div>
    </main>
  );
}
