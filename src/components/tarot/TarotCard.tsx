import React, { useState } from 'react';
import './TarotCard.css';
import { TarotCard as TarotCardType } from '../../types';

interface TarotCardProps {
  card?: TarotCardType;
  isBackFacing?: boolean;
  onClick?: () => void;
  isRevealed?: boolean;
}

const TarotCard: React.FC<TarotCardProps> = ({ 
  card, 
  isBackFacing = false, 
  onClick,
  isRevealed = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  const cardBackImage = "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  
  return (
    <div 
      className={`tarot-card ${isBackFacing ? 'back-facing' : ''} ${card?.isReversed ? 'reversed' : ''} ${isRevealed ? 'revealed' : ''}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-inner">
        <div className="card-back">
          <div className="card-back-design">
            <img src={cardBackImage} alt="Card Back" className="card-back-image" />
          </div>
        </div>
        
        <div className="card-front">
          {card && (
            <>
              <div className="card-header">
                <h3 className="card-title">{card.name}</h3>
                <span className="card-arcana">{card.arcana} {card.suit ? `of ${card.suit}` : 'arcana'}</span>
              </div>
              
              <div className="card-image-container">
                <img src={card.image} alt={card.name} className="card-image" />
              </div>
              
              <div className="card-position">
                {card.position && <span>{card.position.name}</span>}
              </div>
              
              {isHovered && isRevealed && (
                <div className="card-meaning">
                  <p>{card.isReversed ? card.meanings.reversed : card.meanings.upright}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TarotCard;