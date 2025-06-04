/**
 * Rate Limiter for The Dark Carnival
 * Manages API rate limits across multiple providers with intelligent switching
 */

export interface RateLimit {
  requests: number;
  windowMs: number;
  remaining: number;
  resetTime: number;
}

export interface ProviderLimits {
  [provider: string]: {
    daily: number;
    hourly: number;
    minutely: number;
    concurrent: number;
  };
}

export interface UsageStats {
  provider: string;
  requests: number;
  errors: number;
  avgResponseTime: number;
  lastUsed: number;
  successRate: number;
}

export class RateLimiter {
  private usage = new Map<string, any[]>();
  private providers: ProviderLimits;
  private stats = new Map<string, UsageStats>();
  private activeRequests = new Map<string, number>();

  constructor() {
    this.providers = {
      'claude': {
        daily: 1000,
        hourly: 100,
        minutely: 10,
        concurrent: 5
      },
      'perplexity': {
        daily: 2000,
        hourly: 200,
        minutely: 20,
        concurrent: 10
      },
      'astronomy': {
        daily: 1000,
        hourly: 100,
        minutely: 15,
        concurrent: 3
      },
      'gemini': {
        daily: 1500,
        hourly: 60,
        minutely: 15,
        concurrent: 8
      },
      'groq': {
        daily: 5000,
        hourly: 500,
        minutely: 30,
        concurrent: 15
      }
    };

    // Initialize stats for each provider
    Object.keys(this.providers).forEach(provider => {
      this.stats.set(provider, {
        provider,
        requests: 0,
        errors: 0,
        avgResponseTime: 0,
        lastUsed: 0,
        successRate: 1.0
      });
    });

    // Cleanup old usage data every 5 minutes
    setInterval(() => this.cleanupOldUsage(), 300000);
  }

  /**
   * Check if a request can be made to a specific provider
   */
  async canMakeRequest(provider: string): Promise<boolean> {
    const limits = this.providers[provider];
    if (!limits) return true;

    const now = Date.now();
    const usage = this.getUsageForProvider(provider);

    // Check concurrent requests
    const concurrent = this.activeRequests.get(provider) || 0;
    if (concurrent >= limits.concurrent) {
      console.warn(`${provider}: Concurrent limit reached (${concurrent}/${limits.concurrent})`);
      return false;
    }

    // Check minutely limit
    const minutelyRequests = usage.filter(time => now - time < 60000).length;
    if (minutelyRequests >= limits.minutely) {
      console.warn(`${provider}: Minutely limit reached (${minutelyRequests}/${limits.minutely})`);
      return false;
    }

    // Check hourly limit
    const hourlyRequests = usage.filter(time => now - time < 3600000).length;
    if (hourlyRequests >= limits.hourly) {
      console.warn(`${provider}: Hourly limit reached (${hourlyRequests}/${limits.hourly})`);
      return false;
    }

    // Check daily limit
    const dailyRequests = usage.filter(time => now - time < 86400000).length;
    if (dailyRequests >= limits.daily) {
      console.warn(`${provider}: Daily limit reached (${dailyRequests}/${limits.daily})`);
      return false;
    }

    return true;
  }

  /**
   * Record a request start
   */
  async recordRequestStart(provider: string): Promise<void> {
    const now = Date.now();
    const usage = this.getUsageForProvider(provider);
    usage.push(now);

    // Increment concurrent requests
    const concurrent = this.activeRequests.get(provider) || 0;
    this.activeRequests.set(provider, concurrent + 1);

    // Update stats
    const stats = this.stats.get(provider);
    if (stats) {
      stats.requests++;
      stats.lastUsed = now;
    }
  }

  /**
   * Record a request completion
   */
  async recordRequestEnd(provider: string, success: boolean, responseTime: number): Promise<void> {
    // Decrement concurrent requests
    const concurrent = this.activeRequests.get(provider) || 0;
    this.activeRequests.set(provider, Math.max(0, concurrent - 1));

    // Update stats
    const stats = this.stats.get(provider);
    if (stats) {
      if (!success) {
        stats.errors++;
      }

      // Update average response time
      const totalRequests = stats.requests;
      stats.avgResponseTime = ((stats.avgResponseTime * (totalRequests - 1)) + responseTime) / totalRequests;

      // Update success rate
      stats.successRate = (totalRequests - stats.errors) / totalRequests;
    }
  }

  /**
   * Get the best available provider for a request type
   */
  getBestProvider(requestType: 'astrology' | 'tarot' | 'fortune' | 'spirit' | 'search'): string {
    const providers = this.getProvidersForRequestType(requestType);
    
    // Filter to only available providers
    const availableProviders = providers.filter(provider => {
      return this.canMakeRequestSync(provider);
    });

    if (availableProviders.length === 0) {
      console.warn('No providers available, returning first in list');
      return providers[0];
    }

    // Score providers based on success rate, response time, and availability
    const scored = availableProviders.map(provider => {
      const stats = this.stats.get(provider);
      if (!stats) return { provider, score: 0 };

      const successScore = stats.successRate * 100;
      const speedScore = stats.avgResponseTime > 0 ? Math.max(0, 100 - stats.avgResponseTime / 100) : 50;
      const availability = this.getAvailabilityScore(provider);

      const score = (successScore * 0.4) + (speedScore * 0.3) + (availability * 0.3);
      return { provider, score };
    });

    // Sort by score and return the best
    scored.sort((a, b) => b.score - a.score);
    
    console.log(`Best provider for ${requestType}: ${scored[0].provider} (score: ${scored[0].score.toFixed(2)})`);
    return scored[0].provider;
  }

