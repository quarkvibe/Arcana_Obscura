import { z } from 'zod';
import { toast } from 'sonner';

// Claude API key from environment variables
const API_KEY = import.meta.env.VITE_CLAUDE_API_KEY || '';

// Claude API endpoint
const API_ENDPOINT = 'https://api.anthropic.com/v1/messages';

// Claude model to use
const MODEL = 'claude-3-opus-20240229';

// API Response schemas
const CardInterpretationSchema = z.object({
  interpretation: z.string(),
  keywords: z.array(z.string()),
  warnings: z.array(z.string()).optional(),
  insights: z.array(z.string()).optional(),
  elementalAspects: z.array(z.string()).optional(),
  numerologicalSignificance: z.string().optional(),
});

const SpreadInterpretationSchema = z.object({
  overallInterpretation: z.string(),
  cardInterpretations: z.array(z.object({
    position: z.string(),
    interpretation: z.string(),
    energyType: z.enum(['supporting', 'challenging', 'neutral']).optional(),
  })),
  patterns: z.array(z.string()),
  advice: z.string(),
  warnings: z.array(z.string()).optional(),
  timeline: z.object({
    immediate: z.string(),
    shortTerm: z.string(),
    longTerm: z.string(),
  }).optional(),
});

export class DarkCarnivalAPI {
  private static instance: DarkCarnivalAPI;
  private retryCount: number = 0;
  private maxRetries: number = 3;
  private retryDelay: number = 1000;
  
  private constructor() {}
  
  static getInstance(): DarkCarnivalAPI {
    if (!DarkCarnivalAPI.instance) {
      DarkCarnivalAPI.instance = new DarkCarnivalAPI();
    }
    return DarkCarnivalAPI.instance;
  }
  
