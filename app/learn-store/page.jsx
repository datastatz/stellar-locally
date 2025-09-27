'use client'
import { useRouter } from 'next/navigation';
import Banner from './components/Banner';

export default function LearnStore() {
  const router = useRouter();

  return (
    <div className="min-h-screen relative">
      <button 
        onClick={() => router.push('/')} 
        className="absolute top-4 left-4 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-700 text-sm font-medium cursor-pointer transition-all duration-200 shadow-md hover:bg-gray-50 hover:border-gray-400 z-10"
        type="button"
      >
        ← Back to Dashboard
      </button>
      <Banner />
 
    </div>
  );
}