  /**
   * Check rate limits for application type
   */
  async checkLimits(applicationType: string): Promise<void> {
    const provider = this.getBestProvider(applicationType as any);
    
    if (!await this.canMakeRequest(provider)) {
      throw new Error(`Rate limit exceeded for ${provider}. Please wait before making another request.`);
    }
  }

  /**
   * Get usage statistics for all providers
   */
  getUsageStats(): Map<string, UsageStats> {
    return new Map(this.stats);
  }

  /**
   * Get remaining requests for a provider
   */
  getRemainingRequests(provider: string): { daily: number; hourly: number; minutely: number } {
    const limits = this.providers[provider];
    if (!limits) return { daily: 999, hourly: 999, minutely: 999 };

    const now = Date.now();
    const usage = this.getUsageForProvider(provider);

    const dailyUsed = usage.filter(time => now - time < 86400000).length;
    const hourlyUsed = usage.filter(time => now - time < 3600000).length;
    const minutelyUsed = usage.filter(time => now - time < 60000).length;

    return {
      daily: Math.max(0, limits.daily - dailyUsed),
      hourly: Math.max(0, limits.hourly - hourlyUsed),
      minutely: Math.max(0, limits.minutely - minutelyUsed)
    };
  }

  /**
   * Get next reset time for a provider
   */
  getNextResetTime(provider: string): { minutely: number; hourly: number; daily: number } {
    const usage = this.getUsageForProvider(provider);
    const now = Date.now();

    const oldestMinutely = usage.find(time => now - time < 60000);
    const oldestHourly = usage.find(time => now - time < 3600000);
    const oldestDaily = usage.find(time => now - time < 86400000);

    return {
      minutely: oldestMinutely ? oldestMinutely + 60000 : now,
      hourly: oldestHourly ? oldestHourly + 3600000 : now,
      daily: oldestDaily ? oldestDaily + 86400000 : now
    };
  }

  /**
   * Wait for a provider to become available
   */
  async waitForAvailability(provider: string, maxWaitMs: number = 60000): Promise<boolean> {
    const startTime = Date.now();
    
    while (Date.now() - startTime < maxWaitMs) {
      if (await this.canMakeRequest(provider)) {
        return true;
      }
      
      // Wait 1 second before checking again
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    return false;
  }

  /**
   * Update provider limits (for dynamic adjustment)
   */
  updateProviderLimits(provider: string, limits: Partial<typeof this.providers['claude']>): void {
    if (this.providers[provider]) {
      this.providers[provider] = { ...this.providers[provider], ...limits };
      console.log(`Updated limits for ${provider}:`, this.providers[provider]);
    }
  }

  // Private helper methods

  private getUsageForProvider(provider: string): number[] {
    if (!this.usage.has(provider)) {
      this.usage.set(provider, []);
    }
    return this.usage.get(provider)!;
  }

  private canMakeRequestSync(provider: string): boolean {
    const limits = this.providers[provider];
    if (!limits) return true;

    const now = Date.now();
    const usage = this.getUsageForProvider(provider);

    // Quick check for concurrent requests
    const concurrent = this.activeRequests.get(provider) || 0;
    if (concurrent >= limits.concurrent) return false;

    // Quick check for minutely limit
    const minutelyRequests = usage.filter(time => now - time < 60000).length;
    return minutelyRequests < limits.minutely;
  }

  private getProvidersForRequestType(requestType: string): string[] {
    switch (requestType) {
      case 'astrology':
        return ['claude', 'gemini', 'perplexity'];
      case 'tarot':
        return ['claude', 'gemini', 'groq'];
      case 'fortune':
        return ['claude', 'perplexity', 'gemini'];
      case 'spirit':
        return ['claude', 'groq', 'gemini'];
      case 'search':
        return ['perplexity', 'gemini'];
      default:
        return ['claude', 'gemini', 'groq'];
    }
  }

  private getAvailabilityScore(provider: string): number {
    const remaining = this.getRemainingRequests(provider);
    const limits = this.providers[provider];
    
    if (!limits) return 100;

    // Score based on remaining capacity
    const dailyScore = (remaining.daily / limits.daily) * 100;
    const hourlyScore = (remaining.hourly / limits.hourly) * 100;
    const minutelyScore = (remaining.minutely / limits.minutely) * 100;

    // Return the lowest score (most restrictive limit)
    return Math.min(dailyScore, hourlyScore, minutelyScore);
  }

  private cleanupOldUsage(): void {
    const cutoff = Date.now() - 86400000; // 24 hours ago
    
    for (const [provider, usage] of this.usage.entries()) {
      const filtered = usage.filter(time => time > cutoff);
      this.usage.set(provider, filtered);
    }
  }

  /**
   * Reset all usage data (for testing or manual reset)
   */
  resetUsage(): void {
    this.usage.clear();
    this.activeRequests.clear();
    
    Object.keys(this.providers).forEach(provider => {
      this.stats.set(provider, {
        provider,
        requests: 0,
        errors: 0,
        avgResponseTime: 0,
        lastUsed: 0,
        successRate: 1.0
      });
    });
  }

  /**
   * Get a summary of current rate limit status
   */
  getStatusSummary(): any {
    const summary: any = {};
    
    Object.keys(this.providers).forEach(provider => {
      const remaining = this.getRemainingRequests(provider);
      const stats = this.stats.get(provider);
      const concurrent = this.activeRequests.get(provider) || 0;
      
      summary[provider] = {
        remaining,
        concurrent,
        stats: stats || null,
        available: this.canMakeRequestSync(provider)
      };
    });
    
    return summary;
  }
}

export default RateLimiter;