/**
 * Enhanced AI Orchestrator for The Dark Carnival
 * Combines Claude, Perplexity, and real astronomical data for intelligent mystical experiences
 */

import { ClaudeClient } from './claude-client';
import { PerplexityClient } from './perplexity-client';
import { AstronomyAPIClient } from './astronomy-api';
import { CacheService } from './cache-service';
import { RateLimiter } from './rate-limiter';

export interface UserDetails {
  name: string;
  birthDate: string;
  birthTime: string;
  birthLocation: string;
  zodiacSign?: string;
  readingType: 'QUICK' | 'FULL' | 'DEEP_DIVE' | 'COMPATIBILITY';
  partnerDetails?: UserDetails;
}

export interface StarChart {
  planets: PlanetaryPosition[];
  houses: House[];
  transits: Transit[];
  aspects: Aspect[];
  chartImage?: string;
  accuracy: 'PROFESSIONAL_GRADE' | 'ESTIMATED' | 'FALLBACK';
}

export interface PlanetaryPosition {
  name: string;
  sign: string;
  degree: number;
  minute: number;
  house: number;
  retrograde: boolean;
}

export interface House {
  number: number;
  sign: string;
  degree: number;
  ruler: string;
}

export interface Transit {
  planet: string;
  aspect: string;
  targetPlanet: string;
  orb: number;
  isExact: boolean;
  peakDate: string;
}

export interface Aspect {
  planet1: string;
  planet2: string;
  type: 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile' | 'quincunx';
  orb: number;
  applying: boolean;
}

export interface CompleteReading {
  starChart: StarChart;
  cosmicEvents: string;
  mysticalReading: string;
  personalContext: string;
  accuracy: 'PROFESSIONAL_GRADE' | 'ENHANCED' | 'STANDARD';
  generatedAt: number;
  userDetails: UserDetails;
}

export class EnhancedAIOrchestrator {
  private static instance: EnhancedAIOrchestrator;
  private claude: ClaudeClient;
  private perplexity: PerplexityClient;
  private astronomy: AstronomyAPIClient;
  private cache: CacheService;
  private rateLimiter: RateLimiter;

  private constructor() {
    this.claude = ClaudeClient.getInstance();
    this.perplexity = new PerplexityClient();
    this.astronomy = new AstronomyAPIClient();
    this.cache = new CacheService();
    this.rateLimiter = new RateLimiter();
  }

  static getInstance(): EnhancedAIOrchestrator {
    if (!EnhancedAIOrchestrator.instance) {
      EnhancedAIOrchestrator.instance = new EnhancedAIOrchestrator();
    }
    return EnhancedAIOrchestrator.instance;
  }

  /**
   * Generates a complete astrological reading with real astronomical data and current cosmic events
   */
  async generateSmartAstrologicalReading(userDetails: UserDetails): Promise<CompleteReading> {
    console.log('Generating smart astrological reading for:', userDetails.name);

    try {
      // Check cache first
      const cacheKey = this.cache.generateKey('astrology', userDetails);
      const cached = await this.cache.get(cacheKey);
      if (cached) {
        console.log('Returning cached reading');
        return cached;
      }

      // Check rate limits
      await this.rateLimiter.checkLimits('astrology');

      // Phase 1: Gather Real Data in parallel
      const [starChart, cosmicEvents, personalContext] = await Promise.all([
        this.getDetailedStarChart(userDetails),
        this.getCurrentCosmicEvents(userDetails.birthLocation),
        this.getPersonalizedContext(userDetails)
      ]);

      console.log('Gathered real data, generating mystical interpretation...');

      // Phase 2: Generate Mystical Interpretation with Claude
      const mysticalReading = await this.generateMysticalReading(userDetails, starChart, cosmicEvents, personalContext);

      const completeReading: CompleteReading = {
        starChart,
        cosmicEvents,
        mysticalReading,
        personalContext,
        accuracy: starChart.accuracy === 'PROFESSIONAL_GRADE' ? 'PROFESSIONAL_GRADE' : 'ENHANCED',
        generatedAt: Date.now(),
        userDetails
      };

      // Cache the result
      await this.cache.set(cacheKey, completeReading, 3600000); // Cache for 1 hour

      return completeReading;

    } catch (error) {
      console.error('Error generating smart astrological reading:', error);
      
      // Fallback to basic reading
      return this.generateFallbackReading(userDetails);
    }
  }

