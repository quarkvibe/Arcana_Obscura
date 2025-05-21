import { TarotSpread } from "../types";

export const tarotSpreads: TarotSpread[] = [
  {
    id: "three-card",
    name: "Three Card Spread",
    description: "A simple yet powerful spread that provides insight into past, present, and future influences.",
    numCards: 3,
    positions: [
      {
        id: "past",
        name: "Past",
        description: "Influences from the past that are still affecting your situation"
      },
      {
        id: "present",
        name: "Present",
        description: "Current energies and circumstances surrounding your question"
      },
      {
        id: "future",
        name: "Future",
        description: "Potential outcomes and energies moving forward"
      }
    ]
  },
  {
    id: "celtic-cross",
    name: "Celtic Cross",
    description: "A comprehensive spread that examines your question from multiple angles, revealing hidden influences and potential outcomes.",
    numCards: 10,
    positions: [
      {
        id: "present",
        name: "Present",
        description: "The current situation or question"
      },
      {
        id: "challenge",
        name: "Challenge",
        description: "The immediate challenge or obstacle"
      },
      {
        id: "past",
        name: "Past",
        description: "Recent past events affecting the situation"
      },
      {
        id: "future",
        name: "Future",
        description: "Events that will occur soon"
      },
      {
        id: "above",
        name: "Above",
        description: "Your highest hopes, goals, or ideals"
      },
      {
        id: "below",
        name: "Below",
        description: "Unconscious influences or foundations"
      },
      {
        id: "advice",
        name: "Advice",
        description: "How you should approach the situation"
      },
      {
        id: "external",
        name: "External Influences",
        description: "How others see you or external factors"
      },
      {
        id: "hopes-fears",
        name: "Hopes & Fears",
        description: "Your inner hopes and fears"
      },
      {
        id: "outcome",
        name: "Outcome",
        description: "The probable outcome if the current course is maintained"
      }
    ]
  },
  {
    id: "horseshoe",
    name: "Horseshoe Spread",
    description: "A seven-card spread that provides a comprehensive overview of a situation and potential solutions.",
    numCards: 7,
    positions: [
      {
        id: "past",
        name: "Past",
        description: "Past influences that led to the current situation"
      },
      {
        id: "present",
        name: "Present",
        description: "Current circumstances and energies"
      },
      {
        id: "hidden",
        name: "Hidden Influences",
        description: "Unseen factors affecting the situation"
      },
      {
        id: "obstacles",
        name: "Obstacles",
        description: "Challenges to overcome"
      },
      {
        id: "environment",
        name: "Environment",
        description: "External influences and surroundings"
      },
      {
        id: "advice",
        name: "Advice",
        description: "Guidance for moving forward"
      },
      {
        id: "outcome",
        name: "Outcome",
        description: "Potential result if advice is followed"
      }
    ]
  }
];