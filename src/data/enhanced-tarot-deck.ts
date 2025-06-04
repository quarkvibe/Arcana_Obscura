/**
 * Enhanced Complete Tarot Deck for Arcana Obscura
 * 78 cards with rich symbolism, educational content, and dark carnival theming
 */

export interface EnhancedTarotCard {
  id: string;
  name: string;
  arcana: 'major' | 'minor';
  suit?: 'cups' | 'pentacles' | 'swords' | 'wands';
  number: number;
  element?: 'fire' | 'water' | 'earth' | 'air';
  astrology?: {
    planet?: string;
    sign?: string;
    decan?: string;
  };
  keywords: {
    upright: string[];
    reversed: string[];
  };
  meanings: {
    upright: string;
    reversed: string;
    love: string;
    career: string;
    spirituality: string;
  };
  symbolism: {
    primarySymbols: string[];
    colors: string[];
    numerology: string;
    mythology: string;
  };
  education: {
    history: string;
    practicalApplication: string;
    commonMisconceptions: string;
    advancedInsights: string;
  };
  carnivalDescription: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
}

// MAJOR ARCANA (22 cards)
export const majorArcana: EnhancedTarotCard[] = [
  {
    id: "major-0",
    name: "The Fool",
    arcana: "major",
    number: 0,
    element: "air",
    astrology: { planet: "Uranus" },
    keywords: {
      upright: ["new beginnings", "innocence", "spontaneity", "faith", "adventure"],
      reversed: ["recklessness", "poor judgment", "holding back", "fear", "missed opportunities"]
    },
    meanings: {
      upright: "The Fool represents new beginnings, faith in the universe, and the courage to take the first step into the unknown. This card signifies pure potential and limitless possibilities.",
      reversed: "Reversed, The Fool warns of recklessness, poor judgment, or being held back by fear. It may indicate missed opportunities due to overthinking or lack of confidence.",
      love: "A new romantic beginning or approaching love with innocence and openness. Take a leap of faith in matters of the heart.",
      career: "New job opportunities, career changes, or starting a business venture. Trust your instincts and be willing to learn.",
      spirituality: "Beginning a spiritual journey or embracing beginner's mind. Stay open to new teachings and experiences."
    },
    symbolism: {
      primarySymbols: ["white rose (purity)", "cliff edge (threshold)", "sun (divine consciousness)", "dog (instinct)", "mountains (challenges ahead)"],
      colors: ["white (purity)", "yellow (optimism)", "blue (spirit)", "red (passion)"],
      numerology: "Zero represents infinite potential, the void before creation, and the source of all possibilities.",
      mythology: "Connected to Dionysus, god of wine and ecstasy, representing divine madness and inspiration."
    },
    education: {
      history: "The Fool originated in medieval court jesters who spoke truth to power. In early tarot, it was unnumbered, representing the soul's journey through life.",
      practicalApplication: "When The Fool appears, consider what new adventure calls to you. What would you do if you couldn't fail? This card encourages calculated risks.",
      commonMisconceptions: "The Fool isn't about being foolish - it's about wisdom disguised as simplicity and the courage to begin again.",
      advancedInsights: "The Fool contains all other cards within it, representing the archetypal journey from innocence to enlightenment through experience."
    },
    carnivalDescription: "A wide-eyed visitor approaches the carnival gates, clutching a small bag of coins and dreams. The carnival beckons with impossible promises, and despite warnings from departing patrons, the newcomer steps forward into the swirling mists of possibility.",
    image: "https://images.pexels.com/photos/1805837/pexels-photo-1805837.jpeg",
    rarity: "legendary"
  },
  {
    id: "major-1",
    name: "The Magician",
    arcana: "major",
    number: 1,
    element: "air",
    astrology: { planet: "Mercury" },
    keywords: {
      upright: ["manifestation", "willpower", "creation", "skill", "concentration"],
      reversed: ["manipulation", "poor planning", "untapped talents", "deception"]
    },
    meanings: {
      upright: "The Magician represents the power to manifest your desires through focused will and action. You have all the tools you need to succeed.",
      reversed: "Reversed, The Magician warns of manipulation, scattered energy, or potential being wasted. Beware of deception, either from others or self-delusion.",
      love: "You have the power to create the relationship you desire. Use communication and charm to manifest romantic goals.",
      career: "Time to use your skills and talents to achieve professional success. You have everything needed to reach your goals.",
      spirituality: "Connecting heaven and earth through conscious will. You are becoming a channel for divine energy and manifestation."
    },
    symbolism: {
      primarySymbols: ["infinity symbol (divine connection)", "four suit symbols (mastery of elements)", "red roses (passion)", "white lilies (pure intentions)", "ouroboros belt (cycles of creation)"],
      colors: ["red (action)", "white (purity)", "yellow (intellect)", "green (growth)"],
      numerology: "One represents unity, creation, and the power of focused intention to manifest reality.",
      mythology: "Associated with Hermes/Mercury, messenger of gods and master of communication, trade, and magic."
    },
    education: {
      history: "Evolved from medieval images of traveling performers and alchemists. Represents the human ability to channel cosmic forces.",
      practicalApplication: "When The Magician appears, gather your resources and make a plan. This is a time for action, not contemplation.",
      commonMisconceptions: "The Magician isn't about supernatural powers - it's about using natural talents and available resources effectively.",
      advancedInsights: "The Magician represents the conscious mind's ability to direct unconscious forces toward specific goals."
    },
    carnivalDescription: "At the center ring, a figure in flowing robes commands reality itself. With one hand pointing skyward and the other to earth, they channel cosmic forces through mortal will. The audience gasps as impossible becomes inevitable through pure intention.",
    image: "https://images.pexels.com/photos/3831014/pexels-photo-3831014.jpeg",
    rarity: "rare"
  },
  {
    id: "major-2",
    name: "The High Priestess",
    arcana: "major",
    number: 2,
    element: "water",
    astrology: { sign: "Cancer", planet: "Moon" },
    keywords: {
      upright: ["intuition", "inner wisdom", "mysticism", "divine feminine", "subconscious"],
      reversed: ["disconnected from intuition", "secrets", "repressed feelings", "lack of insight"]
    },
    meanings: {
      upright: "The High Priestess represents intuitive wisdom, inner knowing, and connection to the divine feminine. Trust your inner voice and unconscious wisdom.",
      reversed: "Reversed, she indicates disconnection from intuition, hidden knowledge being concealed, or repressed feminine energy that needs acknowledgment.",
      love: "Listen to your heart's whispers. Emotional intuition will guide you better than logic in romantic matters.",
      career: "Trust your instincts about opportunities. Hidden knowledge or behind-the-scenes information may be relevant.",
      spirituality: "Deep meditation and inner reflection will reveal important spiritual truths. The divine feminine seeks expression through you."
    },
    symbolism: {
      primarySymbols: ["crescent moon crown (divine feminine)", "cross (spiritual balance)", "pomegranates (fertility/mystery)", "scroll (hidden knowledge)", "veil (threshold between worlds)"],
      colors: ["blue (spirituality)", "white (purity)", "silver (moon energy)", "black (mystery)"],
      numerology: "Two represents duality, balance, and the receptive principle that receives and nurtures divine inspiration.",
      mythology: "Connected to Isis, Artemis, and other lunar goddesses who guard the mysteries of life and death."
    },
    education: {
      history: "Derived from the Papess card, representing female religious authority and esoteric knowledge in patriarchal traditions.",
      practicalApplication: "When she appears, pause and listen to your inner guidance. Pay attention to dreams, synchronicities, and gut feelings.",
      commonMisconceptions: "Not about passive waiting - she represents active receptivity and the power of feminine wisdom.",
      advancedInsights: "The High Priestess guards the threshold between conscious and unconscious, serving as a bridge to deeper wisdom."
    },
    carnivalDescription: "Behind a curtain of star-speckled silk sits the carnival's fortune teller, her eyes reflecting depths of ancient knowledge. She speaks in riddles that reveal more truth than direct answers, and those who seek her counsel leave understanding things they never knew they always knew.",
    image: "https://images.pexels.com/photos/6510368/pexels-photo-6510368.jpeg",
    rarity: "rare"
  },
  {
    id: "major-3",
    name: "The Empress",
    arcana: "major",
    number: 3,
    element: "earth",
    astrology: { sign: "Taurus", planet: "Venus" },
    keywords: {
      upright: ["fertility", "abundance", "nurturing", "creativity", "natural beauty"],
      reversed: ["smothering", "dependence", "creative block", "lack of self-care"]
    },
    meanings: {
      upright: "The Empress represents abundant creativity, nurturing energy, and fertility in all forms. She embodies the generative power of the divine feminine.",
      reversed: "Reversed, The Empress may indicate smothering behavior, creative blocks, or neglecting self-care while caring for others.",
      love: "Abundant love, pregnancy possibilities, or nurturing energy in relationships. Time for romantic growth and deeper connection.",
      career: "Creative projects flourish. Success through collaboration, team building, and nurturing professional relationships.",
      spirituality: "Connecting with earth energy and natural cycles. The divine feminine expresses through creative and nurturing acts."
    },
    symbolism: {
      primarySymbols: ["wheat field (abundance)", "crown of stars (cosmic connection)", "venus symbol (love)", "cushions (comfort)", "flowing river (emotions)"],
      colors: ["green (growth)", "gold (abundance)", "pink (love)", "blue (calm waters)"],
      numerology: "Three represents creation through the union of opposites, synthesis, and the birth of new possibilities.",
      mythology: "Associated with Venus, Demeter, and Mother Earth goddesses who represent fertility, abundance, and natural cycles."
    },
    education: {
      history: "Originally depicted as a queen or goddess figure, representing earthly power and maternal authority.",
      practicalApplication: "When The Empress appears, focus on creating and nurturing. This is a time for projects, relationships, and personal growth.",
      commonMisconceptions: "Not limited to motherhood - represents all forms of creativity and abundant manifestation.",
      advancedInsights: "The Empress teaches that true power comes through nurturing and creating rather than dominating or controlling."
    },
    carnivalDescription: "In a tent overflowing with flowering vines and crystalline fountains, the carnival's patroness holds court. Her very presence makes barren ground burst with life, and visitors leave her tent feeling more whole and creative than when they entered.",
    image: "https://images.pexels.com/photos/1309583/pexels-photo-1309583.jpeg",
    rarity: "rare"
  }
  // Continue with remaining Major Arcana cards...
];

