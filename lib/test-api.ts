// Simple API test to verify the API key works
export async function testOpenAIAPI(apiKey: string): Promise<boolean> {
  try {
    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      console.log('API key is valid');
      return true;
    } else {
      console.error('API key validation failed:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.error('API test failed:', error);
    return false;
  }
}
