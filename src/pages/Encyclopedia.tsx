import React, { useState } from 'react';
import { tarotDeck } from '../data/tarotDeck';
import TarotCard from '../components/tarot/TarotCard';
import './Encyclopedia.css';

const Encyclopedia = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterArcana, setFilterArcana] = useState<'all' | 'major' | 'minor'>('all');
  const [filterSuit, setFilterSuit] = useState<'all' | 'wands' | 'cups' | 'swords' | 'pentacles'>('all');
  
  const filteredCards = tarotDeck.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesArcana = filterArcana === 'all' || card.arcana === filterArcana;
    
    const matchesSuit = filterSuit === 'all' || card.suit === filterSuit;
    
    return matchesSearch && matchesArcana && matchesSuit;
  });
  
  return (
    <div className="encyclopedia">
      <h1>Tarot Encyclopedia</h1>
      <p className="intro">
        Explore the mysteries of the tarot deck. Discover the meanings, symbolism, and history of each card
        in our dark carnival interpretation of the classic Rider-Waite-Smith tradition.
      </p>
      
      <div className="search-filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search cards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <label>Arcana:</label>
            <select 
              value={filterArcana} 
              onChange={(e) => setFilterArcana(e.target.value as 'all' | 'major' | 'minor')}
            >
              <option value="all">All</option>
              <option value="major">Major Arcana</option>
              <option value="minor">Minor Arcana</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Suit:</label>
            <select 
              value={filterSuit} 
              onChange={(e) => setFilterSuit(e.target.value as 'all' | 'wands' | 'cups' | 'swords' | 'pentacles')}
              disabled={filterArcana === 'major'}
            >
              <option value="all">All Suits</option>
              <option value="wands">Wands</option>
              <option value="cups">Cups</option>
              <option value="swords">Swords</option>
              <option value="pentacles">Pentacles</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="cards-grid">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <div key={card.id} className="card-entry">
              <div className="card-preview">
                <TarotCard card={card} isRevealed={true} />
              </div>
              
              <div className="card-info">
                <h2>{card.name}</h2>
                <p className="card-type">
                  {card.arcana === 'major' ? 'Major Arcana' : `${card.suit} (Minor Arcana)`}
                </p>
                
                <div className="card-meanings">
                  <div className="meaning-section">
                    <h3>Upright</h3>
                    <p>{card.meanings.upright}</p>
                    <div className="keywords">
                      {card.keywords.upright.map((keyword, index) => (
                        <span key={index} className="keyword">{keyword}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="meaning-section">
                    <h3>Reversed</h3>
                    <p>{card.meanings.reversed}</p>
                    <div className="keywords">
                      {card.keywords.reversed.map((keyword, index) => (
                        <span key={index} className="keyword">{keyword}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="card-description">
                  <h3>Symbolism</h3>
                  <p>{card.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No cards match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Encyclopedia;