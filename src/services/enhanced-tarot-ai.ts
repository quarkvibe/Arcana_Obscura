/**
 * Enhanced AI-Powered Tarot Reading System
 * Combines traditional tarot wisdom with current events, astronomical data, and deep educational insights
 */

import { enhancedDarkCarnivalAPI } from '../lib/enhanced-api-client';
import { EnhancedTarotCard } from '../data/enhanced-tarot-deck';

export interface TarotReadingContext {
  question: string;
  spread: string;
  cards: DrawnTarotCard[];
  querentInfo?: {
    name?: string;
    birthDate?: Date;
    location?: string;
    previousReadings?: number;
  };
  cosmicContext?: {
    currentMoonPhase: string;
    significantTransits: string[];
    seasonalEnergy: string;
    currentEvents: string[];
  };
}

export interface DrawnTarotCard extends EnhancedTarotCard {
  position: {
    name: string;
    meaning: string;
    index: number;
  };
  isReversed: boolean;
  drawOrder: number;
}

export interface EnhancedTarotReading {
  id: string;
  timestamp: Date;
  question: string;
  spread: string;
  cards: DrawnTarotCard[];
  interpretation: {
    overview: string;
    cardAnalysis: CardAnalysis[];
    patterns: PatternAnalysis[];
    timing: TimingAnalysis;
    guidance: string;
    warnings?: string[];
    opportunities?: string[];
  };
  education: {
    symbolismExplained: string;
    historicalContext: string;
    mythology: string;
    practicalApplication: string;
  };
  cosmicConnection: {
    astronomicalRelevance: string;
    currentEventCorrelations: string[];
    seasonalInfluences: string;
    lunarGuidance: string;
  };
  carnivalNarrative: string;
  accuracyLevel: 'MYSTICAL' | 'ENHANCED' | 'PROFESSIONAL_GRADE';
}

interface CardAnalysis {
  card: DrawnTarotCard;
  position: string;
  coreInterpretation: string;
  symbolicAnalysis: string;
  numerologicalSignificance: string;
  elementalInfluence: string;
  astrologicalConnection: string;
  currentEventRelevance: string;
  practicalGuidance: string;
  carnivalImagery: string;
}

interface PatternAnalysis {
  type: 'numerical' | 'elemental' | 'archetypal' | 'suit' | 'court' | 'major_minor';
  description: string;
  significance: string;
  guidance: string;
}

interface TimingAnalysis {
  immediate: string;
  shortTerm: string;
  longTerm: string;
  astrologicalTiming: string;
  seasonalConsiderations: string;
}

export class EnhancedTarotAI {
  private static instance: EnhancedTarotAI;

  private constructor() {}

  static getInstance(): EnhancedTarotAI {
    if (!EnhancedTarotAI.instance) {
      EnhancedTarotAI.instance = new EnhancedTarotAI();
    }
    return EnhancedTarotAI.instance;
  }

  async generateComprehensiveReading(context: TarotReadingContext): Promise<EnhancedTarotReading> {
    console.log('🔮 Generating comprehensive tarot reading with cosmic intelligence...');

    // Gather cosmic and current event context
    const cosmicContext = await this.gatherCosmicContext(context);
    
    // Analyze card patterns and relationships
    const patterns = this.analyzeCardPatterns(context.cards);
    
    // Generate individual card analyses
    const cardAnalyses = await this.generateCardAnalyses(context, cosmicContext);
    
    // Create overall interpretation
    const interpretation = await this.generateOverallInterpretation(context, cardAnalyses, patterns, cosmicContext);
    
    // Generate educational content
    const education = await this.generateEducationalContent(context.cards);
    
    // Create carnival narrative
    const carnivalNarrative = await this.generateCarnivalNarrative(context, interpretation);

    const reading: EnhancedTarotReading = {
      id: this.generateReadingId(),
      timestamp: new Date(),
      question: context.question,
      spread: context.spread,
      cards: context.cards,
      interpretation,
      education,
      cosmicConnection: cosmicContext,
      carnivalNarrative,
      accuracyLevel: 'PROFESSIONAL_GRADE'
    };

    console.log('✨ Enhanced tarot reading generated with cosmic accuracy');
    return reading;
  }

