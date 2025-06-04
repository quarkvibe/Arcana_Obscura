/**
 * Cache Service for The Dark Carnival
 * Provides intelligent caching for API responses and expensive calculations
 */

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
  accessCount: number;
  lastAccessed: number;
}

export interface CacheStats {
  totalEntries: number;
  hitRate: number;
  missRate: number;
  totalHits: number;
  totalMisses: number;
  memoryUsage: number;
}

export class CacheService {
  private cache = new Map<string, CacheEntry<any>>();
  private maxSize = 1000;
  private defaultTTL = 3600000; // 1 hour in milliseconds
  private cleanupInterval: NodeJS.Timeout;
  private stats = {
    hits: 0,
    misses: 0,
    evictions: 0
  };

  constructor(maxSize: number = 1000, defaultTTL: number = 3600000) {
    this.maxSize = maxSize;
    this.defaultTTL = defaultTTL;
    
    // Start cleanup interval every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 300000);
  }

  /**
   * Generate a cache key from application type and parameters
   */
  generateKey(application: string, params: any): string {
    const paramString = JSON.stringify(params, Object.keys(params).sort());
    const hash = this.simpleHash(paramString);
    return `${application}:${hash}`;
  }

  /**
   * Get item from cache
   */
  async get<T>(key: string): Promise<T | null> {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.stats.misses++;
      return null;
    }

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      this.stats.misses++;
      return null;
    }

    // Update access stats
    entry.accessCount++;
    entry.lastAccessed = Date.now();
    this.stats.hits++;

    return entry.data;
  }

  /**
   * Set item in cache
   */
  async set<T>(key: string, data: T, ttl?: number): Promise<void> {
    const expiresAt = Date.now() + (ttl || this.defaultTTL);
    
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiresAt,
      accessCount: 0,
      lastAccessed: Date.now()
    };

    // Check if we need to evict items
    if (this.cache.size >= this.maxSize) {
      this.evictLeastRecentlyUsed();
    }

    this.cache.set(key, entry);
  }

  /**
   * Delete item from cache
   */
  async delete(key: string): Promise<boolean> {
    return this.cache.delete(key);
  }

  /**
   * Clear all cache entries
   */
  async clear(): Promise<void> {
    this.cache.clear();
    this.resetStats();
  }

  /**
   * Check if key exists in cache
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;
    
    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    const totalRequests = this.stats.hits + this.stats.misses;
    const hitRate = totalRequests > 0 ? this.stats.hits / totalRequests : 0;
    const missRate = totalRequests > 0 ? this.stats.misses / totalRequests : 0;
    
    return {
      totalEntries: this.cache.size,
      hitRate: Math.round(hitRate * 100) / 100,
      missRate: Math.round(missRate * 100) / 100,
      totalHits: this.stats.hits,
      totalMisses: this.stats.misses,
      memoryUsage: this.estimateMemoryUsage()
    };
  }

  /**
   * Get cached astrological reading if recent enough
   */
  async getCachedReading(userDetails: any, maxAge: number = 3600000): Promise<any | null> {
    const key = this.generateKey('astrology', {
      name: userDetails.name,
      birthDate: userDetails.birthDate,
      birthTime: userDetails.birthTime,
      birthLocation: userDetails.birthLocation,
      readingType: userDetails.readingType
    });
    
    const cached = await this.get(key);
    if (cached && (Date.now() - cached.generatedAt) < maxAge) {
      return cached;
    }
    
    return null;
  }

  /**
   * Cache cosmic events by location and timeframe
   */
  async cacheCosmicEvents(location: string, timeframe: string, events: string): Promise<void> {
    const key = this.generateKey('cosmic', { location, timeframe });
    await this.set(key, events, 1800000); // Cache for 30 minutes
  }

  /**
   * Get cached cosmic events
   */
  async getCachedCosmicEvents(location: string, timeframe: string): Promise<string | null> {
    const key = this.generateKey('cosmic', { location, timeframe });
    return await this.get(key);
  }

  /**
   * Cache planetary positions by date and location
   */
  async cachePlanetaryPositions(date: string, location: any, positions: any[]): Promise<void> {
    const key = this.generateKey('planets', { date, location });
    await this.set(key, positions, 86400000); // Cache for 24 hours
  }

  /**
   * Get cached planetary positions
   */
  async getCachedPlanetaryPositions(date: string, location: any): Promise<any[] | null> {
    const key = this.generateKey('planets', { date, location });
    return await this.get(key);
  }

  /**
   * Cache tarot interpretations
   */
  async cacheTarotInterpretation(cards: any[], spread: string, question: string, interpretation: any): Promise<void> {
    const key = this.generateKey('tarot', { 
      cards: cards.map(c => ({ name: c.name, orientation: c.orientation })),
      spread,
      question: this.normalizeQuestion(question)
    });
    await this.set(key, interpretation, 1800000); // Cache for 30 minutes
  }

  /**
   * Get cached tarot interpretation
   */
  async getCachedTarotInterpretation(cards: any[], spread: string, question: string): Promise<any | null> {
    const key = this.generateKey('tarot', { 
      cards: cards.map(c => ({ name: c.name, orientation: c.orientation })),
      spread,
      question: this.normalizeQuestion(question)
    });
    return await this.get(key);
  }

  /**
   * Cache search results from Perplexity
   */
  async cacheSearchResult(query: string, result: string): Promise<void> {
    const key = this.generateKey('search', { query: this.normalizeQuery(query) });
    await this.set(key, result, 1800000); // Cache for 30 minutes
  }

  /**
   * Get cached search result
   */
  async getCachedSearchResult(query: string): Promise<string | null> {
    const key = this.generateKey('search', { query: this.normalizeQuery(query) });
    return await this.get(key);
  }

  // Private helper methods

  private evictLeastRecentlyUsed(): void {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.lastAccessed < oldestTime) {
        oldestTime = entry.lastAccessed;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
      this.stats.evictions++;
    }
  }

  private cleanup(): void {
    const now = Date.now();
    const expiredKeys: string[] = [];

    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        expiredKeys.push(key);
      }
    }

    expiredKeys.forEach(key => this.cache.delete(key));
    
    if (expiredKeys.length > 0) {
      console.log(`Cache cleanup: removed ${expiredKeys.length} expired entries`);
    }
  }

  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  private estimateMemoryUsage(): number {
    let size = 0;
    for (const [key, entry] of this.cache.entries()) {
      size += key.length * 2; // Approximate string size
      size += JSON.stringify(entry.data).length * 2;
      size += 64; // Overhead for entry metadata
    }
    return Math.round(size / 1024); // Return in KB
  }

  private normalizeQuestion(question: string): string {
    return question.toLowerCase().trim().replace(/[^\w\s]/g, '');
  }

  private normalizeQuery(query: string): string {
    return query.toLowerCase().trim().replace(/\s+/g, ' ');
  }

  private resetStats(): void {
    this.stats = {
      hits: 0,
      misses: 0,
      evictions: 0
    };
  }

  /**
   * Cleanup when service is destroyed
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.cache.clear();
  }

  /**
   * Pre-warm cache with common queries
   */
  async preWarmCache(): Promise<void> {
    console.log('Pre-warming cache with common astrological data...');
    
    // Pre-calculate common zodiac information
    const commonSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                         'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    
    for (const sign of commonSigns) {
      const key = this.generateKey('zodiac', { sign });
      await this.set(key, this.getZodiacInfo(sign), 86400000); // Cache for 24 hours
    }
  }

  private getZodiacInfo(sign: string): any {
    const zodiacData: { [key: string]: any } = {
      'Aries': { element: 'Fire', quality: 'Cardinal', ruler: 'Mars', keywords: ['Initiative', 'Leadership', 'Courage'] },
      'Taurus': { element: 'Earth', quality: 'Fixed', ruler: 'Venus', keywords: ['Stability', 'Sensuality', 'Determination'] },
      'Gemini': { element: 'Air', quality: 'Mutable', ruler: 'Mercury', keywords: ['Communication', 'Curiosity', 'Adaptability'] },
      'Cancer': { element: 'Water', quality: 'Cardinal', ruler: 'Moon', keywords: ['Emotion', 'Nurturing', 'Intuition'] },
      'Leo': { element: 'Fire', quality: 'Fixed', ruler: 'Sun', keywords: ['Creativity', 'Drama', 'Confidence'] },
      'Virgo': { element: 'Earth', quality: 'Mutable', ruler: 'Mercury', keywords: ['Analysis', 'Service', 'Perfection'] },
      'Libra': { element: 'Air', quality: 'Cardinal', ruler: 'Venus', keywords: ['Balance', 'Harmony', 'Relationships'] },
      'Scorpio': { element: 'Water', quality: 'Fixed', ruler: 'Pluto', keywords: ['Transformation', 'Intensity', 'Mystery'] },
      'Sagittarius': { element: 'Fire', quality: 'Mutable', ruler: 'Jupiter', keywords: ['Adventure', 'Philosophy', 'Freedom'] },
      'Capricorn': { element: 'Earth', quality: 'Cardinal', ruler: 'Saturn', keywords: ['Ambition', 'Structure', 'Responsibility'] },
      'Aquarius': { element: 'Air', quality: 'Fixed', ruler: 'Uranus', keywords: ['Innovation', 'Humanitarianism', 'Independence'] },
      'Pisces': { element: 'Water', quality: 'Mutable', ruler: 'Neptune', keywords: ['Spirituality', 'Compassion', 'Imagination'] }
    };
    
    return zodiacData[sign] || {};
  }
}

export default CacheService;