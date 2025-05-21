import React, { createContext, useContext, useState, ReactNode } from 'react';
import { tarotDeck } from '../data/tarotDeck';
import { tarotSpreads } from '../data/tarotSpreads';
import { TarotCard, TarotSpread, Reading } from '../types';

interface TarotContextProps {
  deck: TarotCard[];
  spreads: TarotSpread[];
  selectedSpread: TarotSpread | null;
  drawnCards: TarotCard[];
  readings: Reading[];
  setSelectedSpread: (spread: TarotSpread) => void;
  shuffleDeck: () => void;
  drawCard: () => TarotCard | undefined;
  drawSpread: () => void;
  resetDrawnCards: () => void;
  saveReading: (question: string, interpretation: string) => void;
}

const TarotContext = createContext<TarotContextProps | undefined>(undefined);

export const useTarot = () => {
  const context = useContext(TarotContext);
  if (!context) {
    throw new Error('useTarot must be used within a TarotProvider');
  }
  return context;
};

interface TarotProviderProps {
  children: ReactNode;
}

export const TarotProvider = ({ children }: TarotProviderProps) => {
  const [deck, setDeck] = useState<TarotCard[]>(tarotDeck);
  const [spreads] = useState<TarotSpread[]>(tarotSpreads);
  const [selectedSpread, setSelectedSpread] = useState<TarotSpread | null>(null);
  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([]);
  const [readings, setReadings] = useState<Reading[]>([]);

  // Fisher-Yates shuffle algorithm
  const shuffleDeck = () => {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      
      // Randomize orientation (upright or reversed)
      shuffled[i] = {
        ...shuffled[i],
        isReversed: Math.random() > 0.75
      };
    }
    setDeck(shuffled);
  };

  const drawCard = () => {
    if (deck.length === 0) return undefined;
    
    const [drawnCard, ...remainingDeck] = deck;
    setDeck(remainingDeck);
    setDrawnCards([...drawnCards, drawnCard]);
    return drawnCard;
  };

  const drawSpread = () => {
    if (!selectedSpread) return;
    
    resetDrawnCards();
    shuffleDeck();
    
    const newDrawnCards: TarotCard[] = [];
    const newDeck = [...deck];
    
    for (let i = 0; i < selectedSpread.positions.length; i++) {
      if (newDeck.length === 0) break;
      
      const [drawnCard, ...remainingDeck] = newDeck;
      newDrawnCards.push({
        ...drawnCard,
        position: selectedSpread.positions[i]
      });
      newDeck.splice(0, 1);
    }
    
    setDeck(newDeck);
    setDrawnCards(newDrawnCards);
  };

  const resetDrawnCards = () => {
    // Return any drawn cards back to the deck
    const fullDeck = [...deck, ...drawnCards];
    setDeck(fullDeck);
    setDrawnCards([]);
  };

  const saveReading = (question: string, interpretation: string) => {
    if (drawnCards.length === 0 || !selectedSpread) return;
    
    const newReading: Reading = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      spread: selectedSpread,
      cards: drawnCards,
      question,
      interpretation,
    };
    
    setReadings([newReading, ...readings]);
  };

  return (
    <TarotContext.Provider
      value={{
        deck,
        spreads,
        selectedSpread,
        drawnCards,
        readings,
        setSelectedSpread,
        shuffleDeck,
        drawCard,
        drawSpread,
        resetDrawnCards,
        saveReading,
      }}
    >
      {children}
    </TarotContext.Provider>
  );
};