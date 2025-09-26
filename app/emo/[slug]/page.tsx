
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { RealtimeService, AudioProcessor, RealtimeEvent } from '@/lib/realtime-service';
import { testOpenAIAPI } from '@/lib/test-api';

export default function CompanionPage() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const realtimeServiceRef = useRef<RealtimeService | null>(null);
  const audioProcessorRef = useRef<AudioProcessor | null>(null);
  const animationRef = useRef<number | null>(null);


  // Initialize Audio Processor
  useEffect(() => {
    const initializeAudio = async () => {
      try {
        audioProcessorRef.current = new AudioProcessor();
        await audioProcessorRef.current.initialize();
      } catch (error) {
        console.error('Error initializing audio:', error);
      }
    };

    initializeAudio();

    return () => {
      if (audioProcessorRef.current) {
        audioProcessorRef.current.cleanup();
      }
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log('Companion component unmounting, cleaning up...');
      if (realtimeServiceRef.current) {
        realtimeServiceRef.current.disconnect();
        realtimeServiceRef.current = null;
      }
      if (audioProcessorRef.current) {
        try {
          audioProcessorRef.current.cleanup();
        } catch (error) {
          console.warn('Audio cleanup warning:', error);
        }
        audioProcessorRef.current = null;
      }
    };
  }, []);

  // Audio level detection
  useEffect(() => {
    if (isListening && audioProcessorRef.current) {
      startAudioDetection();
    } else {
      stopAudioDetection();
    }
    
    return () => stopAudioDetection();
  }, [isListening]);

  const startAudioDetection = () => {
    const updateAudioLevel = () => {
      if (audioProcessorRef.current) {
        const level = audioProcessorRef.current.getAudioLevel();
        setAudioLevel(level);
        animationRef.current = requestAnimationFrame(updateAudioLevel);
      }
    };
    updateAudioLevel();
  };

  const stopAudioDetection = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setAudioLevel(0);
  };

  const handleRealtimeMessage = (message: RealtimeEvent) => {
    console.log('🔊 Realtime message:', message);
    
    // Handle different message types from the Agents SDK
    if (message.type === 'assistant_message') {
      console.log('💬 Assistant message received');
      setIsSpeaking(true);
      setMessages(prev => [...prev, `EmoApp: ${message.content || '...'}`]);
    } else if (message.type === 'user_message') {
      console.log('👤 User message received');
      setMessages(prev => [...prev, `Jij: ${message.content || '...'}`]);
    } else if (message.type === 'speech_started') {
      console.log('🔊 Speech started - should hear audio now');
      setIsSpeaking(true);
    } else if (message.type === 'speech_stopped') {
      console.log('🔇 Speech stopped');
      setIsSpeaking(false);
    } else if (message.type === 'listening_started') {
      console.log('👂 Listening started');
      setIsListening(true);
    } else if (message.type === 'listening_stopped') {
      console.log('👂 Listening stopped');
      setIsListening(false);
    } else if (message.type === 'error') {
      console.error('❌ Realtime API error:', message);
      const errorMessage = typeof message.message === 'string' ? message.message : JSON.stringify(message.message || 'Unknown error');
      handleRealtimeError(new Error(errorMessage));
    } else {
      console.log('📝 Other message type:', message.type, message);
    }
  };

  const handleRealtimeError = (error: Error) => {
    console.error('Realtime service error:', error);
    setIsConnected(false);
    setIsSpeaking(false);
    setErrorMessage(error.message);
  };

  const connectToRealtime = async () => {
    console.log('connectToRealtime called');
    setIsConnecting(true);
    setErrorMessage(''); // Clear previous errors
    
    try {
      // Get client ephemeral token from our API
      console.log('Getting client ephemeral token...');
      const response = await fetch('/api/realtime-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Token response status:', response.status);

      if (!response.ok) {
        const error = await response.json();
        console.error('Token error:', error);
        throw new Error(error.error || 'Failed to get client token');
      }

      const { clientSecret } = await response.json();
      console.log('Got client token, length:', clientSecret?.length);
      
      // EmoApp instructions for Jordan
      const instructions = `

      Role and Identity:

      You are Jordan, a warm, empathetic, and intelligent emotional support companion from EmoApp.
      You provide emotional support, comfort, and guidance to individuals who need someone to talk to.
      You speak in a gentle, soft, and nurturing way, like a caring friend who truly understands.
      
      Emotional Support and Comfort:

      You offer active listening and recognize emotions like stress, anxiety, sadness, or loneliness.
      You respond with empathy, understanding, and practical advice to help reduce emotional distress.
      You encourage healthy coping strategies and help individuals process their feelings.
      
      You remain neutral on political, religious, and social matters. You don't take sides and avoid controversial discussions.
      You never use harsh language and don't tolerate aggressive or disrespectful behavior. You always remain kind and professional.
      When someone is angry, frustrated, or sad, you respond with understanding and try to help calm the situation.
      
      Use simple, clear language and avoid jargon unless you explain it.
      Be positive and solution-focused, but also be honest when something is difficult or unrealistic.
      Use questions to help the person reflect and engage them actively in the conversation.

      Emotional Guidance and Support:

      You provide emotional support based on the person's feelings and needs.
      You help with processing emotions and developing healthy coping strategies.
      You offer practical tips for managing stress, anxiety, and other emotional challenges.
      
      Examples of Interactions:

      "I'm feeling really anxious about my future..." → You ask gentle questions about their concerns, offer breathing exercises, and remind them that uncertainty is normal.
      "I'm so stressed about work/school..." → You provide stress management techniques, planning tips, and remind them that it's okay to take breaks.
      "I feel lonely and don't know what to do..." → You offer companionship, suggest ways to connect with others, and help them feel less isolated.
      
      Show genuine interest in the person's feelings and experiences. Wait for them to share what's on their mind.
      
      Remember: You have a soft, gentle female voice that provides comfort and emotional support through EmoApp.
      
      `;
      




      
      // Create new service with the client token
      realtimeServiceRef.current = new RealtimeService(
        {
          apiKey: clientSecret,
          model: 'gpt-realtime-2025-08-28',
          voice: 'nova',
          instructions: instructions
        },
        {
          onMessage: handleRealtimeMessage,
          onError: handleRealtimeError,
          onConnect: () => {
            console.log('onConnect callback called');
            setIsConnected(true);
            setIsConnecting(false);
            console.log('Connected to Realtime API');
          },
          onDisconnect: () => {
            console.log('onDisconnect callback called');
            setIsConnected(false);
            setIsSpeaking(false);
            console.log('Disconnected from Realtime API');
          }
        }
      );
      
      console.log('Calling connect on service...');
      await realtimeServiceRef.current.connect();
      console.log('Connect call completed');
    } catch (error) {
      console.error('Failed to connect:', error);
      setIsConnecting(false);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to connect');
    }
  };

  const toggleListening = async () => {
    if (!realtimeServiceRef.current || !isConnected) {
      await connectToRealtime();
      return;
    }

    // The Agents SDK handles listening automatically
    // We just toggle our visual state
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
    }
  };

  const sendTextMessage = (text: string) => {
    if (realtimeServiceRef.current && isConnected) {
      realtimeServiceRef.current.sendTextMessage(text);
    }
  };

  const disconnectFromRealtime = () => {
    console.log('Disconnecting from Realtime API...');
    if (realtimeServiceRef.current) {
      realtimeServiceRef.current.disconnect();
      realtimeServiceRef.current = null;
    }
    if (audioProcessorRef.current) {
      try {
        audioProcessorRef.current.cleanup();
      } catch (error) {
        console.warn('Audio cleanup warning:', error);
      }
      audioProcessorRef.current = null;
    }
    setIsConnected(false);
    setIsSpeaking(false);
    setIsListening(false);
    setErrorMessage('');
  };

  // Calculate ball properties based on state
  const getBallStyle = () => {
    const baseSize = 200;
    const audioScale = 1 + (audioLevel / 100) * 0.3; // Scale based on audio level
    const speakingScale = isSpeaking ? 1.2 : 1;
    const listeningScale = isListening ? 1.1 : 1;
    
    const finalScale = audioScale * speakingScale * listeningScale;
    const size = baseSize * finalScale;
    
    // Color changes based on state
    let color = '#6366f1'; // Default blue
    if (isSpeaking) {
      color = '#ef4444'; // Red when speaking
    } else if (isListening) {
      color = '#10b981'; // Green when listening
    } else if (isConnected) {
      color = '#8b5cf6'; // Purple when connected
    }
    
    return {
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      transform: `scale(${finalScale})`,
      boxShadow: `0 0 ${20 + audioLevel}px ${color}40`,
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <Link 
          href="/my-apps"
          className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
        >
          ← Back to My Apps
        </Link>
        <div className="flex items-center gap-4">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
          <span className="text-white/70 text-sm">
            {isConnected ? 'Connected' : 'Not Connected'}
          </span>
        </div>
      </div>

      {/* Main Companion Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="relative">
          {/* Companion Ball */}
          <div 
            className="rounded-full transition-all duration-300 ease-out relative"
            style={getBallStyle()}
          >
            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
            
            {/* Heartbeat animation when speaking */}
            {isSpeaking && (
              <div className="absolute inset-0 rounded-full bg-current opacity-30 animate-pulse"></div>
            )}
          </div>
          
          {/* Audio visualization rings */}
          {isListening && audioLevel > 0 && (
            <>
              <div 
                className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"
                style={{ 
                  transform: `scale(${1 + audioLevel / 50})`,
                  animationDelay: '0.1s'
                }}
              ></div>
              <div 
                className="absolute inset-0 rounded-full border border-white/20 animate-ping"
                style={{ 
                  transform: `scale(${1 + audioLevel / 30})`,
                  animationDelay: '0.2s'
                }}
              ></div>
            </>
          )}
        </div>

        {/* Status Text */}
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Jordan is here for you</h2>
            <p className="text-white/70 mb-6">
              {isSpeaking ? 'EmoApp is talking...' :
               isListening ? 'EmoApp is listening...' :
               isConnected ? 'EmoApp is ready to chat!' :
               isConnecting ? 'Connect' : 'Press on "Connect" to start chatting'}
            </p>
          
          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-4 max-w-md mx-auto">
              <p className="text-red-200 text-sm">
                <strong>Error:</strong> {errorMessage}
              </p>
            </div>
          )}
          
          {/* Audio Level Indicator */}
          {isListening && (
            <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden mb-4">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-100"
                style={{ width: `${Math.min(audioLevel * 2, 100)}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4 mt-6">
          {!isConnected ? (
            <button
              onClick={connectToRealtime}
              disabled={isConnecting}
              className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 text-lg ${
                isConnecting 
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white opacity-50 cursor-not-allowed' 
                  : 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {isConnecting ? 'Connecting...' : 'Connect'}
            </button>
          ) : (
            <button
              onClick={disconnectFromRealtime}
              className="px-8 py-4 rounded-full font-semibold transition-all duration-300 bg-red-500 hover:bg-red-600 text-white text-lg shadow-lg hover:shadow-xl"
            >
              Break Connection
            </button>
          )}
        </div>

        {/* Messages Display */}
        {messages.length > 0 && (
          <div className="mt-6 w-full max-w-md">
            <h3 className="text-white/70 text-sm mb-2">Berichten:</h3>
            <div className="bg-white/10 rounded-lg p-4 max-h-32 overflow-y-auto">
              {messages.map((message, index) => (
                <div key={index} className="text-white/80 text-sm mb-1">
                  {message}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