  /**
   * Generates enhanced tarot readings with current events integration
   */
  async generateSmartTarotReading(params: {
    cards: any[];
    spread: string;
    question: string;
    userLocation?: string;
  }): Promise<any> {
    try {
      // Get current cosmic energies and events
      const cosmicInfluences = await this.getCurrentCosmicEvents(params.userLocation || 'global');
      
      // Get current events relevant to the question
      const currentEvents = await this.perplexity.searchRelevantContext(params.question);

      // Generate enhanced interpretation with Claude
      const systemPrompt = `
        You are a master tarot reader at The Dark Carnival with access to current cosmic energies and world events.
        Incorporate real cosmic influences and current events into your mystical interpretations.
        Be specific about how current planetary alignments and world happenings affect the reading.
        
        Current Cosmic Influences: ${cosmicInfluences}
        Relevant Current Events: ${currentEvents}
      `;

      const interpretation = await this.claude.generate(
        this.buildTarotPrompt(params, cosmicInfluences, currentEvents),
        systemPrompt,
        2000,
        0.8
      );

      return {
        interpretation,
        cosmicInfluences,
        currentEvents,
        cards: params.cards,
        spread: params.spread,
        enhancementLevel: 'COSMIC_AWARE'
      };

    } catch (error) {
      console.error('Error generating smart tarot reading:', error);
      throw error;
    }
  }

  /**
   * Generates enhanced fortune visions with real-world context
   */
  async generateSmartFortuneVision(userDetails: any): Promise<any> {
    try {
      // Get current trends and future predictions
      const futureTrends = await this.perplexity.searchFutureTrends(userDetails);
      
      // Get astrological transits for future periods
      const futureTransits = await this.astronomy.getFutureTransits(userDetails, 12); // 12 months

      const systemPrompt = `
        You are The Great Zohar, oracle of The Dark Carnival with access to cosmic and earthly knowledge.
        Weave together real astrological transits and emerging world trends into mystical visions.
        Reference specific future planetary movements and realistic future scenarios.
        
        Future Astrological Transits: ${JSON.stringify(futureTransits)}
        Emerging Trends: ${futureTrends}
      `;

      const vision = await this.claude.generate(
        this.buildVisionPrompt(userDetails, futureTransits, futureTrends),
        systemPrompt,
        2500,
        0.9
      );

      return {
        mainVision: vision,
        astrological: futureTransits,
        worldTrends: futureTrends,
        visionType: 'COSMIC_ENHANCED'
      };

    } catch (error) {
      console.error('Error generating smart fortune vision:', error);
      throw error;
    }
  }

  /**
   * Generates death predictions with statistical and astrological backing
   */
  async generateSmartDeathPrediction(userData: any): Promise<any> {
    try {
      // Get statistical life expectancy data
      const lifeStats = await this.perplexity.searchLifeExpectancy(userData);
      
      // Get challenging astrological transits
      const challengingTransits = await this.astronomy.getChallengingTransits(userData);

      const systemPrompt = `
        You are Mortimer, Digital Necromancer, with access to actuarial data and cosmic timing.
        Combine real statistical probabilities with astrological timing for unsettling accuracy.
        Reference actual life expectancy data and specific challenging planetary periods.
        
        Statistical Context: ${lifeStats}
        Challenging Transits: ${JSON.stringify(challengingTransits)}
      `;

      const prediction = await this.claude.generate(
        this.buildDeathPredictionPrompt(userData, lifeStats, challengingTransits),
        systemPrompt,
        1500,
        0.7
      );

      return {
        prediction,
        statisticalBasis: lifeStats,
        astrologicalTiming: challengingTransits,
        predictionType: 'DATA_ENHANCED'
      };

    } catch (error) {
      console.error('Error generating smart death prediction:', error);
      throw error;
    }
  }

  // Private helper methods

  private async getDetailedStarChart(userDetails: UserDetails): Promise<StarChart> {
    try {
      return await this.astronomy.getDetailedStarChart(userDetails);
    } catch (error) {
      console.warn('Failed to get detailed star chart, using fallback');
      return this.astronomy.generateFallbackChart(userDetails);
    }
  }

  private async getCurrentCosmicEvents(location: string): Promise<string> {
    try {
      return await this.perplexity.searchCosmicEvents(location, "next 3 months");
    } catch (error) {
      console.warn('Failed to get cosmic events');
      return "The cosmic veils are drawn tight, but ancient energies still flow...";
    }
  }

  private async getPersonalizedContext(userDetails: UserDetails): Promise<string> {
    try {
      return await this.perplexity.searchPersonalizedContext(userDetails);
    } catch (error) {
      console.warn('Failed to get personalized context');
      return "The threads of fate weave in mysterious patterns...";
    }
  }

