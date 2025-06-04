/**
 * Perplexity API Client for The Dark Carnival
 * Provides real-time internet search capabilities with mystical context
 */

export interface PerplexityResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    finish_reason: string;
    message: {
      role: string;
      content: string;
    };
    delta?: {
      role?: string;
      content?: string;
    };
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class PerplexityClient {
  private apiKey: string;
  private endpoint = 'https://api.perplexity.ai/chat/completions';
  private model = 'llama-3.1-sonar-large-128k-online'; // Best model for search
  private retryCount = 0;
  private maxRetries = 3;

  constructor() {
    this.apiKey = import.meta.env.VITE_PERPLEXITY_API_KEY || '';
    if (!this.apiKey) {
      console.warn('No Perplexity API key found. Internet search features will be limited.');
    }
  }

  /**
   * Search for current cosmic events and astronomical phenomena
   */
  async searchCosmicEvents(location: string, timeframe: string): Promise<string> {
    if (!this.apiKey) {
      return this.getFallbackCosmicEvents();
    }

    const searchQuery = `
      Current astronomical events, planetary alignments, meteor showers, eclipses, 
      and cosmic phenomena visible from ${location} in the ${timeframe}.
      Include any significant astrological transits, retrogrades, or celestial events happening now.
      Focus on events that would be relevant for mystical or astrological interpretations.
    `;

    try {
      const response = await this.search(searchQuery);
      return response || this.getFallbackCosmicEvents();
    } catch (error) {
      console.warn('Failed to fetch cosmic events:', error);
      return this.getFallbackCosmicEvents();
    }
  }

  /**
   * Search for personalized context based on user's birth details
   */
  async searchPersonalizedContext(userDetails: any): Promise<string> {
    if (!this.apiKey) {
      return this.getFallbackPersonalContext();
    }

    const searchQuery = `
      Current events, trends, and developments relevant to people born on ${userDetails.birthDate}
      in ${userDetails.birthLocation}. What significant things are happening in the world right now
      that might affect someone with ${userDetails.zodiacSign || 'their astrological'} energy?
      Include economic, social, technological, or cultural trends that would impact their life path.
    `;

    try {
      const response = await this.search(searchQuery);
      return response || this.getFallbackPersonalContext();
    } catch (error) {
      console.warn('Failed to fetch personalized context:', error);
      return this.getFallbackPersonalContext();
    }
  }

  /**
   * Search for relevant context for tarot questions
   */
  async searchRelevantContext(question: string): Promise<string> {
    if (!this.apiKey) {
      return this.getFallbackTarotContext();
    }

    const searchQuery = `
      Current events, trends, and cultural developments relevant to: "${question}"
      Include recent news, social movements, economic trends, or technological changes
      that would provide context for someone asking this question in a mystical reading.
    `;

    try {
      const response = await this.search(searchQuery);
      return response || this.getFallbackTarotContext();
    } catch (error) {
      console.warn('Failed to fetch tarot context:', error);
      return this.getFallbackTarotContext();
    }
  }

  /**
   * Search for future trends and predictions
   */
  async searchFutureTrends(userDetails: any): Promise<string> {
    if (!this.apiKey) {
      return this.getFallbackFutureTrends();
    }

    const searchQuery = `
      Future predictions, emerging trends, technological developments, and societal changes
      expected in the next 1-5 years. Include predictions from futurists, economic forecasts,
      technological roadmaps, and social trend analyses. Focus on developments that would
      impact someone living in ${userDetails.location || 'the world'} in their profession or lifestyle.
    `;

    try {
      const response = await this.search(searchQuery);
      return response || this.getFallbackFutureTrends();
    } catch (error) {
      console.warn('Failed to fetch future trends:', error);
      return this.getFallbackFutureTrends();
    }
  }

  /**
   * Search for life expectancy and health statistics
   */
  async searchLifeExpectancy(userData: any): Promise<string> {
    if (!this.apiKey) {
      return this.getFallbackLifeStats();
    }

    const location = userData.location || 'global';
    const age = userData.age || 'unknown age';
    const occupation = userData.occupation || 'general population';

    const searchQuery = `
      Current life expectancy statistics for ${age} year old in ${location}
      working in ${occupation}. Include mortality risk factors, health trends,
      and statistical life expectancy data from recent studies and government sources.
      Focus on actuarial data and health statistics.
    `;

    try {
      const response = await this.search(searchQuery);
      return response || this.getFallbackLifeStats();
    } catch (error) {
      console.warn('Failed to fetch life expectancy data:', error);
      return this.getFallbackLifeStats();
    }
  }

  /**
   * Generic search method with retry logic
   */
  private async search(query: string): Promise<string> {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'You are a research assistant. Provide accurate, current information based on your search capabilities. Focus on factual, verifiable information.'
            },
            {
              role: 'user',
              content: query
            }
          ],
          max_tokens: 1000,
          temperature: 0.3,
          top_p: 0.9,
          search_domain_filter: ["perplexity.ai"],
          return_images: false,
          return_related_questions: false,
          search_recency_filter: "month",
          top_k: 0,
          stream: false,
          presence_penalty: 0,
          frequency_penalty: 1
        })
      });

      if (!response.ok) {
        throw new Error(`Perplexity API Error: ${response.status} ${response.statusText}`);
      }

      const data: PerplexityResponse = await response.json();
      
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content;
      } else {
        throw new Error('No response content from Perplexity API');
      }

    } catch (error) {
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        console.warn(`Perplexity search failed, retrying (${this.retryCount}/${this.maxRetries})...`);
        await new Promise(resolve => setTimeout(resolve, 1000 * this.retryCount));
        return this.search(query);
      }
      
      this.retryCount = 0;
      throw error;
    }
  }

  // Fallback methods for when API is unavailable

  private getFallbackCosmicEvents(): string {
    return `
      The cosmic veil is drawn, but ancient energies still pulse through the void.
      Mercury weaves its silver thread through the star-drunk sky, while Venus
      whispers secrets to the moon. The planetary dance continues its eternal
      rhythm, casting shadows and light across the carnival of existence.
      
      Current celestial energies suggest a time of transition and mystical awakening.
      The stars speak of hidden knowledge emerging and cosmic forces aligning
      for those who dare to listen to the whispers between worlds.
    `;
  }

  private getFallbackPersonalContext(): string {
    return `
      The threads of fate weave complex patterns in these times of change.
      Global energies shift like carnival lights, creating new opportunities
      and challenges for souls walking the earthly plane. Technology and
      tradition dance together in an ancient waltz, while the collective
      consciousness awakens to deeper mysteries.
      
      For those attuned to the cosmic frequencies, this period offers
      profound transformation and the chance to align with higher purposes.
    `;
  }

  private getFallbackTarotContext(): string {
    return `
      The world turns on the axis of change, and the collective unconscious
      stirs with new dreams and ancient fears. Current energies speak of
      transformation, revelation, and the need to trust inner wisdom
      over external appearances.
      
      The cosmic forces align to support those who seek truth and
      authenticity in their path forward.
    `;
  }

  private getFallbackFutureTrends(): string {
    return `
      The future unfolds like a dark carnival tent, revealing glimpses
      of technological marvels and spiritual awakenings. Artificial
      consciousness and human intuition dance together in strange harmony,
      while the boundaries between digital and mystical realms continue
      to blur.
      
      Great changes approach on silent wings, bringing both challenge
      and opportunity for those prepared to embrace the unknown.
    `;
  }

  private getFallbackLifeStats(): string {
    return `
      The mortal coil spins its ancient dance, marked by the rhythm
      of breath and heartbeat. Statistical patterns emerge from the
      vast tapestry of human experience, suggesting the average soul
      enjoys between seven and eight decades of earthly carnival,
      though individual paths vary greatly based on choices made
      and chances taken.
      
      The digital age brings both new perils and new possibilities
      for extending the sacred dance of existence.
    `;
  }

  /**
   * Test the API connection
   */
  async testConnection(): Promise<boolean> {
    if (!this.apiKey) {
      return false;
    }

    try {
      const response = await this.search("What is the current date and time?");
      return response.length > 0;
    } catch (error) {
      console.error('Perplexity connection test failed:', error);
      return false;
    }
  }
}

export default PerplexityClient;