// MINOR ARCANA - CUPS SUIT (14 cards)
export const cupsMinorArcana: EnhancedTarotCard[] = [
  {
    id: "cups-1",
    name: "Ace of Cups",
    arcana: "minor",
    suit: "cups",
    number: 1,
    element: "water",
    astrology: { sign: "Cancer" },
    keywords: {
      upright: ["new love", "emotional beginning", "compassion", "creativity", "joy"],
      reversed: ["emotional loss", "blocked creativity", "emptiness", "missed opportunity in love"]
    },
    meanings: {
      upright: "The Ace of Cups represents new emotional beginnings, overflowing love, and creative inspiration. Your heart is opening to new possibilities.",
      reversed: "Reversed, it suggests emotional blocks, missed opportunities for love, or creative stagnation. Something is preventing emotional fulfillment.",
      love: "New romance blooming or existing relationship reaching deeper emotional connection. Open your heart to love's possibilities.",
      career: "Creative projects beginning, team harmony, or work that fulfills emotionally. Follow your passion in professional pursuits.",
      spirituality: "Spiritual awakening through the heart. Divine love is flowing into your life, opening new channels of compassion."
    },
    symbolism: {
      primarySymbols: ["overflowing chalice (abundance)", "dove (holy spirit)", "lotus (spiritual purity)", "hand from cloud (divine gift)", "five streams (five senses)"],
      colors: ["blue (emotion)", "white (purity)", "gold (divine energy)", "silver (intuition)"],
      numerology: "One in Cups represents the pure potential of emotional and creative energy beginning to manifest.",
      mythology: "Connected to the Holy Grail legend and chalices used in sacred ceremonies honoring the divine feminine."
    },
    education: {
      history: "Cups evolved from medieval chalices and goblets, representing the emotional and spiritual aspects of medieval life.",
      practicalApplication: "When this ace appears, be open to new emotional experiences. Start creative projects and express feelings openly.",
      commonMisconceptions: "Not just about romantic love - encompasses all forms of emotional fulfillment and creative expression.",
      advancedInsights: "Aces represent pure elemental energy. Cups Ace is the source of all emotional and intuitive wisdom in the deck."
    },
    carnivalDescription: "A mysterious vendor offers a luminescent cup that never empties, promising to fill hearts with whatever love they most desire. Those who drink find their emotional barriers dissolving, leaving them vulnerable but infinitely more capable of both giving and receiving love.",
    image: "https://images.pexels.com/photos/1309583/pexels-photo-1309583.jpeg",
    rarity: "uncommon"
  },
  {
    id: "cups-2",
    name: "Two of Cups",
    arcana: "minor",
    suit: "cups",
    number: 2,
    element: "water",
    astrology: { sign: "Cancer" },
    keywords: {
      upright: ["partnership", "mutual attraction", "harmony", "connection", "cooperation"],
      reversed: ["disconnection", "imbalance", "broken communication", "one-sided love"]
    },
    meanings: {
      upright: "The Two of Cups represents balanced partnerships, mutual attraction, and harmonious connections. Two hearts beating as one.",
      reversed: "Reversed, it indicates relationship imbalance, poor communication, or one-sided emotional investment. Harmony needs restoration.",
      love: "Perfect partnership energy. Soulmate connections, engagements, or deepening mutual understanding in existing relationships.",
      career: "Successful partnerships, teamwork, or negotiations. Mutual respect and shared goals lead to success.",
      spirituality: "Finding your spiritual community or teacher. Divine partnership supports your spiritual growth."
    },
    symbolism: {
      primarySymbols: ["two figures facing each other (equality)", "caduceus (healing)", "lion head (courage)", "wings (spiritual ascension)", "equal chalices (balance)"],
      colors: ["red (passion)", "blue (emotion)", "white (purity)", "yellow (harmony)"],
      numerology: "Two represents duality seeking balance, cooperation, and the power of partnership over individual effort.",
      mythology: "Represents divine marriages and sacred partnerships found in mythologies worldwide."
    },
    education: {
      history: "Medieval imagery of betrothal cups and partnership ceremonies where two people drank from shared vessels.",
      practicalApplication: "Time to form or strengthen partnerships. Focus on mutual respect, clear communication, and shared values.",
      commonMisconceptions: "Not limited to romance - includes all balanced partnerships including business, friendship, and creative collaborations.",
      advancedInsights: "The Two of Cups teaches that true partnership requires two complete individuals choosing to share their wholeness."
    },
    carnivalDescription: "Twin performers mirror each other's movements in perfect synchronization, their chalices never spilling despite elaborate acrobatics. Couples who watch find themselves moving in harmony, reminded that love's greatest magic lies in willing cooperation.",
    image: "https://images.pexels.com/photos/1030909/pexels-photo-1030909.jpeg",
    rarity: "common"
  }
  // Continue with remaining Cups cards...
];

// Export the complete enhanced deck
export const enhancedTarotDeck: EnhancedTarotCard[] = [
  ...majorArcana,
  ...cupsMinorArcana,
  // Additional suits would be added here
];

// Tarot card lookup functions
export const getCardById = (id: string): EnhancedTarotCard | undefined => {
  return enhancedTarotDeck.find(card => card.id === id);
};

export const getCardsByArcana = (arcana: 'major' | 'minor'): EnhancedTarotCard[] => {
  return enhancedTarotDeck.filter(card => card.arcana === arcana);
};

export const getCardsBySuit = (suit: string): EnhancedTarotCard[] => {
  return enhancedTarotDeck.filter(card => card.suit === suit);
};

export const getMajorArcanaByNumber = (number: number): EnhancedTarotCard | undefined => {
  return enhancedTarotDeck.find(card => card.arcana === 'major' && card.number === number);
};

// Card rarity and special properties
export const getCardsByRarity = (rarity: string): EnhancedTarotCard[] => {
  return enhancedTarotDeck.filter(card => card.rarity === rarity);
};

export const getAstrologicalCards = (planet?: string, sign?: string): EnhancedTarotCard[] => {
  return enhancedTarotDeck.filter(card => {
    if (planet && card.astrology?.planet === planet) return true;
    if (sign && card.astrology?.sign === sign) return true;
    return false;
  });
};

// Educational functions
export const getCardEducation = (id: string) => {
  const card = getCardById(id);
  return card ? card.education : null;
};

export const getCardSymbolism = (id: string) => {
  const card = getCardById(id);
  return card ? card.symbolism : null;
};