import React, { useState } from 'react';
import { useTarot } from '../context/TarotContext';
import TarotCard from '../components/tarot/TarotCard';
import SpreadSelector from '../components/tarot/SpreadSelector';
import CardSpread from '../components/tarot/CardSpread';
import { generateSpreadInterpretation } from '../lib/api-client';
import './ReadingRoom.css';

const ReadingRoom = () => {
  const { selectedSpread, drawnCards, drawSpread, saveReading } = useTarot();
  const [question, setQuestion] = useState('');
  const [readingStage, setReadingStage] = useState<'selection' | 'drawing' | 'reading'>('selection');
  const [interpretation, setInterpretation] = useState('');
  const [isGeneratingInterpretation, setIsGeneratingInterpretation] = useState(false);
  
  const handleStartReading = () => {
    if (!selectedSpread || !question.trim()) return;
    
    setReadingStage('drawing');
    setTimeout(() => {
      drawSpread();
      setReadingStage('reading');
      // In a full implementation, this would call the Claude API for interpretation
      generateInterpretation();
    }, 1500); // Simulate shuffling animation time
  };
  
  const generateInterpretation = async () => {
    if (!selectedSpread || !drawnCards.length) return;
    
    setIsGeneratingInterpretation(true);
    
    try {
      const interpretation = await generateSpreadInterpretation(
        question,
        selectedSpread,
        drawnCards
      );
      setInterpretation(interpretation);
    } catch (error) {
      console.error('Error generating interpretation:', error);
      // Fallback to basic interpretation
      const intro = `Your reading for the question: "${question}"`;
      const cardInterpretations = drawnCards.map(card => {
        const orientation = card.isReversed ? 'reversed' : 'upright';
        const position = card.position?.name || '';
        return `The ${card.name} (${orientation}) in the ${position} position suggests ${card.meanings[card.isReversed ? 'reversed' : 'upright']}`;
      }).join('\n\n');
      
      const conclusion = "Consider how these cards interact with each other and what advice they offer for your situation.";
      
      setInterpretation(`${intro}\n\n${cardInterpretations}\n\n${conclusion}`);
    } finally {
      setIsGeneratingInterpretation(false);
    }
  };
  
  const handleSaveReading = () => {
    saveReading(question, interpretation);
    alert('Reading saved successfully!');
  };
  
  const resetReading = () => {
    setReadingStage('selection');
    setQuestion('');
    setInterpretation('');
  };
  
  return (
    <div className="reading-room">
      <h1>The Reading Room</h1>
      
      {readingStage === 'selection' && (
        <>
          <div className="question-section">
            <h2>What question seeks an answer?</h2>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question..."
              className="question-input"
            />
          </div>
          
          <SpreadSelector />
          
          <button 
            className="start-reading-btn"
            disabled={!selectedSpread || !question.trim()}
            onClick={handleStartReading}
          >
            Begin the Reading
          </button>
        </>
      )}
      
      {readingStage === 'drawing' && (
        <div className="drawing-animation">
          <div className="shuffling-deck">
            <TarotCard isBackFacing={true} />
            <p>Shuffling the cards and drawing your spread...</p>
          </div>
        </div>
      )}
      
      {readingStage === 'reading' && drawnCards.length > 0 && (
        <div className="reading-results">
          <h2>Your Reading</h2>
          <p className="reading-question">"{question}"</p>
          
          <CardSpread cards={drawnCards} spreadType={selectedSpread?.id || ''} />
          
          <div className="interpretation">
            <h3>Interpretation</h3>
            <div className="interpretation-text">
              {interpretation.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          
          <div className="reading-actions">
            <button className="save-reading-btn" onClick={handleSaveReading}>
              Save Reading
            </button>
            <button className="new-reading-btn" onClick={resetReading}>
              New Reading
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingRoom;