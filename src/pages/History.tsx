import React from 'react';
import { useTarot } from '../context/TarotContext';
import { format } from 'date-fns';
import './History.css';

const History = () => {
  const { readings } = useTarot();
  
  if (readings.length === 0) {
    return (
      <div className="history-empty">
        <h1>Reading History</h1>
        <div className="empty-message">
          <p>You haven't saved any readings yet.</p>
          <p>Visit the Reading Room to perform your first tarot reading.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="history">
      <h1>Reading History</h1>
      <p className="history-intro">
        Review your past readings to gain deeper insights as time passes.
        The cards reveal their wisdom gradually as events unfold.
      </p>
      
      <div className="readings-list">
        {readings.map((reading) => (
          <div key={reading.id} className="reading-entry">
            <div className="reading-header">
              <div className="reading-date">
                {format(new Date(reading.date), 'MMMM d, yyyy')}
              </div>
              <div className="reading-spread">{reading.spread.name}</div>
            </div>
            
            <div className="reading-question">
              <h3>Your Question</h3>
              <p>"{reading.question}"</p>
            </div>
            
            <div className="reading-cards">
              <h3>Cards Drawn</h3>
              <div className="cards-preview">
                {reading.cards.map((card, index) => (
                  <div key={index} className="card-preview-mini">
                    <img 
                      src={card.image} 
                      alt={card.name} 
                      className={`mini-card ${card.isReversed ? 'reversed' : ''}`}
                    />
                    <span className="mini-card-name">{card.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="reading-interpretation">
              <h3>Interpretation</h3>
              <div className="interpretation-text">
                {reading.interpretation.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;