  private async generateMysticalReading(
    userDetails: UserDetails,
    starChart: StarChart,
    cosmicEvents: string,
    personalContext: string
  ): Promise<string> {
    const systemPrompt = `
      You are Madame Nebula, master astrologer at The Dark Carnival with access to precise astronomical data and current cosmic events.
      Create a deeply personal, accurate astrological reading that incorporates:
      
      1. REAL astronomical positions and aspects with specific degrees
      2. CURRENT cosmic events happening now
      3. PERSONALIZED insights based on exact birth chart
      4. MYSTICAL carnival atmosphere with ominous undertones
      
      Be scientifically accurate with the astronomy while mystically creative with the interpretation.
      Reference specific degrees, aspects, and transits. Weave current events into cosmic significance.
      Structure as: Cosmic Overview → Detailed Chart Analysis → Current Influences → Future Predictions → Mystical Warnings
    `;

    const userPrompt = `
      Create a complete astrological reading for:
      
      === BIRTH DETAILS ===
      Name: ${userDetails.name}
      Birth: ${userDetails.birthDate} at ${userDetails.birthTime}
      Location: ${userDetails.birthLocation}
      Reading Type: ${userDetails.readingType}
      
      === PRECISE ASTRONOMICAL DATA ===
      ${this.formatStarChartData(starChart)}
      
      === CURRENT COSMIC EVENTS ===
      ${cosmicEvents}
      
      === PERSONAL CONTEXT ===
      ${personalContext}
      
      Create a mystical reading that weaves together all these elements with dark carnival mystique.
    `;

    return await this.claude.generate(userPrompt, systemPrompt, 2500, 0.8);
  }

  private formatStarChartData(starChart: StarChart): string {
    let formatted = "PLANETARY POSITIONS:\n";
    starChart.planets.forEach(planet => {
      formatted += `${planet.name}: ${planet.degree}°${planet.minute}' ${planet.sign} in House ${planet.house}${planet.retrograde ? ' (Retrograde)' : ''}\n`;
    });

    formatted += "\nMAJOR ASPECTS:\n";
    starChart.aspects.forEach(aspect => {
      formatted += `${aspect.planet1} ${aspect.type} ${aspect.planet2} (${aspect.orb}° orb)\n`;
    });

    formatted += "\nCURRENT TRANSITS:\n";
    starChart.transits.forEach(transit => {
      formatted += `${transit.planet} ${transit.aspect} natal ${transit.targetPlanet} (${transit.orb}° orb)${transit.isExact ? ' - EXACT' : ''}\n`;
    });

    return formatted;
  }

  private buildTarotPrompt(params: any, cosmicInfluences: string, currentEvents: string): string {
    return `
      Interpret this tarot spread with cosmic awareness:
      
      Cards: ${params.cards.map(c => `${c.name} (${c.orientation})`).join(', ')}
      Spread: ${params.spread}
      Question: ${params.question}
      
      Cosmic Context: ${cosmicInfluences}
      World Events: ${currentEvents}
      
      Weave the cosmic and earthly influences into the card meanings.
    `;
  }

  private buildVisionPrompt(userDetails: any, futureTransits: any, futureTrends: string): string {
    return `
      Generate mystical visions for:
      ${JSON.stringify(userDetails)}
      
      Future Astrological Events: ${JSON.stringify(futureTransits)}
      Emerging World Trends: ${futureTrends}
      
      Create two visions: one main path and one alternative, both grounded in real future possibilities.
    `;
  }

  private buildDeathPredictionPrompt(userData: any, lifeStats: string, challengingTransits: any): string {
    return `
      Generate death prediction for:
      ${JSON.stringify(userData)}
      
      Life Expectancy Data: ${lifeStats}
      Challenging Planetary Periods: ${JSON.stringify(challengingTransits)}
      
      Combine statistical probability with astrological timing for maximum unsettling accuracy.
    `;
  }

  private async generateFallbackReading(userDetails: UserDetails): Promise<CompleteReading> {
    const fallbackReading = await this.claude.generate(
      `Generate a mystical astrological reading for ${userDetails.name} born ${userDetails.birthDate} in ${userDetails.birthLocation}`,
      "You are Madame Nebula. Create a mystical reading despite limited cosmic access.",
      1500,
      0.8
    );

    return {
      starChart: this.astronomy.generateFallbackChart(userDetails),
      cosmicEvents: "The cosmic veils are drawn, but ancient energies flow...",
      mysticalReading: fallbackReading,
      personalContext: "The threads of fate weave in mysterious patterns...",
      accuracy: 'STANDARD',
      generatedAt: Date.now(),
      userDetails
    };
  }
}

export const enhancedAI = EnhancedAIOrchestrator.getInstance();