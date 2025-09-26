import Sidebar from "../components/SideBar"
import { ChatInterface } from "../components/ChatInterface"


export default function ChatPage() {
    return (
        <div className="h-screen flex overflow-hidden">
            {/* Sidebar on the left */}
            <div className="w-80 flex-shrink-0">
                <Sidebar />
            </div>
            
            {/* Main content area */}
            <div className="flex-1 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
                <ChatInterface />
            </div>
        </div>
    )
}
