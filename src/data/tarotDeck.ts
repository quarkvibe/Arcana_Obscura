import { TarotCard } from "../types";

// This is a simplified version with a few example cards. 
// In a complete implementation, all 78 cards would be included.
export const tarotDeck: TarotCard[] = [
  {
    id: "major-0",
    name: "The Fool",
    arcana: "major",
    number: 0,
    keywords: {
      upright: ["beginnings", "innocence", "spontaneity", "free spirit"],
      reversed: ["holding back", "recklessness", "risk-taking", "bad decision"]
    },
    meanings: {
      upright: "New beginnings, faith in the future, innocence, and spontaneity. The Fool represents the start of a journey into the unknown.",
      reversed: "Recklessness, poor judgment, and apathy. The reversed Fool suggests missed opportunities or ill-considered actions."
    },
    description: "A carefree youth stands at the edge of a cliff, unaware of the danger. In our dark carnival rendition, the Fool is portrayed as a naive carnival-goer entranced by the unsettling attractions ahead.",
    image: "https://images.pexels.com/photos/1805837/pexels-photo-1805837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "major-1",
    name: "The Magician",
    arcana: "major",
    number: 1,
    keywords: {
      upright: ["manifestation", "resourcefulness", "power", "inspired action"],
      reversed: ["manipulation", "poor planning", "untapped talents"]
    },
    meanings: {
      upright: "Manifestation, resourcefulness, and inspired action. The Magician represents the ability to harness universal energies to achieve your goals.",
      reversed: "Manipulation, poor planning, and untapped talents. The reversed Magician warns of deception or squandered potential."
    },
    description: "A carnival illusionist with an air of mystery performs impossible feats. In our dark carnival styling, there's a hint that his abilities may go beyond mere trickery into the genuinely supernatural.",
    image: "https://images.pexels.com/photos/3831014/pexels-photo-3831014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "major-2",
    name: "The High Priestess",
    arcana: "major",
    number: 2,
    keywords: {
      upright: ["intuition", "sacred knowledge", "divine feminine", "subconscious mind"],
      reversed: ["secrets", "disconnected from intuition", "withdrawal"]
    },
    meanings: {
      upright: "Intuition, sacred knowledge, and the unconscious mind. The High Priestess represents hidden knowledge and mysteries yet to be revealed.",
      reversed: "Secrets, disconnection from intuition, and repressed feelings. The reversed High Priestess suggests ignoring your inner voice."
    },
    description: "The fortune teller of the carnival, her eyes seeing beyond the veil of reality. She knows the dark truths behind the carnival's facade and the destinies of those who visit.",
    image: "https://images.pexels.com/photos/6510368/pexels-photo-6510368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "cups-1",
    name: "Ace of Cups",
    arcana: "minor",
    suit: "cups",
    number: 1,
    keywords: {
      upright: ["love", "new relationships", "compassion", "creativity"],
      reversed: ["emotional loss", "blocked creativity", "emptiness"]
    },
    meanings: {
      upright: "New feelings, emotional awakening, and creative beginnings. The Ace of Cups represents the start of emotional or creative fulfillment.",
      reversed: "Emotional loss, blocked creativity, and emotional emptiness. The reversed Ace of Cups suggests unfulfilled emotional potential."
    },
    description: "A carnival chalice overflowing with a luminescent liquid, offered by a masked attendant. Those who drink experience overwhelming emotion—but whether joy or sorrow depends on the recipient.",
    image: "https://images.pexels.com/photos/1309583/pexels-photo-1309583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "swords-10",
    name: "Ten of Swords",
    arcana: "minor",
    suit: "swords",
    number: 10,
    keywords: {
      upright: ["painful endings", "deep wounds", "betrayal", "loss"],
      reversed: ["recovery", "regeneration", "resisting an inevitable end"]
    },
    meanings: {
      upright: "Painful endings, betrayal, and loss. The Ten of Swords represents hitting rock bottom but also the potential for things to finally improve.",
      reversed: "Recovery, regeneration, and resistance. The reversed Ten of Swords suggests slowly moving past a painful situation."
    },
    description: "A carnival knife-thrower's assistant pinned to the wheel by blades, creating a macabre tableau. The audience is unsure if this is part of the act or a genuine tragedy unfolding before them.",
    image: "https://images.pexels.com/photos/1497247/pexels-photo-1497247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "pentacles-4",
    name: "Four of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    number: 4,
    keywords: {
      upright: ["security", "conservatism", "scarcity", "control"],
      reversed: ["generosity", "giving", "spending", "insecurity"]
    },
    meanings: {
      upright: "Security, conservatism, and control. The Four of Pentacles represents material stability but also potential greed or fear of loss.",
      reversed: "Generosity, giving, and insecurity. The reversed Four of Pentacles suggests letting go of material concerns or financial instability."
    },
    description: "The carnival's treasurer, clutching coins to his chest, watches visitors with suspicious eyes. His booth is reinforced and locked, protecting the carnival's earnings from both guests and other performers.",
    image: "https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "wands-3",
    name: "Three of Wands",
    arcana: "minor",
    suit: "wands",
    number: 3,
    keywords: {
      upright: ["expansion", "foresight", "overseas opportunities"],
      reversed: ["obstacles", "delays", "frustration"]
    },
    meanings: {
      upright: "Expansion, foresight, and new horizons. The Three of Wands represents looking ahead to future growth and opportunities.",
      reversed: "Obstacles, delays, and frustration. The reversed Three of Wands suggests setbacks in your plans or lack of long-term vision.",
      
    },
    description: "The carnival master stands at the entrance, surveying his domain as the tents stretch into the distance. He sees both the current attractions and envisions those yet to come in distant towns.",
    image: "https://images.pexels.com/photos/247819/pexels-photo-247819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];