  private async gatherCosmicContext(context: TarotReadingContext) {
    const currentDate = new Date();
    
    try {
      // Get current cosmic influences from enhanced API
      const cosmicInfluences = await this.getCurrentCosmicInfluences();
      const currentEvents = await this.getRelevantCurrentEvents(context.question);

      return {
        astronomicalRelevance: cosmicInfluences,
        currentEventCorrelations: [currentEvents],
        seasonalInfluences: this.getSeasonalInfluences(currentDate),
        lunarGuidance: this.getCurrentLunarPhase()
      };
    } catch (error) {
      console.warn('Failed to gather cosmic context:', error);
      return {
        astronomicalRelevance: "The cosmic energies flow in mysterious patterns",
        currentEventCorrelations: ["Global shifts and transformations reflect in the cards"],
        seasonalInfluences: this.getSeasonalInfluences(currentDate),
        lunarGuidance: "The moon's wisdom guides your reading"
      };
    }
  }

  private analyzeCardPatterns(cards: DrawnTarotCard[]): PatternAnalysis[] {
    const patterns: PatternAnalysis[] = [];

    // Numerical patterns
    const numbers = cards.map(c => c.number);
    const numericalPattern = this.findNumericalPatterns(numbers);
    if (numericalPattern) patterns.push(numericalPattern);

    // Elemental patterns
    const elements = cards.map(c => c.element).filter(Boolean);
    const elementalPattern = this.findElementalPatterns(elements as string[]);
    if (elementalPattern) patterns.push(elementalPattern);

    // Major vs Minor Arcana balance
    const majorCount = cards.filter(c => c.arcana === 'major').length;
    const minorCount = cards.filter(c => c.arcana === 'minor').length;
    patterns.push(this.analyzeMajorMinorBalance(majorCount, minorCount));

    // Court card patterns
    const courtCards = cards.filter(c => c.number >= 11 && c.number <= 14);
    if (courtCards.length > 0) {
      patterns.push(this.analyzeCourtCardPatterns(courtCards));
    }

    return patterns;
  }

  private async generateCardAnalyses(context: TarotReadingContext, cosmicContext: any): Promise<CardAnalysis[]> {
    const analyses: CardAnalysis[] = [];

    for (const card of context.cards) {
      const systemPrompt = `
        You are the master tarot reader of The Dark Carnival, possessing centuries of wisdom about the tarot's deepest mysteries.
        
        Analyze this single tarot card with profound depth, considering:
        1. Traditional symbolic meaning in its position
        2. Numerological and elemental significance
        3. Astrological connections and current cosmic timing
        4. How current world events reflect in the card's energy
        5. Practical guidance for the querent
        6. Dark carnival mystical imagery
        
        Provide a multi-layered analysis that educates while it mystifies.
      `;

      const userPrompt = `
        Card: ${card.name} (${card.isReversed ? 'Reversed' : 'Upright'})
        Position: ${card.position.name} - ${card.position.meaning}
        Question: ${context.question}
        
        Card Details:
        - Element: ${card.element}
        - Number: ${card.number}
        - Astrology: ${card.astrology ? JSON.stringify(card.astrology) : 'None'}
        - Keywords: ${card.keywords[card.isReversed ? 'reversed' : 'upright'].join(', ')}
        
        Current Cosmic Context:
        ${cosmicContext.astronomicalRelevance}
        
        Other Cards in Reading:
        ${context.cards.filter(c => c.id !== card.id).map(c => `${c.name} in ${c.position.name}`).join(', ')}
      `;

      const analysis = await this.generateClaudeResponse(userPrompt, systemPrompt);

      analyses.push({
        card,
        position: card.position.name,
        coreInterpretation: this.extractSection(analysis, 'core interpretation'),
        symbolicAnalysis: this.extractSection(analysis, 'symbolic analysis'),
        numerologicalSignificance: this.extractSection(analysis, 'numerological significance'),
        elementalInfluence: this.extractSection(analysis, 'elemental influence'),
        astrologicalConnection: this.extractSection(analysis, 'astrological connection'),
        currentEventRelevance: this.extractSection(analysis, 'current event relevance'),
        practicalGuidance: this.extractSection(analysis, 'practical guidance'),
        carnivalImagery: this.extractSection(analysis, 'carnival imagery')
      });
    }

    return analyses;
  }

