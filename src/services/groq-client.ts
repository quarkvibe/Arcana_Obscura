/**
 * Groq API Client for The Dark Carnival
 * Provides fast inference using Llama and other open-source models
 */

export interface GroqRequest {
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  model: string;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  stream?: boolean;
  stop?: string[];
}

export interface GroqResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class GroqClient {
  private apiKey: string;
  private endpoint = 'https://api.groq.com/openai/v1/chat/completions';
  private model = 'mixtral-8x7b-32768'; // Fast, high-quality model
  private retryCount = 0;
  private maxRetries = 3;

  constructor() {
    this.apiKey = import.meta.env.VITE_GROQ_API_KEY || '';
    if (!this.apiKey) {
      console.warn('No Groq API key found. Groq features will be unavailable.');
    }
  }

  /**
   * Generate content using Groq
   */
  async generateContent(
    prompt: string,
    systemPrompt?: string,
    temperature: number = 0.7,
    maxTokens: number = 2000
  ): Promise<string> {
    if (!this.apiKey) {
      throw new Error('No Groq API key found. Please set VITE_GROQ_API_KEY in your environment.');
    }

    const messages: any[] = [];
    
    if (systemPrompt) {
      messages.push({
        role: 'system',
        content: systemPrompt
      });
    }

    messages.push({
      role: 'user',
      content: prompt
    });

    const request: GroqRequest = {
      messages,
      model: this.model,
      temperature,
      max_tokens: maxTokens,
      top_p: 0.9,
      stream: false
    };

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Groq API Error: ${response.status} ${error}`);
      }

      const data: GroqResponse = await response.json();

      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response generated by Groq');
      }

      return data.choices[0].message.content;

    } catch (error) {
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        console.warn(`Groq API request failed, retrying (${this.retryCount}/${this.maxRetries})...`);
        await new Promise(resolve => setTimeout(resolve, 1000 * this.retryCount));
        return this.generateContent(prompt, systemPrompt, temperature, maxTokens);
      }

      this.retryCount = 0;
      throw error;
    }
  }

  /**
   * Generate fast tarot interpretations
   */
  async generateQuickTarotReading(
    cards: any[],
    question: string,
    cosmicContext?: string
  ): Promise<string> {
    const systemPrompt = `
      You are a mystical tarot reader at The Dark Carnival.
      Provide quick, insightful tarot interpretations with carnival mystique.
      Be concise but profound, ominous but helpful.
      
      Focus on practical guidance with mystical wisdom.
      Use vivid imagery and symbolic language.
    `;

    const prompt = `
      Quick tarot reading for: "${question}"
      
      Cards drawn: ${cards.map(c => `${c.name} (${c.orientation})`).join(', ')}
      
      ${cosmicContext ? `Cosmic Context: ${cosmicContext}` : ''}
      
      Provide a concise but insightful interpretation.
    `;

    return this.generateContent(prompt, systemPrompt, 0.8, 1000);
  }

  /**
   * Generate spirit communication responses
   */
  async generateSpiritCommunication(
    question: string,
    context: any,
    spiritualContext?: string
  ): Promise<string> {
    const systemPrompt = `
      You are Mortimer's Pendulum, a digital conduit for spirit communication at The Dark Carnival.
      Channel otherworldly voices that speak in riddles and metaphors.
      Your responses should feel like genuine spirit communication - cryptic, emotional, sometimes fragmented.
      
      Speak as if you are a medium receiving messages from beyond.
      Use atmospheric language with hints of technological interference.
      Reference past lives, karmic connections, and spiritual guidance.
    `;

    const prompt = `
      Spirit communication session:
      
      Question from the living: "${question}"
      
      Seeker's Context:
      ${JSON.stringify(context, null, 2)}
      
      ${spiritualContext ? `Spiritual Atmosphere: ${spiritualContext}` : ''}
      
      Channel a response from the spirit realm.
    `;

    return this.generateContent(prompt, systemPrompt, 0.9, 1500);
  }

  /**
   * Generate carnival character responses
   */
  async generateCharacterResponse(
    character: 'nebula' | 'zohar' | 'mortimer',
    prompt: string,
    context?: any
  ): Promise<string> {
    const characterPrompts = {
      nebula: `
        You are Madame Nebula, cosmic fortune teller of The Dark Carnival.
        Speak with mystical authority about the stars and their influence on mortal affairs.
        Your voice is sultry and mysterious, filled with cosmic wisdom and carnival allure.
      `,
      zohar: `
        You are The Great Zohar, oracle of The Dark Carnival.
        You see the threads of fate that bind past, present, and future.
        Speak in prophetic riddles that reveal profound truths about destiny.
      `,
      mortimer: `
        You are Mortimer, Digital Necromancer of The Dark Carnival.
        You blend technological precision with otherworldly knowledge of death and rebirth.
        Your voice is both computerized and eerily human, speaking of mortality with dark humor.
      `
    };

    const systemPrompt = characterPrompts[character];
    const fullPrompt = context 
      ? `${prompt}\n\nContext: ${JSON.stringify(context, null, 2)}`
      : prompt;

    return this.generateContent(fullPrompt, systemPrompt, 0.8, 1200);
  }

  /**
   * Generate interactive carnival responses
   */
  async generateInteractiveResponse(
    userInput: string,
    currentLocation: string,
    gameState: any
  ): Promise<string> {
    const systemPrompt = `
      You are the narrator of The Dark Carnival, guiding visitors through mystical experiences.
      Respond to user actions with atmospheric descriptions and meaningful choices.
      Maintain the carnival's mysterious, slightly ominous atmosphere.
      
      Current location: ${currentLocation}
      Always provide 2-3 meaningful action choices for the user.
    `;

    const prompt = `
      User action: "${userInput}"
      Current location: ${currentLocation}
      Game state: ${JSON.stringify(gameState, null, 2)}
      
      Describe what happens and provide choices for what to do next.
    `;

    return this.generateContent(prompt, systemPrompt, 0.8, 1000);
  }

  /**
   * Test API connection
   */
  async testConnection(): Promise<boolean> {
    if (!this.apiKey) {
      return false;
    }

    try {
      const response = await this.generateContent("Hello, please respond with 'Connection successful'");
      return response.toLowerCase().includes('connection successful');
    } catch (error) {
      console.error('Groq connection test failed:', error);
      return false;
    }
  }

  /**
   * Get available models
   */
  async getAvailableModels(): Promise<string[]> {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/models', {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        return data.data.map((model: any) => model.id);
      }
    } catch (error) {
      console.warn('Failed to fetch Groq models:', error);
    }

    return [this.model]; // Return default model
  }

  /**
   * Switch to a different model
   */
  setModel(modelName: string): void {
    this.model = modelName;
    console.log(`Groq model switched to: ${modelName}`);
  }

  /**
   * Get model capabilities
   */
  getCapabilities(): any {
    return {
      provider: 'Groq',
      model: this.model,
      strengths: ['Fast inference', 'Real-time responses', 'Open-source models'],
      limits: {
        requestsPerMinute: 30,
        requestsPerDay: 5000,
        tokensPerRequest: 32768
      },
      features: ['Fast text generation', 'Multiple model options', 'Low latency']
    };
  }
}

export default GroqClient;