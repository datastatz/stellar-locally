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
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/10 backdrop-blur-md shadow-lg">
       
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
      <main className="relative min-h-screen flex flex-col items-center justify-center">
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
