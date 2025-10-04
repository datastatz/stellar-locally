'use client'
import Navbar from "./components/Navbar";
import { useRouter } from "next/navigation";
import Globe from "./components/Globe";
import Card from "./components/Card";
import MyAppsCard from "./components/MyAppsCard";
import Terminal from "./components/Terminal";
import Animation from "./animation/Animation";


export default function Dashboard() {

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
      <header className="sticky top-0 z-50 w-full border-b border-gray-300 bg-white backdrop-blur-md shadow-lg">
       
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-3">
          <Navbar
            onHome={() => console.log("Home")}
            onSearch={() => console.log("Search")}
            onProfile={() => console.log("Profile")}
            onCart={() => console.log("Cart")}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative min-h-screen flex flex-col items-center justify-center z-10">
        {/* Cards with proper spacing */}
        <div className="grid grid-cols-2 gap-16 max-w-7xl w-full px-8 ml-55">
          {/* Left Card */}
          <div className="w-96 h-96 flex items-center justify-center">
            <div className="scale-200">
              <Card />
            </div>
          </div>
          
          {/* Right Card */}
          <div className="w-96 h-96 flex items-center justify-center">
            <div className="scale-200">
              <MyAppsCard />
            </div>
          </div>
        </div>
        
      </main>
    </div>
  );
}
