import { NextRequest, NextResponse } from 'next/server';
import { sendBabyStellarMessage, streamBabyStellarMessage, ChatMessage } from '@/lib/chat-service';

export async function POST(request: NextRequest) {
  try {
    const { message, images = [], conversationHistory = [], stream = false } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Convert conversation history to the correct format
    type ChatMessageInput = {
      id: string;
      content: string;
      role: 'user' | 'assistant';
      timestamp: string | number | Date;
      images?: string[];
    };
    const history: ChatMessage[] = (conversationHistory as ChatMessageInput[]).map((msg) => ({
      id: msg.id,
      content: msg.content,
      role: msg.role,
      timestamp: new Date(msg.timestamp),
      images: msg.images || undefined,
    }));

    if (stream) {
      // Stream response from Baby Stellar
      const result = await streamBabyStellarMessage(message, history, images);
      
      return result.toTextStreamResponse();
    } else {
      // Get complete response from Baby Stellar
      const response = await sendBabyStellarMessage(message, history, images);

      return NextResponse.json({
        success: true,
        message: response.message,
        usage: response.usage,
      });
    }
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
