import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Book, History } from 'lucide-react';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="title">
          Arcana Obscura
          <span className="subtitle">Dark Carnival Tarot Mastery</span>
        </h1>
        <p className="description">
          Step into the mysterious realm of the Dark Carnival, where ancient tarot wisdom meets 
          unsettling carnival aesthetics. Discover your fate through our immersive tarot readings.
        </p>
        <button 
          className="primary-button"
          onClick={() => navigate('/reading-room')}
        >
          <Sparkles size={20} />
          <span>Enter the Reading Room</span>
        </button>
      </div>
      
      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon">🃏</div>
          <h3>Complete Tarot System</h3>
          <p>
            Explore the full 78-card Rider-Waite-Smith deck reimagined with dark carnival aesthetics.
            Multiple spread options reveal the mysteries of past, present, and future.
          </p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">✨</div>
          <h3>Immersive Experience</h3>
          <p>
            Shuffle and draw cards with realistic physics in an atmospheric carnival fortune-teller's tent.
            Each reading creates a narrative that speaks to your unique circumstances.
          </p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">📚</div>
          <h3>Tarot Encyclopedia</h3>
          <p>
            Access comprehensive knowledge on card meanings, symbolism, and traditional interpretations.
            Perfect for both beginners and experienced readers looking to deepen their practice.
          </p>
        </div>
      </div>
      
      <div className="cta-section">
        <div className="cta-card">
          <Book size={40} className="cta-icon" />
          <h3>Learn the Arcane Arts</h3>
          <p>
            Explore our comprehensive encyclopedia of tarot knowledge, symbolism, and meaning.
          </p>
          <button 
            className="secondary-button"
            onClick={() => navigate('/encyclopedia')}
          >
            Open Encyclopedia
          </button>
        </div>
        
        <div className="cta-card">
          <History size={40} className="cta-icon" />
          <h3>Review Past Readings</h3>
          <p>
            Return to your previous readings to uncover new insights as time passes.
          </p>
          <button 
            className="secondary-button"
            onClick={() => navigate('/history')}
          >
            View Reading History
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;