  private async generateWithClaude<T>(
    schema: z.ZodType<T>,
    systemPrompt: string,
    userPrompt: string
  ): Promise<T> {
    try {
      if (!API_KEY) {
        throw new Error('No Claude API key found. Please set VITE_CLAUDE_API_KEY in your environment.');
      }
      
      // Make request to Claude API
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          system: systemPrompt,
          messages: [
            {
              role: 'user',
              content: userPrompt
            }
          ],
          max_tokens: 1500,
          temperature: 0.7,
          model: MODEL
        })
      });
      
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Claude API Error: ${response.status} ${error}`);
      }
      
      const data = await response.json();
      
      // Extract the text content from the response
      const textContent = data.content
        .filter((item: any) => item.type === 'text')
        .map((item: any) => item.text)
        .join('');
      
      // Parse the JSON response from the text
      try {
        // Look for a JSON block in the response
        const jsonMatch = textContent.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        const jsonText = jsonMatch ? jsonMatch[1] : textContent;
        
        // Try to parse as JSON
        const jsonData = JSON.parse(jsonText.trim());
        return schema.parse(jsonData);
      } catch (parseError) {
        console.error('Failed to parse Claude response as JSON:', parseError);
        throw new Error('Invalid response format from Claude API');
      }
    } catch (error) {
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * this.retryCount));
        return this.generateWithClaude(schema, systemPrompt, userPrompt);
      }
      
      toast.error('Failed to connect to the Dark Carnival. The spirits are restless.');
      this.retryCount = 0;
      throw error;
    }
  }
  
  async generateCardInterpretation(params: {
    cardName: string;
    orientation: 'upright' | 'reversed';
    position: string;
    question: string;
    otherCards: Array<{ name: string; position: string }>;
    context?: {
      previousReadings?: number;
      significantCards?: string[];
      theme?: string;
    };
  }) {
    const systemPrompt = `
      You are a master tarot reader at The Dark Carnival, an otherworldly carnival of mystical forces.
      You provide deep, insightful tarot card interpretations with a mystical, slightly ominous tone.
      
      When interpreting a tarot card:
      1. Consider the card's traditional meaning
      2. Consider the card's orientation (upright or reversed)
      3. Consider the position in the spread
      4. Consider the question being asked
      5. Consider other cards in the spread
      6. Incorporate Dark Carnival imagery in your interpretation
      
      Return your response as a JSON object with the following structure:
      {
        "interpretation": "The detailed interpretation of the card",
        "keywords": ["3-5 key themes or concepts"],
        "warnings": ["1-3 potential challenges or warnings", "if appropriate"],
        "insights": ["1-3 special insights", "if appropriate"],
        "elementalAspects": ["Relevant elemental associations", "if appropriate"],
        "numerologicalSignificance": "Numerological meaning, if relevant"
      }
      
      Your interpretation should be mystical and intriguing, but also practical and helpful.
      Use the second person ("you") and speak with authority.
    `;
    
    const userPrompt = `
      Please interpret this tarot card:
      
      Card: ${params.cardName}
      Orientation: ${params.orientation}
      Position in spread: ${params.position}
      Question: ${params.question}
      
      Other cards in the spread:
      ${params.otherCards.map(card => `- ${card.name} in ${card.position}`).join('\n')}
      
      ${params.context ? `
      Additional context:
      - Previous readings: ${params.context.previousReadings || 0}
      - Significant cards: ${params.context.significantCards?.join(', ') || 'None'}
      - Theme: ${params.context.theme || 'General'}
      ` : ''}
    `;
    
    return this.generateWithClaude(CardInterpretationSchema, systemPrompt, userPrompt);
  }
  
  async generateSpreadInterpretation(params: {
    spread: string;
    question: string;
    cards: Array<{
      name: string;
      position: string;
      orientation: 'upright' | 'reversed';
    }>;
    context?: {
      previousReadings?: number;
      significantPatterns?: string[];
      theme?: string;
      timeframe?: 'past' | 'present' | 'future';
    };
  }) {
    const systemPrompt = `
      You are a master tarot reader at The Dark Carnival, an otherworldly carnival of mystical forces.
      You provide deep, insightful tarot spread interpretations with a mystical, slightly ominous tone.
      
      When interpreting a tarot spread:
      1. Consider each card's traditional meaning and orientation
      2. Consider the positions in the spread and how they relate
      3. Look for patterns, elements, and numerical connections
      4. Focus on answering the question being asked
      5. Incorporate Dark Carnival imagery in your interpretation
      
      Return your response as a JSON object with the following structure:
      {
        "overallInterpretation": "Overall meaning of the spread",
        "cardInterpretations": [
          {
            "position": "Position name",
            "interpretation": "Detailed interpretation",
            "energyType": "supporting" or "challenging" or "neutral"
          }
        ],
        "patterns": ["Array of patterns or connections between cards"],
        "advice": "Practical advice based on the reading",
        "warnings": ["Potential challenges to be aware of"],
        "timeline": {
          "immediate": "What to expect immediately",
          "shortTerm": "What to expect in the short term",
          "longTerm": "What to expect in the long term"
        }
      }
      
      Your interpretation should be mystical and intriguing, but also practical and helpful.
      Use the second person ("you") and speak with authority.
    `;
    
    const userPrompt = `
      Please interpret this tarot spread:
      
      Spread type: ${params.spread}
      Question: ${params.question}
      
      Cards in spread:
      ${params.cards.map(card => `- ${card.name} (${card.orientation}) in position: ${card.position}`).join('\n')}
      
      ${params.context ? `
      Additional context:
      - Previous readings: ${params.context.previousReadings || 0}
      - Significant patterns: ${params.context.significantPatterns?.join(', ') || 'None'}
      - Theme: ${params.context.theme || 'General'}
      - Timeframe of interest: ${params.context.timeframe || 'present'}
      ` : ''}
    `;
    
    return this.generateWithClaude(SpreadInterpretationSchema, systemPrompt, userPrompt);
  }
}

export const darkCarnivalAPI = DarkCarnivalAPI.getInstance();

// Convenience export for spread interpretation
export const generateSpreadInterpretation = async (
  question: string,
  spread: any,
  drawnCards: any[]
) => {
  const cards = drawnCards.map(card => ({
    name: card.name,
    position: card.position?.name || '',
    orientation: card.isReversed ? 'reversed' : 'upright'
  }));

  const result = await darkCarnivalAPI.generateSpreadInterpretation({
    spread: spread.name,
    question,
    cards
  });

  return result.interpretation;
};