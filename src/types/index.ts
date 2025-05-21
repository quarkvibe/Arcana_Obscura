// Card position in a spread
export interface Position {
  id: string;
  name: string;
  description: string;
}

// Tarot Card
export interface TarotCard {
  id: string;
  name: string;
  arcana: 'major' | 'minor';
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  number?: number;
  keywords: {
    upright: string[];
    reversed: string[];
  };
  meanings: {
    upright: string;
    reversed: string;
  };
  description: string;
  image: string;
  isReversed?: boolean;
  position?: Position;
}

// Tarot Spread
export interface TarotSpread {
  id: string;
  name: string;
  description: string;
  numCards: number;
  positions: Position[];
}

// Reading
export interface Reading {
  id: string;
  date: string;
  spread: TarotSpread;
  cards: TarotCard[];
  question: string;
  interpretation: string;
}