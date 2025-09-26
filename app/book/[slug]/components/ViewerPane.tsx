"use client";

import * as React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Styles van de viewer (moeten client-side geladen worden)
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

type ViewerPaneProps = {
  fileUrl: string; // bv. "/books/openstax.pdf"
};

export default function ViewerPane({ fileUrl }: ViewerPaneProps) {
  const defaultLayout = defaultLayoutPlugin();

  // Tip: gebruik een vaste hoogte of laat hem binnen een grid/flex container groeien
  return (
    <div className="h-[calc(100vh-80px)] w-full border rounded-xl overflow-hidden bg-white">
      {/* Worker: gebruik een CDN-URL die past bij jouw pdfjs-dist versie.
         Wil je exact matchen, vervang de versie hieronder met die in jouw node_modules. */}
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer fileUrl={fileUrl} plugins={[defaultLayout]} />
      </Worker>
    </div>
  );
}
