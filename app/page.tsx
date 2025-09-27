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
            onHome={() => router.push("/dashboard")}
            onSearch={() => console.log("Search")}
            onProfile={() => console.log("Profile")}
            onCart={() => console.log("Cart")}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative min-h-screen flex flex-col items-center justify-center">
        {/* Cards with proper spacing */}
        <div className="grid grid-cols-2 gap-8 max-w-4xl">
          {/* Top Left Card */}
          <div className="scale-100">
            <Card />
          </div>
          
         
          
          {/* Bottom Right Card */}
          <div className="scale-100">
            <MyAppsCard />
          </div>
        </div>
        
      </main>
    </div>
  );
}
