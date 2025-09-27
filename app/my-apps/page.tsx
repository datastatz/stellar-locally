'use client'
import { useRouter } from 'next/navigation';
import EmoApp from '../data/EmoApp';
import Book from '../data/Book';
import AiTutor from '../data/AiTutor';
import Paint from '../data/Paint';
import Kahoot from '../data/Kahoot';

export default function MyApps() {
  const router = useRouter();

  return (
    <div className="min-h-screen relative">
      {/* Back to Main button */}
      <button 
        onClick={() => router.push('/')} 
        className="absolute top-4 left-4 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-700 text-sm font-medium cursor-pointer transition-all duration-200 shadow-md hover:bg-gray-50 hover:border-gray-400 z-10"
        type="button"
      >
        ← Back to Main
      </button>
      
      {/* Header with margin from top */}
      <div className="pt-8 pb-4">
        
        
        {/* EmoApp cards in a row with spacing */}
        <div className="flex justify-center items-center gap-8 px-8">
          <EmoApp />
          <Book />
          <AiTutor />
          <Paint />
          <Kahoot />
        </div>
      </div>
    </div>
  );
}