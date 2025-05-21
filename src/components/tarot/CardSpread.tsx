import React, { useState, useEffect } from 'react';
import TarotCard from './TarotCard';
import './CardSpread.css';
import { TarotCard as TarotCardType } from '../../types';

interface CardSpreadProps {
  cards: TarotCardType[];
  spreadType: string;
}

const CardSpread: React.FC<CardSpreadProps> = ({ cards, spreadType }) => {
  const [revealedCards, setRevealedCards] = useState<string[]>([]);
  const [selectedCard, setSelectedCard] = useState<TarotCardType | null>(null);
  
  useEffect(() => {
    // Reset revealed cards when spread changes
    setRevealedCards([]);
    
    // Reveal cards one by one with a delay for dramatic effect
    const revealInterval = setInterval(() => {
      setRevealedCards(prev => {
        if (prev.length < cards.length) {
          return [...prev, cards[prev.length].id];
        }
        clearInterval(revealInterval);
        return prev;
      });
    }, 1000);
    
    return () => clearInterval(revealInterval);
  }, [cards]);
  
  const handleCardClick = (card: TarotCardType) => {
    setSelectedCard(selectedCard?.id === card.id ? null : card);
  };
  
  const getSpreadLayout = () => {
    switch (spreadType) {
      case 'three-card':
        return 'three-card-layout';
      case 'celtic-cross':
        return 'celtic-cross-layout';
      case 'horseshoe':
        return 'horseshoe-layout';
      default:
        return 'default-layout';
    }
  };
  
  return (
    <div className="card-spread-container">
      <div className={`card-spread ${getSpreadLayout()}`}>
        {cards.map((card, index) => (
          <div 
            key={card.id} 
            className={`card-position-${index + 1}`}
          >
            <TarotCard
              card={card}
              isBackFacing={!revealedCards.includes(card.id)}
              onClick={() => handleCardClick(card)}
              isRevealed={revealedCards.includes(card.id)}
            />
            {card.position && (
              <div className="position-label">
                {card.position.name}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {selectedCard && (
        <div className="card-details">
          <h3>{selectedCard.name}</h3>
          <p><strong>Position:</strong> {selectedCard.position?.name}</p>
          <p><strong>Orientation:</strong> {selectedCard.isReversed ? 'Reversed' : 'Upright'}</p>
          <p><strong>Meaning:</strong> {selectedCard.isReversed ? selectedCard.meanings.reversed : selectedCard.meanings.upright}</p>
          <p><strong>Keywords:</strong> {selectedCard.isReversed 
            ? selectedCard.keywords.reversed.join(', ') 
            : selectedCard.keywords.upright.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

export default CardSpread;