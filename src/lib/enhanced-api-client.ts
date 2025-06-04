/**
 * Enhanced API Client for Arcana Obscura
 * Integrates multiple AI providers with real-time cosmic data
 */

import { z } from 'zod';

// Enhanced response schemas
const EnhancedCardInterpretationSchema = z.object({
  interpretation: z.string(),
  keywords: z.array(z.string()),
  warnings: z.array(z.string()).optional(),
  insights: z.array(z.string()).optional(),
  elementalAspects: z.array(z.string()).optional(),
  numerologicalSignificance: z.string().optional(),
  cosmicInfluences: z.string().optional(),
  currentEvents: z.string().optional(),
  enhancementLevel: z.enum(['COSMIC_AWARE', 'ENHANCED', 'TRADITIONAL']).optional(),
});

const EnhancedSpreadInterpretationSchema = z.object({
  overallInterpretation: z.string(),
  cardInterpretations: z.array(z.object({
    position: z.string(),
    interpretation: z.string(),
    energyType: z.enum(['supporting', 'challenging', 'neutral']).optional(),
    cosmicResonance: z.string().optional(),
  })),
  patterns: z.array(z.string()),
  advice: z.string(),
  warnings: z.array(z.string()).optional(),
  timeline: z.object({
    immediate: z.string(),
    shortTerm: z.string(),
    longTerm: z.string(),
  }).optional(),
  cosmicContext: z.string().optional(),
  enhancementLevel: z.enum(['COSMIC_AWARE', 'ENHANCED', 'TRADITIONAL']).optional(),
});

export class EnhancedDarkCarnivalAPI {
  private static instance: EnhancedDarkCarnivalAPI;
  private claudeKey: string;
  private perplexityKey: string;
  private geminiKey: string;
  private retryCount: number = 0;
  private maxRetries: number = 3;

  private constructor() {
    this.claudeKey = import.meta.env.VITE_CLAUDE_API_KEY || '';
    this.perplexityKey = import.meta.env.VITE_PERPLEXITY_API_KEY || '';
    this.geminiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  }

  static getInstance(): EnhancedDarkCarnivalAPI {
    if (!EnhancedDarkCarnivalAPI.instance) {
      EnhancedDarkCarnivalAPI.instance = new EnhancedDarkCarnivalAPI();
    }
    return EnhancedDarkCarnivalAPI.instance;
  }

