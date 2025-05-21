import { z } from 'zod';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_DARK_CARNIVAL_API_URL;
const API_KEY = import.meta.env.VITE_DARK_CARNIVAL_API_KEY;

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
  
  private async fetchAPI<T>(
    endpoint: string,
    schema: z.ZodType<T>,
    options: RequestInit = {}
  ): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          ...options.headers,
        },
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      
      const data = await response.json();
      return schema.parse(data);
    } catch (error) {
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * this.retryCount));
        return this.fetchAPI(endpoint, schema, options);
      }
      
      toast.error('Failed to connect to the Dark Carnival. The spirits are restless.');
      throw error;
    } finally {
      this.retryCount = 0;
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
    return this.fetchAPI('/tarot/interpret-card', CardInterpretationSchema, {
      method: 'POST',
      body: JSON.stringify(params),
    });
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
    return this.fetchAPI('/tarot/interpret-spread', SpreadInterpretationSchema, {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }
}

export const darkCarnivalAPI = DarkCarnivalAPI.getInstance();