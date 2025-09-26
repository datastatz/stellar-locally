'use client'
import dynamic from "next/dynamic";

// Dynamic import met SSR uit, anders krijg je hydration/DOM issues
const PDFViewer = dynamic(() => import("./components/ViewerPane"), {
  ssr: false,
});

export default function aiBook() {
  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Topbar */}
      <div className="h-20 px-6 flex items-center justify-between">
        <div className="text-xl font-semibold">OpenStax • Demo Viewer</div>
        <div className="flex items-center gap-3 text-sm">
          <span className="opacity-70">Licentie: CC BY (OpenStax)</span>
          <a
            href="https://openstax.org/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Bron
          </a>
        </div>
      </div>

      {/* Canvas */}
      <div className="px-6 pb-6">
        <PDFViewer fileUrl="/books/openstax.pdf" />
      </div>
    </main>
  );
}
