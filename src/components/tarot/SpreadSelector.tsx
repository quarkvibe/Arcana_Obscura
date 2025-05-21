import React from 'react';
import { useTarot } from '../../context/TarotContext';
import './SpreadSelector.css';

const SpreadSelector = () => {
  const { spreads, selectedSpread, setSelectedSpread } = useTarot();
  
  const handleSpreadSelect = (spread) => {
    setSelectedSpread(spread);
  };
  
  return (
    <div className="spread-selector">
      <h2>Choose Your Spread</h2>
      <div className="spreads-container">
        {spreads.map((spread) => (
          <div 
            key={spread.id}
            className={`spread-card ${selectedSpread?.id === spread.id ? 'selected' : ''}`}
            onClick={() => handleSpreadSelect(spread)}
          >
            <h3>{spread.name}</h3>
            <p className="spread-cards">{spread.numCards} cards</p>
            <p className="spread-description">{spread.description}</p>
            <div className="spread-positions">
              <h4>Positions:</h4>
              <ul>
                {spread.positions.slice(0, 3).map((position) => (
                  <li key={position.id}>{position.name}</li>
                ))}
                {spread.positions.length > 3 && (
                  <li>...and {spread.positions.length - 3} more</li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpreadSelector;