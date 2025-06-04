/**
 * Enhanced Tarot Spreads for Arcana Obscura
 * Mystical carnival-themed spreads with cosmic timing integration
 */

export interface EnhancedTarotSpread {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'master';
  theme: 'love' | 'career' | 'spiritual' | 'general' | 'specific';
  cosmicTiming?: {
    bestMoonPhases: string[];
    astrologicalConsiderations: string;
    seasonalRecommendations: string;
  };
  positions: SpreadPosition[];
  interpretation: {
    overview: string;
    focusAreas: string[];
    connectionPatterns: string[];
  };
  carnivalImagery: string;
  educationalNotes: string;
  historicalOrigin: string;
}

export interface SpreadPosition {
  index: number;
  name: string;
  meaning: string;
  keywords: string[];
  carnivalMetaphor: string;
  astrologicalAssociation?: string;
  coordinates: {
    x: number;
    y: number;
  };
}

// BEGINNER SPREADS
export const beginnerSpreads: EnhancedTarotSpread[] = [
  {
    id: "carnival-entrance",
    name: "The Carnival Entrance",
    description: "A simple 3-card spread perfect for newcomers to the mystical arts. Represents crossing the threshold into deeper understanding.",
    cardCount: 3,
    difficulty: "beginner",
    theme: "general",
    cosmicTiming: {
      bestMoonPhases: ["New Moon", "Waxing Crescent"],
      astrologicalConsiderations: "Best during Mercury direct periods for clear communication",
      seasonalRecommendations: "Spring for new beginnings, any season for general guidance"
    },
    positions: [
      {
        index: 0,
        name: "The Gate",
        meaning: "Current situation or challenge you're facing",
        keywords: ["present", "obstacles", "current state"],
        carnivalMetaphor: "The ornate entrance gate - what stands before you as you approach new possibilities",
        coordinates: { x: 20, y: 50 }
      },
      {
        index: 1,
        name: "The Ticket Master",
        meaning: "What you need to know or understand",
        keywords: ["knowledge", "awareness", "hidden factors"],
        carnivalMetaphor: "The mysterious ticket master who knows the price of admission to deeper truths",
        coordinates: { x: 50, y: 30 }
      },
      {
        index: 2,
        name: "The First Attraction",
        meaning: "Outcome or next step to take",
        keywords: ["future", "action", "direction"],
        carnivalMetaphor: "The first wonder that draws your attention - where your journey truly begins",
        coordinates: { x: 80, y: 50 }
      }
    ],
    interpretation: {
      overview: "This spread illuminates your path from current circumstances through understanding to action.",
      focusAreas: ["Present awareness", "Hidden knowledge", "Forward movement"],
      connectionPatterns: ["Linear progression", "Cause and effect", "Simple narrative flow"]
    },
    carnivalImagery: "You stand before the carnival's elaborate entrance arch, its twisted spires reaching toward star-spangled sky. The ticket master's booth glows with an otherworldly light, and beyond the gates, impossible wonders beckon.",
    educationalNotes: "Three-card spreads are the foundation of tarot reading. They teach basic past-present-future thinking and help develop intuitive card connection skills.",
    historicalOrigin: "Derived from the ancient three-fates concept found in Greek mythology - Clotho (present), Lachesis (fate), and Atropos (future)."
  },
  {
    id: "mirror-tent",
    name: "The Mirror Tent",
    description: "A 5-card introspective spread that reveals hidden aspects of self through the carnival's hall of mirrors.",
    cardCount: 5,
    difficulty: "beginner",
    theme: "spiritual",
    cosmicTiming: {
      bestMoonPhases: ["Full Moon", "Waning Gibbous"],
      astrologicalConsiderations: "Powerful during Neptune aspects for deep introspection",
      seasonalRecommendations: "Autumn for self-reflection, winter for inner work"
    },
    positions: [
      {
        index: 0,
        name: "True Self",
        meaning: "Your authentic inner nature",
        keywords: ["authenticity", "core self", "soul essence"],
        carnivalMetaphor: "The clear mirror that shows your true face without distortion",
        coordinates: { x: 50, y: 20 }
      },
      {
        index: 1,
        name: "Shadow Reflection",
        meaning: "Hidden or repressed aspects of yourself",
        keywords: ["shadow", "hidden traits", "unconscious"],
        carnivalMetaphor: "The dark mirror that reveals what you prefer not to see",
        coordinates: { x: 20, y: 40 }
      },
      {
        index: 2,
        name: "Public Mask",
        meaning: "How others perceive you",
        keywords: ["persona", "public image", "social self"],
        carnivalMetaphor: "The funhouse mirror that shows how the world sees you",
        coordinates: { x: 80, y: 40 }
      },
      {
        index: 3,
        name: "Inner Wisdom",
        meaning: "Your intuitive guidance and inner knowledge",
        keywords: ["intuition", "wisdom", "inner voice"],
        carnivalMetaphor: "The ancient mirror that reflects the wisdom of ages",
        coordinates: { x: 30, y: 70 }
      },
      {
        index: 4,
        name: "Integration Path",
        meaning: "How to unite these aspects into wholeness",
        keywords: ["integration", "wholeness", "self-acceptance"],
        carnivalMetaphor: "The master mirror that shows all reflections as one harmonious whole",
        coordinates: { x: 70, y: 70 }
      }
    ],
    interpretation: {
      overview: "This spread provides deep self-insight by examining different aspects of your psyche and personality.",
      focusAreas: ["Self-awareness", "Shadow work", "Personal growth"],
      connectionPatterns: ["Center-spoke relationships", "Internal dynamics", "Psychological integration"]
    },
    carnivalImagery: "Inside the mirror tent, reflections multiply infinitely, each surface revealing a different facet of your soul. Some mirrors gleam with silver truth, others darken with uncomfortable revelations, but all are necessary for complete self-knowledge.",
    educationalNotes: "Mirror spreads teach psychological awareness and the Jungian concept of shadow work. They're excellent for personal development and self-understanding.",
    historicalOrigin: "Inspired by ancient Greek 'Know Thyself' philosophy and Carl Jung's work on the collective unconscious and shadow integration."
  }
];

// INTERMEDIATE SPREADS
export const intermediateSpreads: EnhancedTarotSpread[] = [
  {
    id: "cosmic-ferris-wheel",
    name: "The Cosmic Ferris Wheel",
    description: "A 7-card circular spread representing the cycles of life and cosmic timing, perfect for understanding life patterns and optimal timing.",
    cardCount: 7,
    difficulty: "intermediate",
    theme: "general",
    cosmicTiming: {
      bestMoonPhases: ["First Quarter", "Full Moon"],
      astrologicalConsiderations: "Excellent during Jupiter transits for expansion and growth insight",
      seasonalRecommendations: "Solstices and equinoxes for maximum cosmic connection"
    },
    positions: [
      {
        index: 0,
        name: "The Hub",
        meaning: "Your central core - the constant amidst change",
        keywords: ["center", "stability", "core truth"],
        carnivalMetaphor: "The steady center of the great wheel around which all else revolves",
        astrologicalAssociation: "Sun - core identity",
        coordinates: { x: 50, y: 50 }
      },
      {
        index: 1,
        name: "Rising",
        meaning: "What is beginning to manifest in your life",
        keywords: ["beginnings", "emergence", "dawn"],
        carnivalMetaphor: "The eastern gondola catching the first light of possibility",
        astrologicalAssociation: "Ascendant - new beginnings",
        coordinates: { x: 80, y: 30 }
      },
      {
        index: 2,
        name: "Zenith",
        meaning: "What is at peak power or requires attention",
        keywords: ["peak", "culmination", "achievement"],
        carnivalMetaphor: "The highest gondola with the clearest view of your domain",
        astrologicalAssociation: "Midheaven - highest achievement",
        coordinates: { x: 65, y: 15 }
      },
      {
        index: 3,
        name: "Setting",
        meaning: "What is ending or needs to be released",
        keywords: ["endings", "release", "twilight"],
        carnivalMetaphor: "The western gondola where day's illusions fade into night's truth",
        astrologicalAssociation: "Descendant - relationships and release",
        coordinates: { x: 20, y: 30 }
      },
      {
        index: 4,
        name: "Nadir",
        meaning: "Hidden foundations or unconscious influences",
        keywords: ["foundation", "unconscious", "depth"],
        carnivalMetaphor: "The lowest gondola touching the earth's hidden wisdom",
        astrologicalAssociation: "IC - home and unconscious",
        coordinates: { x: 35, y: 85 }
      },
      {
        index: 5,
        name: "Past Cycle",
        meaning: "Lessons from previous experiences affecting now",
        keywords: ["past", "karma", "lessons"],
        carnivalMetaphor: "The gondola just passed, carrying wisdom from previous revolutions",
        coordinates: { x: 25, y: 60 }
      },
      {
        index: 6,
        name: "Future Cycle",
        meaning: "What approaches as the wheel turns",
        keywords: ["future", "approaching", "evolution"],
        carnivalMetaphor: "The gondola approaching, bringing new experiences and growth",
        coordinates: { x: 75, y: 60 }
      }
    ],
    interpretation: {
      overview: "This spread reveals the cyclical nature of experience and helps you understand timing in your life.",
      focusAreas: ["Life cycles", "Timing awareness", "Pattern recognition"],
      connectionPatterns: ["Circular flow", "Opposing forces", "Cyclical progression"]
    },
    carnivalImagery: "The great Ferris wheel turns slowly against the starlit sky, each gondola a moment in time's eternal dance. From your seat, you see how all experiences connect in the endless cycle of becoming.",
    educationalNotes: "Wheel spreads teach about cycles, timing, and the relationship between different life phases. They're excellent for understanding life patterns.",
    historicalOrigin: "Based on the Wheel of Fortune card and ancient concepts of cyclic time found in Eastern and Western mystery traditions."
  }
];

// ADVANCED SPREADS
export const advancedSpreads: EnhancedTarotSpread[] = [
  {
    id: "grand-carnival-mandala",
    name: "The Grand Carnival Mandala",
    description: "A complex 12-card spread representing the complete astrological wheel and all aspects of life experience.",
    cardCount: 12,
    difficulty: "advanced",
    theme: "general",
    cosmicTiming: {
      bestMoonPhases: ["Full Moon", "New Moon"],
      astrologicalConsiderations: "Most powerful during personal birth month or significant astrological transits",
      seasonalRecommendations: "Solstices for maximum cosmic attunement"
    },
    positions: [
      {
        index: 0,
        name: "The Self Pavilion",
        meaning: "Your identity and how you present to the world",
        keywords: ["identity", "appearance", "self-expression"],
        carnivalMetaphor: "The main tent where you perform your life's greatest show",
        astrologicalAssociation: "1st House - Aries - Self",
        coordinates: { x: 85, y: 50 }
      },
      {
        index: 1,
        name: "The Treasure Vault",
        meaning: "Your resources, values, and material security",
        keywords: ["resources", "values", "material world"],
        carnivalMetaphor: "The strongbox where the carnival keeps its most precious coins",
        astrologicalAssociation: "2nd House - Taurus - Possessions",
        coordinates: { x: 80, y: 75 }
      },
      {
        index: 2,
        name: "The Communication Booth",
        meaning: "How you think, communicate, and process information",
        keywords: ["communication", "learning", "siblings"],
        carnivalMetaphor: "The telegraph station connecting all corners of the carnival",
        astrologicalAssociation: "3rd House - Gemini - Communication",
        coordinates: { x: 65, y: 90 }
      },
      {
        index: 3,
        name: "The Family Caravan",
        meaning: "Your roots, home, and emotional foundation",
        keywords: ["home", "family", "roots"],
        carnivalMetaphor: "The traveling home where the carnival family gathers",
        astrologicalAssociation: "4th House - Cancer - Home",
        coordinates: { x: 35, y: 90 }
      },
      {
        index: 4,
        name: "The Center Ring",
        meaning: "Your creativity, romance, and self-expression",
        keywords: ["creativity", "romance", "children"],
        carnivalMetaphor: "Where the most spectacular performances captivate the audience",
        astrologicalAssociation: "5th House - Leo - Creativity",
        coordinates: { x: 20, y: 75 }
      },
      {
        index: 5,
        name: "The Worker's Quarter",
        meaning: "Your daily routine, health, and service to others",
        keywords: ["work", "health", "service"],
        carnivalMetaphor: "Behind the scenes where the real work of magic happens",
        astrologicalAssociation: "6th House - Virgo - Work",
        coordinates: { x: 15, y: 50 }
      },
      {
        index: 6,
        name: "The Partnership Platform",
        meaning: "Your relationships and how you connect with others",
        keywords: ["partnerships", "marriage", "cooperation"],
        carnivalMetaphor: "The dance platform where two become one in perfect harmony",
        astrologicalAssociation: "7th House - Libra - Partnerships",
        coordinates: { x: 20, y: 25 }
      },
      {
        index: 7,
        name: "The Transformation Chamber",
        meaning: "Deep change, shared resources, and psychological depth",
        keywords: ["transformation", "death/rebirth", "shared resources"],
        carnivalMetaphor: "The mysterious tent where visitors emerge forever changed",
        astrologicalAssociation: "8th House - Scorpio - Transformation",
        coordinates: { x: 35, y: 10 }
      },
      {
        index: 8,
        name: "The Philosopher's Tower",
        meaning: "Your beliefs, higher learning, and spiritual expansion",
        keywords: ["philosophy", "travel", "higher learning"],
        carnivalMetaphor: "The tallest spire offering the widest view of possibility",
        astrologicalAssociation: "9th House - Sagittarius - Philosophy",
        coordinates: { x: 65, y: 10 }
      },
      {
        index: 9,
        name: "The Master's Stage",
        meaning: "Your career, reputation, and public standing",
        keywords: ["career", "reputation", "authority"],
        carnivalMetaphor: "The elevated stage where the carnival master commands respect",
        astrologicalAssociation: "10th House - Capricorn - Career",
        coordinates: { x: 80, y: 25 }
      },
      {
        index: 10,
        name: "The Dreamer's Circle",
        meaning: "Your hopes, dreams, and community connections",
        keywords: ["hopes", "friends", "groups"],
        carnivalMetaphor: "The gathering circle where dreamers share impossible visions",
        astrologicalAssociation: "11th House - Aquarius - Hopes",
        coordinates: { x: 75, y: 40 }
      },
      {
        index: 11,
        name: "The Hidden Sanctuary",
        meaning: "Your unconscious mind, hidden enemies, and spiritual completion",
        keywords: ["subconscious", "hidden", "spiritual"],
        carnivalMetaphor: "The secret shrine where the carnival's deepest mysteries are kept",
        astrologicalAssociation: "12th House - Pisces - Subconscious",
        coordinates: { x: 65, y: 40 }
      }
    ],
    interpretation: {
      overview: "This comprehensive spread examines every area of your life through the lens of astrological wisdom.",
      focusAreas: ["Complete life overview", "Astrological timing", "Holistic understanding"],
      connectionPatterns: ["Astrological aspects", "House relationships", "Elemental balance"]
    },
    carnivalImagery: "The entire carnival spreads before you like a living mandala, each attraction representing a different aspect of human experience. From above, the pattern reveals the cosmic order underlying all earthly affairs.",
    educationalNotes: "Mandala spreads teach the relationship between different life areas and how astrological principles apply to daily life. They require understanding of astrological houses.",
    historicalOrigin: "Based on ancient astrological house systems and mandala principles found in Tibetan and Hindu traditions, adapted for tarot wisdom."
  }
];

// MASTER LEVEL SPREADS
export const masterSpreads: EnhancedTarotSpread[] = [
  {
    id: "carnival-of-souls",
    name: "The Carnival of Souls",
    description: "An advanced 21-card spread representing the complete Major Arcana journey through the carnival of existence.",
    cardCount: 21,
    difficulty: "master",
    theme: "spiritual",
    cosmicTiming: {
      bestMoonPhases: ["Dark Moon", "Full Moon"],
      astrologicalConsiderations: "Reserved for profound life transitions and spiritual initiations",
      seasonalRecommendations: "Samhain, Winter Solstice, or personal spiritual anniversaries"
    },
    positions: [
      // This would include 21 positions representing the fool's journey through all major arcana
      {
        index: 0,
        name: "The Soul's Entry",
        meaning: "Where your soul enters this incarnation's carnival",
        keywords: ["soul purpose", "incarnation", "divine mission"],
        carnivalMetaphor: "The cosmic gate through which your soul chose to enter this lifetime's carnival",
        astrologicalAssociation: "North Node - soul purpose",
        coordinates: { x: 50, y: 5 }
      }
      // ... additional 20 positions would follow
    ],
    interpretation: {
      overview: "This master-level spread reveals the soul's complete journey through earthly experience and spiritual evolution.",
      focusAreas: ["Soul purpose", "Spiritual evolution", "Karmic patterns"],
      connectionPatterns: ["Major Arcana progression", "Karmic cycles", "Spiritual initiation"]
    },
    carnivalImagery: "The entire carnival transforms into a cosmic mandala of the soul's journey, each attraction representing a stage in spiritual evolution from innocent fool to wise magician.",
    educationalNotes: "Master spreads require deep understanding of Major Arcana symbolism, spiritual development, and the fool's journey. Only attempt after extensive tarot study.",
    historicalOrigin: "Based on the complete Major Arcana as a map of spiritual initiation, drawing from ancient mystery school traditions and the hero's journey mythology."
  }
];

// Export all spreads organized by difficulty
export const enhancedTarotSpreads = {
  beginner: beginnerSpreads,
  intermediate: intermediateSpreads,
  advanced: advancedSpreads,
  master: masterSpreads
};

// Utility functions
export const getAllSpreads = (): EnhancedTarotSpread[] => {
  return [
    ...beginnerSpreads,
    ...intermediateSpreads,
    ...advancedSpreads,
    ...masterSpreads
  ];
};

export const getSpreadById = (id: string): EnhancedTarotSpread | undefined => {
  return getAllSpreads().find(spread => spread.id === id);
};

export const getSpreadsByDifficulty = (difficulty: string): EnhancedTarotSpread[] => {
  return getAllSpreads().filter(spread => spread.difficulty === difficulty);
};

export const getSpreadsByTheme = (theme: string): EnhancedTarotSpread[] => {
  return getAllSpreads().filter(spread => spread.theme === theme);
};

export const getSpreadsByMoonPhase = (moonPhase: string): EnhancedTarotSpread[] => {
  return getAllSpreads().filter(spread => 
    spread.cosmicTiming?.bestMoonPhases.includes(moonPhase)
  );
};

// Cosmic timing recommendations
export const getOptimalSpreadTiming = (spreadId: string): string => {
  const spread = getSpreadById(spreadId);
  if (!spread?.cosmicTiming) return "Any time is suitable for this reading.";
  
  const { bestMoonPhases, astrologicalConsiderations, seasonalRecommendations } = spread.cosmicTiming;
  
  return `
    Best Moon Phases: ${bestMoonPhases.join(', ')}
    Astrological Timing: ${astrologicalConsiderations}
    Seasonal Recommendations: ${seasonalRecommendations}
  `;
};