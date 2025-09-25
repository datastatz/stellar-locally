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
        {/* Logo above Terminal */}
        <div className="mb-8">
          <img src="/logo.png" alt="Logo" className="h-60 w-360 object-contain" />
        </div>
        
        {/* Terminal in center */}
        <div className="scale-75">
          <Terminal />
        </div>
        
        {/* Cards positioned around the globe */}

        {/* Top Left Card */}
        <div className="absolute top-35 left-60 scale-155">
          <Card />
        </div>
        
        {/* Top Right Card */}
        <div className="absolute top-35 right-60 scale-155">
          <Card />
        </div>
        
        {/* Bottom Left Card */}
        <div className="absolute top-170 left-60 transform -translate-y-1/2 scale-155">
          <Card />
        </div>
        
        {/* Bottom Right Card */}
        <div className="absolute top-170 right-60 transform -translate-y-1/2 scale-155">
          <MyAppsCard />
        </div>
        
      </main>
    </div>
  );
}
