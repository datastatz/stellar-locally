'use client'
import { useRouter } from 'next/navigation';
import EmoApp from '../data/EmoApp';
import Book from '../data/Book';
import AiTutor from '../data/AiTutor';
import Paint from '../data/Paint';
import Kahoot from '../data/Kahoot';
import Lob from '../data/Lob';

export default function MyApps() {
  const router = useRouter();

  return (
    <div className="min-h-screen relative bg-white">
      {/* Grid Background */}
      <div className="fixed inset-0 z-0" style={{
        backgroundColor: "white",
        backgroundImage: `
          linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
          radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
        `,
        backgroundSize: "40px 40px, 40px 40px, 100% 100%",
      }}></div>
      {/* Header */}
      <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button 
              onClick={() => router.push('/')} 
              className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 transition-colors"
            >
              <div className="text-xl">←</div>
              <span>Back to Dashboard</span>
            </button>
            <h1 className="text-2xl font-bold text-slate-700">My Apps</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="pt-8 pb-4 relative z-10">
        {/* App cards with labels */}
        <div className="flex justify-center items-center gap-8 px-8 flex-wrap">
          <div className="app-item">
            <EmoApp />
            <div className="app-label">EMO APP</div>
          </div>
          <div className="app-item">
            <Book />
            <div className="app-label">BOOK</div>
          </div>
          <div className="app-item">
            <AiTutor />
            <div className="app-label">AI TUTOR</div>
          </div>
          <div className="app-item">
            <Paint />
            <div className="app-label">PAINT</div>
          </div>
          <div className="app-item">
            <Kahoot />
            <div className="app-label">KAHOOT</div>
          </div>
          <div className="app-item">
            <Lob />
            <div className="app-label">LOB CHAT</div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .app-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .app-label {
          font-size: 16px;
          font-weight: 900;
          color: #ffffff;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
          background: rgba(0, 0, 0, 0.6);
          padding: 8px 16px;
          border-radius: 8px;
          border: 2px solid #3b82f6;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
          min-width: 100px;
        }
      `}</style>
    </div>
  );
}