  private async generateOverallInterpretation(
    context: TarotReadingContext,
    cardAnalyses: CardAnalysis[],
    patterns: PatternAnalysis[],
    cosmicContext: any
  ) {
    const systemPrompt = `
      You are the master tarot reader of The Dark Carnival, weaving individual card meanings into a cohesive mystical narrative.
      
      Create a comprehensive reading interpretation that:
      1. Synthesizes individual card meanings into a unified message
      2. Identifies patterns and connections between cards
      3. Addresses the specific question with practical wisdom
      4. Incorporates current cosmic timing and world events
      5. Provides actionable guidance for different timeframes
      6. Maintains the dark carnival's mystical atmosphere
      
      Your interpretation should be both mystically compelling and practically useful.
    `;

    const userPrompt = `
      Question: ${context.question}
      Spread: ${context.spread}
      
      Card Analyses:
      ${cardAnalyses.map(analysis => `
        ${analysis.card.name} (${analysis.position}): ${analysis.coreInterpretation}
      `).join('\n')}
      
      Identified Patterns:
      ${patterns.map(p => `${p.type}: ${p.description}`).join('\n')}
      
      Cosmic Context:
      ${cosmicContext.astronomicalRelevance}
      
      Current Events:
      ${cosmicContext.currentEventCorrelations.join('; ')}
    `;

    const interpretation = await this.generateClaudeResponse(userPrompt, systemPrompt);

    return {
      overview: this.extractSection(interpretation, 'overview'),
      cardAnalysis: cardAnalyses,
      patterns,
      timing: {
        immediate: this.extractSection(interpretation, 'immediate timing'),
        shortTerm: this.extractSection(interpretation, 'short term'),
        longTerm: this.extractSection(interpretation, 'long term'),
        astrologicalTiming: this.extractSection(interpretation, 'astrological timing'),
        seasonalConsiderations: cosmicContext.seasonalInfluences
      },
      guidance: this.extractSection(interpretation, 'guidance'),
      warnings: this.extractArray(interpretation, 'warnings'),
      opportunities: this.extractArray(interpretation, 'opportunities')
    };
  }

  private async generateEducationalContent(cards: DrawnTarotCard[]) {
    const systemPrompt = `
      You are a tarot historian and educator at The Dark Carnival, revealing the deep wisdom and historical context of the cards.
      
      Provide educational content that teaches:
      1. Symbolic meanings and their historical origins
      2. Cultural and mythological context
      3. How to apply these insights practically
      4. Common misconceptions and advanced understanding
      
      Make complex concepts accessible while maintaining mystical reverence.
    `;

    const cardDetails = cards.map(card => ({
      name: card.name,
      symbolism: card.symbolism,
      education: card.education
    }));

    const userPrompt = `
      Provide comprehensive educational content for these tarot cards:
      ${cards.map(c => `${c.name}: ${c.education.history}`).join('\n')}
      
      Focus on teaching the deep wisdom that makes these cards meaningful beyond simple fortune-telling.
    `;

    const education = await this.generateClaudeResponse(userPrompt, systemPrompt);

    return {
      symbolismExplained: this.extractSection(education, 'symbolism explained'),
      historicalContext: this.extractSection(education, 'historical context'),
      mythology: this.extractSection(education, 'mythology'),
      practicalApplication: this.extractSection(education, 'practical application')
    };
  }

