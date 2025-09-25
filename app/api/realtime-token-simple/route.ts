import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('=== SIMPLE API ROUTE CALLED ===');
    
    const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error('OpenAI API key not configured');
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    console.log('API key found, length:', apiKey.length);
    
    // For now, just return a mock response to test the route
    return NextResponse.json({ 
      clientSecret: 'mock-client-secret-for-testing',
      message: 'API route is working!' 
    });

  } catch (error) {
    console.error('Error in simple API route:', error);
    return NextResponse.json(
      { error: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}
