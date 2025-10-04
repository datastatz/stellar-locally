'use client';
import { useRouter } from 'next/navigation';

export default function LobPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Header */}
      <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button 
              onClick={() => router.push('/')} 
              className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 transition-colors"
            >
              <div className="text-xl">←</div>
              <span>Back to My Apps</span>
            </button>
            <h1 className="text-2xl font-bold text-slate-700">Lob Chat</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>
      
      {/* Full-screen iframe */}
      <iframe 
        src="https://bey.chat/60f73b4b-2a3b-4e30-a5ce-7b4f7d39f65f" 
        width="100%" 
        height="600px" 
        frameBorder="0" 
        allowFullScreen
        allow="camera; microphone; fullscreen"
        style={{
          border: "none", 
          maxWidth: "100%",
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
          margin: 0,
          padding: 0
        }}
      />
    </div>
  );
}





