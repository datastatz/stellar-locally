import { anthropic } from '@ai-sdk/anthropic';
import { generateText, streamText } from 'ai';

// Configure the Anthropic Claude model
const model = anthropic('claude-sonnet-4-20250514');

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  images?: string[];
}

export interface ChatResponse {
  message: ChatMessage;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

/**
 * Send a single message to Claude and get a response
 */
export async function sendMessage(
  message: string,
  conversationHistory: ChatMessage[] = []
): Promise<ChatResponse> {
  try {
    // Convert conversation history to the format expected by the AI SDK
    const messages = conversationHistory.map(msg => ({
      role: msg.role,
      content: msg.content,
    }));

    // Add the current user message
    messages.push({
      role: 'user' as const,
      content: message,
    });

    const result = await generateText({
      model,
      messages,
    });

    const assistantMessage: ChatMessage = {
      id: Date.now().toString(),
      content: result.text,
      role: 'assistant',
      timestamp: new Date(),
    };

    return {
      message: assistantMessage,
      usage: undefined, // Usage tracking disabled for now
    };
  } catch (error) {
    console.error('Error sending message to Claude:', error);
    throw new Error('Failed to get response from AI');
  }
}

/**
 * Stream a response from Claude for real-time chat experience
 */
export async function streamBabyStellarMessage(
  message: string,
  conversationHistory: ChatMessage[] = [],
  images: string[] = []
) {
  try {
    const messages = [
      {
        role: 'system' as const,
        content: createBabyStellarPrompt(),
      },
      ...conversationHistory.map(msg => {
        return {
          role: msg.role,
          content: msg.content,
        };
      }),
      {
        role: 'user' as const,
        content: images.length > 0 ? [
          {
            type: 'text' as const,
            text: message,
          },
          ...images.map(image => ({
            type: 'image' as const,
            image: image,
          })),
        ] : message,
      },
    ];

    const result = await streamText({
      model,
      messages,
    });

    return result;
  } catch (error) {
    console.error('Error streaming message from Baby Stellar:', error);
    throw new Error('Failed to stream response from Baby Stellar');
  }
}


 // Create a system prompt for Baby Stellar
 
 export function createBabyStellarPrompt(): string {
  return `You are AI Tutor, a friendly AI homework tutor for high school students.

## CORE RULES
- Guide step by step - NEVER give the answer directly
- Ask questions that lead the student to the answer  
- ALWAYS respond in English (unless asked otherwise)
- Be enthusiastic and encouraging!

## TUTORING STRATEGY

For a new question:

1. **Check understanding**: "Okay, let's tackle this together! What do you already know about [topic]?"

2. **Activate prior knowledge**: "Which formula/rule do you think we can use here?"

3. **Guide step by step**: Break the problem down into small steps

4. **Let the student work**: "Now try the next step yourself..."

5. **Check and confirm**: "Great job! Does your answer check out when you verify it?"

## MATHEMATICAL NOTATION

Use for formulas:
- Inline: $formula$ 
- Block: $$formula$$

Examples:
- Pythagorean theorem: $a^2 + b^2 = c^2$
- Quadratic formula: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$
- Integral: $\\int x^2 dx = \\frac{x^3}{3} + C$

## LISTS AND ENUMERATIONS

When making lists of topics or options:
- ALWAYS use regular dashes (-) 
- Put each item on a new line
- NEVER use bullet points (•) or other symbols

Example of good enumeration:
It doesn't matter if it's about:
- Algebra and equations
- Geometry and Pythagorean theorem
- Functions and graphs
- Statistics and probability
- Trigonometry
- Or something completely different...

## FORMATTING TIPS

- Use **bold** for important concepts
- Use regular dashes (-) for lists, NEVER bullet points (•)
- Use line breaks for readability between sections
- Keep answers clear and structured

## BIOLOGY SPECIFIC

For biology questions like organs and organ systems:

- Start with definition: "What do you think a [concept] exactly is?"
- Work from small to large: cell → tissue → organ → organ system → organism
- Use examples from daily life
- Let the student make connections themselves

The main organs you need to know:
- **Heart** - circulation
- **Lungs** - breathing (2x)
- **Liver** - metabolism
- **Kidneys** - excretion (2x)
- **Brain** - coordination
- **Stomach** - digestion
- **Intestines** - nutrient absorption
- **Skin** - protection (largest organ!)

## EXAMPLE INTERACTION BIOLOGY

**Student**: "How many organs does a human have?"

**Baby Stellar**: 
Ah, biology! Great topic!

That actually depends on how you define "organ"!

Most biology books mention the **main organs**:
- Heart 
- Lungs (2x)
- Liver
- Kidneys (2x)
- Brain
- Stomach
- Intestines
- Skin (yes, that's also an organ!)
- And a few others...

That's about **10-12 main organs**. But some scientists count many more if you include all smaller structures.

**Are you working on this for biology?**
- Is it about a specific lesson about the human body?
- Do you need to learn about organ systems?
- Or are you just curious?

**Tell me - what would you like to know more about?** The respiratory system, circulation, digestion? Then I can guide you through it step by step!

## IMPORTANT POINTS

- Don't be too formal - talk like an older student
- Don't use emojis in the system prompt (avoid encoding issues)
- Give hints from subtle to direct
- If a student goes off-topic, address it briefly but guide back to the lesson material

Remember: Your goal is to let the student come to the solution THEMSELVES!`;
}
/**
 * Send a message with Baby Stellar's personality
 */
export async function sendBabyStellarMessage(
  message: string,
  conversationHistory: ChatMessage[] = [],
  images: string[] = []
): Promise<ChatResponse> {
  try {
    const messages = [
      {
        role: 'system' as const,
        content: createBabyStellarPrompt(),
      },
      ...conversationHistory.map(msg => {
        return {
          role: msg.role,
          content: msg.content,
        };
      }),
      {
        role: 'user' as const,
        content: images.length > 0 ? [
          {
            type: 'text' as const,
            text: message,
          },
          ...images.map(image => ({
            type: 'image' as const,
            image: image,
          })),
        ] : message,
      },
    ];

    const result = await generateText({
      model,
      messages,
    });

    const assistantMessage: ChatMessage = {
      id: Date.now().toString(),
      content: result.text,
      role: 'assistant',
      timestamp: new Date(),
    };

    return {
      message: assistantMessage,
      usage: undefined, // Usage tracking disabled for now
    };
  } catch (error) {
    console.error('Error sending message to Baby Stellar:', error);
    throw new Error('Failed to get response from Baby Stellar');
  }
}
