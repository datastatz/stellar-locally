'use client'
import EmoApp from '../data/EmoApp';


export default function MyApps() {
  return (
    <div className="min-h-screen ">
      {/* Header with margin from top */}
      <div className="pt-8 pb-4">
        
        
        {/* EmoApp cards in a row with spacing */}
        <div className="flex justify-center items-center gap-8 px-8">
          <EmoApp />
          <EmoApp />
          <EmoApp />
        </div>
      </div>
    </div>
  );
}