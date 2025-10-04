import {userRouter} from "next/navigation";






export default function Lob(){

const router = useRouter();

const handleClick = () => {
    router.push('/my-apps');
};


return (

<>

<button onClick={handleClick}>Back to My Apps</button>
    {/* Adding the Lob chatbot  */}
    <iframe 
        src="https://bey.chat/60f73b4b-2a3b-4e30-a5ce-7b4f7d39f65f" 
        frameBorder="0" 
        allowFullScreen
        allow="camera; microphone; fullscreen"
        style={{
            border: "none", 
            width: "100vw", 
            height: "100vh", 
            position: "fixed", 
            top: 0, 
            left: 0, 
            zIndex: 1000,
            margin: 0,
            padding: 0
        }}
    ></iframe>

</>
)}





