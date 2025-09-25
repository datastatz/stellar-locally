// Simplified Realtime Service using the official Agents SDK
import { RealtimeAgent, RealtimeSession } from '@openai/agents/realtime';

// Basic event type used by CompanionPage and callbacks
export type RealtimeEvent =
  | { type: 'assistant_message'; content?: string }
  | { type: 'user_message'; content?: string }
  | { type: 'speech_started' }
  | { type: 'speech_stopped' }
  | { type: 'listening_started' }
  | { type: 'listening_stopped' }
  | { type: 'error'; message?: string }
  | { type: string; [key: string]: unknown };

export interface RealtimeConfig {
  apiKey: string;
  model?: string;
  voice?: string;
  instructions?: string;
}

export class RealtimeService {
  private agent: RealtimeAgent | null = null;
  private session: RealtimeSession | null = null;
  private config: RealtimeConfig;
  private onMessage: (message: RealtimeEvent) => void;
  private onError: (error: Error) => void;
  private onConnect: () => void;
  private onDisconnect: () => void;
  private isConnected: boolean = false;

  constructor(
    config: RealtimeConfig,
    callbacks: {
      onMessage: (message: RealtimeEvent) => void;
      onError: (error: Error) => void;
      onConnect: () => void;
      onDisconnect: () => void;
    }
  ) {
    this.config = config;
    this.onMessage = callbacks.onMessage;
    this.onError = callbacks.onError;
    this.onConnect = callbacks.onConnect;
    this.onDisconnect = callbacks.onDisconnect;
  }

  async connect(): Promise<void> {
    try {
      console.log('Creating RealtimeAgent...');
      
      // Create the agent with Baby Coby's personality
      this.agent = new RealtimeAgent({
        name: 'Baby Coby',
        instructions: this.config.instructions || `Je bent Baby Coby, een vriendelijke en enthousiaste AI companion die helpt met leren. Je spreekt Nederlands en bent altijd behulpzaam en motiverend. Je kunt praten over school, huiswerk, en andere leeronderwerpen.`,
      });

      console.log('Creating RealtimeSession...');
      
      // Create the session
      this.session = new RealtimeSession(this.agent);

      console.log('Connecting to Realtime API...');
      
      // Connect with the client ephemeral token
      await this.session.connect({
        apiKey: this.config.apiKey,
      });

      this.isConnected = true;
      this.onConnect();
      console.log('Realtime session connected successfully');

    } catch (error) {
      console.error('Error connecting to Realtime API:', error);
      this.onError(error as Error);
      throw error;
    }
  }

  disconnect(): void {
    if (this.session) {
      // Use the correct method name
      this.session.close();
      this.session = null;
    }
    if (this.agent) {
      this.agent = null;
    }
    this.isConnected = false;
  }

  // Send text message
  sendTextMessage(text: string): void {
    if (this.session && this.isConnected) {
      this.session.sendMessage(text);
    } else {
      this.onError(new Error('Session not connected'));
    }
  }

  // Start listening (handled automatically by the SDK)
  startListening(): void {
    if (this.session && this.isConnected) {
      // The SDK handles microphone automatically
      console.log('Listening started automatically by SDK');
    } else {
      this.onError(new Error('Session not connected'));
    }
  }

  // Stop listening (handled automatically by the SDK)
  stopListening(): void {
    if (this.session && this.isConnected) {
      // The SDK handles microphone automatically
      console.log('Listening stopped automatically by SDK');
    } else {
      this.onError(new Error('Session not connected'));
    }
  }

  // Get the current state
  getState(): string {
    if (!this.session) return 'disconnected';
    return this.isConnected ? 'connected' : 'disconnected';
  }

  // Check if connected
  isSessionConnected(): boolean {
    return this.isConnected;
  }
}

// Audio utilities for visual feedback
export class AudioProcessor {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private microphone: MediaStreamAudioSourceNode | null = null;
  private dataArray: Uint8Array<ArrayBuffer> | null = null;

  async initialize(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioContext = new AudioContext();
      this.analyser = this.audioContext.createAnalyser();
      this.microphone = this.audioContext.createMediaStreamSource(stream);
      
      this.analyser.fftSize = 256;
      this.microphone.connect(this.analyser);
      
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount) as Uint8Array<ArrayBuffer>;
    } catch (error) {
      throw new Error('Failed to initialize audio: ' + error);
    }
  }

  getAudioLevel(): number {
    if (!this.analyser || !this.dataArray) return 0;
    
    this.analyser.getByteFrequencyData(this.dataArray);
    const average = this.dataArray.reduce((a, b) => a + b) / this.dataArray.length;
    return average;
  }

  cleanup(): void {
    if (this.microphone) {
      this.microphone.disconnect();
      this.microphone = null;
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}
