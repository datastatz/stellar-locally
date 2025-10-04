'use client';
import { useRouter } from 'next/navigation';
import EmoApp from '../../data/EmoApp';
import Book from '../../data/Book';
import AiTutor from '../../data/AiTutor';
import Paint from '../../data/Paint';
import Kahoot from '../../data/Kahoot';
import Lob from '../../data/Lob';

export default function LobPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Magenta Orb Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "white",
          backgroundImage: `
            linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
            radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
          `,
          backgroundSize: "40px 40px, 40px 40px, 100% 100%",
        }}
      />
      {/* Header */}
      <div className="brutalist-header relative z-10">
        <div className="header-content">
          <button 
            onClick={() => router.push('/')} 
            className="brutalist-back-btn"
          >
            <div className="back-icon">←</div>
            <span>Back to Dashboard</span>
          </button>
          <h1 className="header-title">My Apps</h1>
          <div className="header-spacer"></div>
        </div>
      </div>
      
       {/* Main content */}
       <div className="pt-8 pb-4 relative z-10">
        {/* App cards with labels */}
        <div className="flex justify-center items-center gap-8 px-8 flex-wrap">
          <div className="app-item">
            <EmoApp />
            <div className="app-label">Emo App</div>
          </div>
          <div className="app-item">
            <Book />
            <div className="app-label">Book</div>
          </div>
          <div className="app-item">
            <AiTutor />
            <div className="app-label">AI Tutor</div>
          </div>
          <div className="app-item">
            <Paint />
            <div className="app-label">Paint</div>
          </div>
          <div className="app-item">
            <Kahoot />
            <div className="app-label">Kahoot</div>
          </div>
          <div className="app-item">
            <Lob />
            <div className="app-label">Lob Chat</div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .brutalist-header {
          background-color: rgba(255, 255, 255, 0.9);
          border-bottom: 3px solid #3b82f6;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(10px);
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 16px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brutalist-back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px 12px 24px;
          background-color: #2a2a2a;
          border: 2px solid #4a5568;
          border-radius: 0 8px 8px 0;
          color: #ffffff;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          position: relative;
          overflow: hidden;
          margin-left: 0;
        }

        .brutalist-back-btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          transition: left 0.6s;
        }

        .brutalist-back-btn:hover::before {
          left: 100%;
        }

        .brutalist-back-btn:hover {
          background-color: #3a3a3a;
          border-color: #60a5fa;
          transform: translate(-2px, -2px);
          box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
        }

        .brutalist-back-btn:active {
          transform: translate(0, 0);
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .back-icon {
          font-size: 18px;
          font-weight: bold;
          transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .brutalist-back-btn:hover .back-icon {
          transform: translateX(-2px);
        }

        .header-title {
          font-size: 28px;
          font-weight: bold;
          color: #000000;
          text-align: center;
          flex: 1;
          margin: 0 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
          letter-spacing: 1px;
        }

        .header-spacer {
          width: 140px;
        }
      `}</style>
    </div>
  );
}





