import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('=== API ROUTE CALLED ===');
    console.log('Generating client ephemeral token...');
    
    const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    console.log('API key exists:', !!apiKey);
    console.log('API key length:', apiKey?.length || 0);
    
    if (!apiKey) {
      console.error('OpenAI API key not configured');
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    console.log('API key found, length:', apiKey.length);

    // Generate client ephemeral token
    const response = await fetch('https://api.openai.com/v1/realtime/client_secrets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session: {
          type: 'realtime',
          model: 'gpt-realtime-2025-08-28'
        }
      })
    });

    console.log('OpenAI API response status:', response.status);

    if (!response.ok) {
      const error = await response.text();
      console.error('Failed to generate client token:', error);
      return NextResponse.json(
        { error: `Failed to generate client token: ${error}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Client token generated successfully');
    console.log('Response data structure:', JSON.stringify(data, null, 2));
    
    // Try different possible structures
    const clientSecret = data.client_secret?.value || 
                        data.client_secret || 
                        data.value || 
                        data.clientSecret;
    
    if (!clientSecret) {
      console.error('No client secret found in response:', data);
      return NextResponse.json(
        { error: 'No client secret found in response' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ clientSecret });

  } catch (error) {
    console.error('Error generating client token:', error);
    return NextResponse.json(
      { error: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}