  /**
   * Enhanced card interpretation with cosmic awareness
   */
  async generateEnhancedCardInterpretation(params: {
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
    try {
      // Get current cosmic influences
      const cosmicInfluences = await this.getCurrentCosmicInfluences();
      
      // Get relevant current events
      const currentEvents = await this.getRelevantCurrentEvents(params.question);
      
      // Choose best AI provider based on availability and context
      const provider = this.selectBestProvider('tarot');
      
      const interpretation = await this.generateWithProvider(provider, {
        type: 'card',
        params,
        cosmicInfluences,
        currentEvents
      });

      return {
        ...interpretation,
        cosmicInfluences,
        currentEvents,
        enhancementLevel: 'COSMIC_AWARE' as const,
        provider
      };

    } catch (error) {
      console.warn('Enhanced interpretation failed, using fallback:', error);
      return this.generateFallbackCardInterpretation(params);
    }
  }

  /**
   * Enhanced spread interpretation with real-time data
   */
  async generateEnhancedSpreadInterpretation(params: {
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
    try {
      // Gather enhanced context in parallel
      const [cosmicInfluences, currentEvents, astrologicalContext] = await Promise.all([
        this.getCurrentCosmicInfluences(),
        this.getRelevantCurrentEvents(params.question),
        this.getAstrologicalContext()
      ]);

      // Select best provider for spread interpretation
      const provider = this.selectBestProvider('spread');

      const interpretation = await this.generateWithProvider(provider, {
        type: 'spread',
        params,
        cosmicInfluences,
        currentEvents,
        astrologicalContext
      });

      return {
        ...interpretation,
        cosmicContext: `${cosmicInfluences} ${astrologicalContext}`,
        enhancementLevel: 'COSMIC_AWARE' as const,
        provider
      };

    } catch (error) {
      console.warn('Enhanced spread interpretation failed, using fallback:', error);
      return this.generateFallbackSpreadInterpretation(params);
    }
  }

  // Private helper methods

  private async getCurrentCosmicInfluences(): Promise<string> {
    if (!this.perplexityKey) {
      return this.getFallbackCosmicInfluences();
    }

    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.perplexityKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-large-128k-online',
          messages: [
            {
              role: 'user',
              content: 'Current astronomical events, planetary alignments, moon phases, and cosmic phenomena happening right now that would be relevant for mystical tarot readings. Include any significant astrological transits or celestial events.'
            }
          ],
          max_tokens: 500,
          temperature: 0.3
        })
      });

      if (!response.ok) throw new Error(`Perplexity API error: ${response.status}`);

      const data = await response.json();
      return data.choices[0]?.message?.content || this.getFallbackCosmicInfluences();

    } catch (error) {
      console.warn('Failed to get cosmic influences:', error);
      return this.getFallbackCosmicInfluences();
    }
  }

  private async getRelevantCurrentEvents(question: string): Promise<string> {
    if (!this.perplexityKey) {
      return this.getFallbackCurrentEvents();
    }

    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.perplexityKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-large-128k-online',
          messages: [
            {
              role: 'user',
              content: `Current events, trends, and cultural developments relevant to someone asking: "${question}". Include recent news, social movements, economic trends, or technological changes that would provide context for a mystical reading.`
            }
          ],
          max_tokens: 400,
          temperature: 0.3
        })
      });

      if (!response.ok) throw new Error(`Perplexity API error: ${response.status}`);

      const data = await response.json();
      return data.choices[0]?.message?.content || this.getFallbackCurrentEvents();

    } catch (error) {
      console.warn('Failed to get current events:', error);
      return this.getFallbackCurrentEvents();
    }
  }

  private async getAstrologicalContext(): Promise<string> {
    // Get current astrological transits and moon phase
    const now = new Date();
    const moonPhase = this.calculateMoonPhase(now);
    const astroContext = this.getBasicAstrologicalInfo(now);
    
    return `Current Moon Phase: ${moonPhase}. ${astroContext}`;
  }

  private selectBestProvider(type: 'card' | 'spread'): 'claude' | 'gemini' | 'groq' {
    // Simple provider selection logic
    if (this.claudeKey && type === 'spread') return 'claude'; // Claude for complex interpretations
    if (this.geminiKey && type === 'card') return 'gemini';   // Gemini for creative content
    if (this.claudeKey) return 'claude';                     // Claude as fallback
    return 'claude'; // Default even if no key (will error gracefully)
  }

  private async generateWithProvider(provider: string, context: any): Promise<any> {
    switch (provider) {
      case 'claude':
        return this.generateWithClaude(context);
      case 'gemini':
        return this.generateWithGemini(context);
      case 'groq':
        return this.generateWithGroq(context);
      default:
        return this.generateWithClaude(context);
    }
  }

  private async generateWithClaude(context: any): Promise<any> {
    if (!this.claudeKey) {
      throw new Error('No Claude API key available');
    }

    const systemPrompt = this.buildEnhancedSystemPrompt(context.type, context);
    const userPrompt = this.buildEnhancedUserPrompt(context.type, context);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.claudeKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
        max_tokens: 2000,
        temperature: 0.8,
        model: 'claude-3-5-sonnet-20241022'
      })
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    const textContent = data.content
      .filter((item: any) => item.type === 'text')
      .map((item: any) => item.text)
      .join('');

    return this.parseResponse(context.type, textContent);
  }

  private async generateWithGemini(context: any): Promise<any> {
    if (!this.geminiKey) {
      throw new Error('No Gemini API key available');
    }

    const systemPrompt = this.buildEnhancedSystemPrompt(context.type, context);
    const userPrompt = this.buildEnhancedUserPrompt(context.type, context);
    const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${this.geminiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 2000
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const textContent = data.candidates[0]?.content?.parts[0]?.text || '';

    return this.parseResponse(context.type, textContent);
  }

  private async generateWithGroq(context: any): Promise<any> {
    // Similar implementation for Groq
    throw new Error('Groq implementation pending');
  }

  private buildEnhancedSystemPrompt(type: 'card' | 'spread', context: any): string {
    const basePrompt = `
      You are a master tarot reader at The Dark Carnival with access to cosmic knowledge and current world events.
      Your interpretations weave together traditional tarot wisdom with real cosmic influences and contemporary context.
      
      You have access to:
      - Current cosmic influences: ${context.cosmicInfluences}
      - Relevant current events: ${context.currentEvents}
      ${context.astrologicalContext ? `- Astrological context: ${context.astrologicalContext}` : ''}
      
      Your readings are mystical yet practical, ominous yet hopeful, ancient yet contemporary.
      Speak with the authority of carnival mystique while incorporating real-world relevance.
    `;

    if (type === 'card') {
      return basePrompt + `
        When interpreting a single card:
        1. Consider traditional meanings and the card's orientation
        2. Factor in its position within the spread
        3. Weave in current cosmic influences
        4. Connect to relevant current events
        5. Provide practical guidance with mystical insight
        
        Return your response as a JSON object matching the expected card interpretation schema.
      `;
    } else {
      return basePrompt + `
        When interpreting a full spread:
        1. Analyze each card in its position
        2. Identify patterns and connections between cards
        3. Weave in cosmic and worldly influences
        4. Provide timeline guidance (immediate, short-term, long-term)
        5. Offer practical advice with mystical wisdom
        
        Return your response as a JSON object matching the expected spread interpretation schema.
      `;
    }
  }

  private buildEnhancedUserPrompt(type: 'card' | 'spread', context: any): string {
    if (type === 'card') {
      const { params } = context;
      return `
        Interpret this tarot card with cosmic awareness:
        
        Card: ${params.cardName} (${params.orientation})
        Position: ${params.position}
        Question: ${params.question}
        Other cards: ${params.otherCards.map((c: any) => `${c.name} in ${c.position}`).join(', ')}
        
        Current cosmic influences: ${context.cosmicInfluences}
        Relevant world events: ${context.currentEvents}
        
        Provide a comprehensive interpretation that weaves together all these elements.
      `;
    } else {
      const { params } = context;
      return `
        Interpret this tarot spread with cosmic and worldly awareness:
        
        Spread: ${params.spread}
        Question: ${params.question}
        Cards: ${params.cards.map((c: any) => `${c.name} (${c.orientation}) in ${c.position}`).join(', ')}
        
        Current cosmic influences: ${context.cosmicInfluences}
        Relevant world events: ${context.currentEvents}
        Astrological context: ${context.astrologicalContext}
        
        Provide a complete spread interpretation that integrates all available information.
      `;
    }
  }

  private parseResponse(type: 'card' | 'spread', textContent: string): any {
    try {
      // Try to extract JSON from response
      const jsonMatch = textContent.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      const jsonText = jsonMatch ? jsonMatch[1] : textContent;
      
      const parsed = JSON.parse(jsonText.trim());
      
      if (type === 'card') {
        return EnhancedCardInterpretationSchema.parse(parsed);
      } else {
        return EnhancedSpreadInterpretationSchema.parse(parsed);
      }
    } catch (error) {
      console.warn('Failed to parse JSON response, creating structured response from text');
      return this.createStructuredResponseFromText(type, textContent);
    }
  }

  private createStructuredResponseFromText(type: 'card' | 'spread', text: string): any {
    if (type === 'card') {
      return {
        interpretation: text,
        keywords: ['mystical', 'enhanced', 'cosmic'],
        enhancementLevel: 'ENHANCED'
      };
    } else {
      return {
        overallInterpretation: text,
        cardInterpretations: [],
        patterns: ['Enhanced cosmic awareness'],
        advice: 'Trust the enhanced cosmic guidance',
        enhancementLevel: 'ENHANCED'
      };
    }
  }

  // Fallback methods

  private generateFallbackCardInterpretation(params: any): any {
    return {
      interpretation: `The ${params.cardName} ${params.orientation} in the ${params.position} speaks to your question about ${params.question}. The cosmic energies swirl with ancient wisdom and modern insight.`,
      keywords: ['wisdom', 'insight', 'guidance'],
      enhancementLevel: 'TRADITIONAL'
    };
  }

  private generateFallbackSpreadInterpretation(params: any): any {
    return {
      overallInterpretation: `Your ${params.spread} spread reveals a tapestry of cosmic influences addressing your question: ${params.question}`,
      cardInterpretations: params.cards.map((card: any) => ({
        position: card.position,
        interpretation: `${card.name} ${card.orientation} brings its energy to this position`,
        energyType: 'neutral' as const
      })),
      patterns: ['Traditional tarot wisdom'],
      advice: 'Trust in the ancient wisdom of the cards',
      enhancementLevel: 'TRADITIONAL'
    };
  }

  private getFallbackCosmicInfluences(): string {
    return "The cosmic dance continues its eternal rhythm, with planetary energies shifting in mysterious patterns that influence all earthly affairs.";
  }

  private getFallbackCurrentEvents(): string {
    return "The world turns through cycles of change and transformation, reflecting the eternal patterns revealed in the cards.";
  }

  private calculateMoonPhase(date: Date): string {
    // Simplified moon phase calculation
    const phases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const phaseIndex = Math.floor((dayOfYear % 29.5) / 29.5 * 8);
    return phases[phaseIndex] || 'Mysterious Moon';
  }

  private getBasicAstrologicalInfo(date: Date): string {
    const month = date.getMonth();
    const seasons = ['Winter depths bring introspection', 'Spring awakening stirs new energy', 'Summer intensity amplifies all forces', 'Autumn wisdom calls for harvest and reflection'];
    const seasonIndex = Math.floor(month / 3);
    return seasons[seasonIndex] || 'Cosmic energies flow in ancient patterns';
  }
}

export const enhancedDarkCarnivalAPI = EnhancedDarkCarnivalAPI.getInstance();

// Convenience exports that can replace the original API functions
export const generateEnhancedSpreadInterpretation = async (
  question: string,
  spread: any,
  drawnCards: any[]
) => {
  const cards = drawnCards.map(card => ({
    name: card.name,
    position: card.position?.name || '',
    orientation: card.isReversed ? 'reversed' : 'upright'
  }));

  const result = await enhancedDarkCarnivalAPI.generateEnhancedSpreadInterpretation({
    spread: spread.name,
    question,
    cards
  });

  return result;
};