  private async generateCarnivalNarrative(context: TarotReadingContext, interpretation: any): Promise<string> {
    const systemPrompt = `
      You are the storyteller of The Dark Carnival, weaving tarot readings into compelling mystical narratives.
      
      Create a atmospheric story that:
      1. Uses dark carnival imagery and metaphors
      2. Incorporates the card meanings into the narrative
      3. Addresses the querent's question through story
      4. Maintains mystical ambiance with practical wisdom
      5. Uses the carnival setting as a metaphor for life's journey
      
      Your narrative should be immersive and memorable.
    `;

    const userPrompt = `
      Question: ${context.question}
      Cards: ${context.cards.map(c => c.name).join(', ')}
      Overall Message: ${interpretation.overview}
      
      Create a mystical carnival narrative that delivers the reading's wisdom through storytelling.
    `;

    return await this.generateClaudeResponse(userPrompt, systemPrompt);
  }

  // Helper methods
  private generateReadingId(): string {
    return `reading_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getSeasonalInfluences(date: Date): string {
    const month = date.getMonth();
    const seasons = {
      spring: "Energy of renewal and new growth flows through your reading.",
      summer: "The full power of manifestation and abundance illuminates your path.",
      autumn: "Harvest time wisdom guides you toward what must be released and what must be gathered.",
      winter: "The introspective wisdom of the dark season offers deep inner guidance."
    };

    if (month >= 2 && month <= 4) return seasons.spring;
    if (month >= 5 && month <= 7) return seasons.summer;
    if (month >= 8 && month <= 10) return seasons.autumn;
    return seasons.winter;
  }

  private findNumericalPatterns(numbers: number[]): PatternAnalysis | null {
    // Check for sequences, repetitions, or significant numerical relationships
    const counts = numbers.reduce((acc, num) => {
      acc[num] = (acc[num] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    const repeated = Object.entries(counts).filter(([_, count]) => count > 1);
    
    if (repeated.length > 0) {
      return {
        type: 'numerical',
        description: `Repeated numbers: ${repeated.map(([num, count]) => `${num} (${count}x)`).join(', ')}`,
        significance: 'Numerical repetition amplifies the energy and significance of these themes in your life.',
        guidance: 'Pay special attention to the meanings associated with these repeated numbers.'
      };
    }

    return null;
  }

  private findElementalPatterns(elements: string[]): PatternAnalysis | null {
    const counts = elements.reduce((acc, element) => {
      acc[element] = (acc[element] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const dominant = Object.entries(counts).sort(([,a], [,b]) => b - a)[0];
    
    if (dominant && dominant[1] > 1) {
      return {
        type: 'elemental',
        description: `Dominant element: ${dominant[0]} (${dominant[1]} cards)`,
        significance: `The ${dominant[0]} element strongly influences this reading.`,
        guidance: `Focus on ${dominant[0]} qualities: ${this.getElementalGuidance(dominant[0])}`
      };
    }

    return null;
  }

  private analyzeMajorMinorBalance(majorCount: number, minorCount: number): PatternAnalysis {
    if (majorCount > minorCount) {
      return {
        type: 'major_minor',
        description: `Major Arcana dominant (${majorCount} major, ${minorCount} minor)`,
        significance: 'Significant life themes and spiritual lessons are highlighted.',
        guidance: 'Focus on the bigger picture and soul-level growth rather than day-to-day concerns.'
      };
    } else if (minorCount > majorCount * 2) {
      return {
        type: 'major_minor',
        description: `Minor Arcana dominant (${minorCount} minor, ${majorCount} major)`,
        significance: 'Practical matters and everyday situations take precedence.',
        guidance: 'Focus on concrete actions and practical solutions to current challenges.'
      };
    } else {
      return {
        type: 'major_minor',
        description: `Balanced Major and Minor Arcana (${majorCount} major, ${minorCount} minor)`,
        significance: 'Spiritual growth and practical matters are equally important.',
        guidance: 'Balance spiritual insight with practical action for best results.'
      };
    }
  }

  private analyzeCourtCardPatterns(courtCards: DrawnTarotCard[]): PatternAnalysis {
    return {
      type: 'court',
      description: `${courtCards.length} court cards present: ${courtCards.map(c => c.name).join(', ')}`,
      significance: 'People and personalities play significant roles in your situation.',
      guidance: 'Consider the human element and interpersonal dynamics in your decision-making.'
    };
  }

  private getElementalGuidance(element: string): string {
    const guidance = {
      fire: 'passion, action, creativity, and courage',
      water: 'emotion, intuition, healing, and flow',
      air: 'thought, communication, clarity, and new ideas',
      earth: 'practicality, stability, manifestation, and patience'
    };
    return guidance[element as keyof typeof guidance] || 'balance and integration';
  }

  private extractSection(text: string, sectionName: string): string {
    // Simple extraction logic - in practice, you'd use more sophisticated parsing
    const lines = text.split('\n');
    const sectionStart = lines.findIndex(line => 
      line.toLowerCase().includes(sectionName.toLowerCase())
    );
    
    if (sectionStart === -1) return text.substring(0, 200) + '...';
    
    const sectionEnd = lines.findIndex((line, index) => 
      index > sectionStart && line.trim() === ''
    );
    
    const endIndex = sectionEnd === -1 ? lines.length : sectionEnd;
    return lines.slice(sectionStart + 1, endIndex).join('\n').trim();
  }

  private extractArray(text: string, sectionName: string): string[] {
    const section = this.extractSection(text, sectionName);
    return section.split('\n')
      .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'))
      .map(line => line.replace(/^[-•]\s*/, '').trim());
  }
  // New helper methods for API integration
  
  private async generateClaudeResponse(userPrompt: string, systemPrompt: string): Promise<string> {
    try {
      const claudeKey = import.meta.env.VITE_CLAUDE_API_KEY;
      if (!claudeKey) {
        console.warn('No Claude API key available, using fallback');
        return 'The cosmic energies swirl with ancient wisdom, revealing insights through the mystical veil of The Dark Carnival.';
      }

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': claudeKey,
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
      return data.content
        .filter((item: any) => item.type === 'text')
        .map((item: any) => item.text)
        .join('');

    } catch (error) {
      console.error('Claude API call failed:', error);
      return 'The cosmic energies swirl with ancient wisdom, revealing insights through the mystical veil of The Dark Carnival.';
    }
  }

  private async getCurrentCosmicInfluences(): Promise<string> {
    const perplexityKey = import.meta.env.VITE_PERPLEXITY_API_KEY;
    if (!perplexityKey) {
      return this.getFallbackCosmicInfluences();
    }

    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${perplexityKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-large-128k-online',
          messages: [{
            role: 'user',
            content: 'Current astronomical events, planetary alignments, moon phases, and cosmic phenomena happening right now that would be relevant for mystical tarot readings.'
          }],
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
    const perplexityKey = import.meta.env.VITE_PERPLEXITY_API_KEY;
    if (!perplexityKey) {
      return this.getFallbackCurrentEvents();
    }

    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${perplexityKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-large-128k-online',
          messages: [{
            role: 'user',
            content: `Current events and trends relevant to someone asking: "${question}". Include recent developments that would provide context for a mystical reading.`
          }],
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

  private getCurrentLunarPhase(): string {
    const now = new Date();
    const phases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
    const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const phaseIndex = Math.floor((dayOfYear % 29.5) / 29.5 * 8);
    return phases[phaseIndex] || 'Mysterious Moon';
  }

  private getFallbackCosmicInfluences(): string {
    return "The cosmic dance continues its eternal rhythm, with planetary energies shifting in mysterious patterns that influence all earthly affairs.";
  }

  private getFallbackCurrentEvents(): string {
    return "The world turns through cycles of change and transformation, reflecting the eternal patterns revealed in the cards.";
  }
}

export const enhancedTarotAI = EnhancedTarotAI.getInstance();