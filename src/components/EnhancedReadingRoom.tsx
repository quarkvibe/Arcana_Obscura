import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTarot } from '../context/TarotContext';
import { enhancedTarotAI, EnhancedTarotReading, TarotReadingContext } from '../services/enhanced-tarot-ai';
import { enhancedTarotSpreads, getSpreadById } from '../data/enhanced-tarot-spreads';
import { enhancedTarotDeck } from '../data/enhanced-tarot-deck';
import { 
  Star, 
  Moon, 
  Sun, 
  BookOpen, 
  Brain, 
  Clock, 
  Eye, 
  Sparkles,
  ChevronDown,
  ChevronRight,
  Save,
  RotateCcw,
  Shuffle
} from 'lucide-react';
import './EnhancedReadingRoom.css';

interface ReadingStage {
  stage: 'selection' | 'cosmic-alignment' | 'drawing' | 'revealing' | 'interpretation' | 'education';
  progress: number;
}

const EnhancedReadingRoom: React.FC = () => {
  const { selectedSpread, drawnCards, drawSpread, saveReading } = useTarot();
  const [question, setQuestion] = useState('');
  const [readingStage, setReadingStage] = useState<ReadingStage>({ stage: 'selection', progress: 0 });
  const [currentReading, setCurrentReading] = useState<EnhancedTarotReading | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['overview']));
  const [cosmicAlignment, setCosmicAlignment] = useState<any>(null);

  const handleStartReading = async () => {
    if (!selectedSpread || !question.trim()) return;
    
    setIsGenerating(true);
    setReadingStage({ stage: 'cosmic-alignment', progress: 10 });

    try {
      // Phase 1: Cosmic Alignment
      await simulateCosmicAlignment();
      setReadingStage({ stage: 'drawing', progress: 30 });

      // Phase 2: Draw Cards
      drawSpread();
      setReadingStage({ stage: 'revealing', progress: 50 });

      // Wait a moment for state to update, then get the drawn cards
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Phase 3: Generate Enhanced Reading
      const spreadData = getSpreadById(selectedSpread.id);
      if (!spreadData) throw new Error('Invalid spread');

      const context: TarotReadingContext = {
        question: question.trim(),
        spread: spreadData.name,
        cards: drawnCards.map((card, index) => ({
          ...card,
          position: spreadData.positions[index],
          isReversed: Math.random() < 0.3, // 30% chance of reversal
          drawOrder: index
        }))
      };

      setReadingStage({ stage: 'interpretation', progress: 75 });

      // Generate the enhanced reading with AI
      const reading = await enhancedTarotAI.generateComprehensiveReading(context);
      
      setCurrentReading(reading);
      setReadingStage({ stage: 'education', progress: 100 });

    } catch (error) {
      console.error('Error generating enhanced reading:', error);
      // Fallback to basic reading
      generateFallbackReading();
    } finally {
      setIsGenerating(false);
    }
  };

  const simulateCosmicAlignment = async (): Promise<void> => {
    return new Promise((resolve) => {
      let progress = 10;
      const interval = setInterval(() => {
        progress += 5;
        setReadingStage({ stage: 'cosmic-alignment', progress });
        
        if (progress >= 25) {
          clearInterval(interval);
          setCosmicAlignment({
            moonPhase: "Waxing Gibbous",
            planetaryInfluences: ["Mercury in Gemini", "Venus in Libra"],
            seasonalEnergy: "Spring renewal energy"
          });
          resolve();
        }
      }, 200);
    });
  };

  const generateFallbackReading = () => {
    // Create a basic reading if AI fails
    const basicReading: EnhancedTarotReading = {
      id: `fallback_${Date.now()}`,
      timestamp: new Date(),
      question,
      spread: selectedSpread?.name || 'Unknown',
      cards: [],
      interpretation: {
        overview: "The cosmic energies are particularly mysterious today. Your cards speak of hidden truths waiting to be revealed.",
        cardAnalysis: [],
        patterns: [],
        timing: {
          immediate: "Trust your intuition in the coming days.",
          shortTerm: "New opportunities will emerge within the month.",
          longTerm: "Your path leads toward greater wisdom and understanding.",
          astrologicalTiming: "The stars favor patient action.",
          seasonalConsiderations: "Seasonal energies support your growth."
        },
        guidance: "Listen to your inner voice and trust the process of unfolding.",
        warnings: ["Be wary of rushing important decisions"],
        opportunities: ["Open yourself to unexpected insights"]
      },
      education: {
        symbolismExplained: "Each card contains layers of meaning waiting to be discovered.",
        historicalContext: "Tarot has guided seekers for centuries through life's mysteries.",
        mythology: "The cards connect us to universal stories and archetypes.",
        practicalApplication: "Use these insights as guidance, not absolute prediction."
      },
      cosmicConnection: {
        astronomicalRelevance: "The current cosmic climate supports introspection and growth.",
        currentEventCorrelations: ["Global shifts mirror personal transformation"],
        seasonalInfluences: "Seasonal energies amplify the reading's power.",
        lunarGuidance: "The moon's current phase enhances intuitive insights."
      },
      carnivalNarrative: "In the swirling mists of the carnival, truth dances with mystery, and your destiny unfolds one card at a time.",
      accuracyLevel: 'MYSTICAL'
    };
    
    setCurrentReading(basicReading);
  };

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const resetReading = () => {
    setReadingStage({ stage: 'selection', progress: 0 });
    setQuestion('');
    setCurrentReading(null);
    setCosmicAlignment(null);
    setExpandedSections(new Set(['overview']));
  };

  const handleSaveReading = () => {
    if (currentReading) {
      saveReading(question, JSON.stringify(currentReading));
      alert('🔮 Reading saved to your mystical collection!');
    }
  };

  const renderStageContent = () => {
    switch (readingStage.stage) {
      case 'selection':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="reading-selection"
          >
            <div className="cosmic-header">
              <Star className="cosmic-icon" />
              <h1>Enter the Chamber of Revelations</h1>
              <Star className="cosmic-icon" />
            </div>

            <div className="question-section">
              <h2>🔮 What question seeks the carnival's wisdom?</h2>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Speak your question to the cosmos..."
                className="mystical-question-input"
                rows={3}
              />
            </div>

            {selectedSpread && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="spread-preview"
              >
                <h3>✨ Chosen Spread: {selectedSpread.name}</h3>
                <p className="spread-description">{selectedSpread.description}</p>
                <div className="cosmic-timing">
                  <Moon className="cosmic-icon" />
                  <span>Cosmic Timing: {selectedSpread.cosmicTiming?.bestMoonPhases.join(', ') || 'Always favorable'}</span>
                </div>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="begin-reading-btn"
              disabled={!selectedSpread || !question.trim()}
              onClick={handleStartReading}
            >
              <Sparkles className="btn-icon" />
              Begin the Mystical Reading
              <Sparkles className="btn-icon" />
            </motion.button>
          </motion.div>
        );

      case 'cosmic-alignment':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="cosmic-alignment"
          >
            <div className="alignment-visual">
              <div className="cosmic-circle">
                <Sun className="cosmic-body sun" />
                <Moon className="cosmic-body moon" />
                <div className="cosmic-body stars">✦</div>
              </div>
            </div>
            <h2>🌌 Aligning with Cosmic Energies</h2>
            <p>The universe prepares to reveal its secrets...</p>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${readingStage.progress}%` }}
              />
            </div>
          </motion.div>
        );

      case 'drawing':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card-drawing"
          >
            <div className="shuffling-animation">
              <Shuffle className="shuffle-icon" />
              <h2>🎭 The Cards Dance in Mystical Order</h2>
              <p>Ancient wisdom arranges itself for your revelation...</p>
            </div>
          </motion.div>
        );

      case 'revealing':
      case 'interpretation':
      case 'education':
        if (!currentReading) {
          return (
            <div className="generating-reading">
              <Brain className="thinking-icon" />
              <h2>🧠 The Carnival's Mystics Contemplate Your Fate</h2>
              <p>Profound insights are being woven together...</p>
            </div>
          );
        }

        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="enhanced-reading-display"
          >
            <div className="reading-header">
              <h1>🎪 Your Carnival of Revelations</h1>
              <div className="reading-meta">
                <span>Question: "{currentReading.question}"</span>
                <span>Spread: {currentReading.spread}</span>
                <span>Accuracy: {currentReading.accuracyLevel}</span>
              </div>
            </div>

            {/* Carnival Narrative */}
            <motion.section 
              className="carnival-narrative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2>🎭 The Mystical Tale</h2>
              <div className="narrative-text">
                {currentReading.carnivalNarrative}
              </div>
            </motion.section>

            {/* Card Display */}
            <motion.section 
              className="cards-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2>🃏 The Sacred Cards Speak</h2>
              <div className="cards-grid">
                {currentReading.cards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    className={`card-container ${card.isReversed ? 'reversed' : ''}`}
                    initial={{ opacity: 0, rotateY: 180 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="card-image">
                      <img src={card.image} alt={card.name} />
                      {card.isReversed && <div className="reversed-indicator">⟲</div>}
                    </div>
                    <div className="card-info">
                      <h3>{card.name}</h3>
                      <p className="position">{card.position.name}</p>
                      <p className="meaning">{card.position.meaning}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Interpretation Sections */}
            <div className="interpretation-sections">
              {/* Overview */}
              <CollapsibleSection
                title="🔮 Mystical Overview"
                icon={<Eye />}
                isExpanded={expandedSections.has('overview')}
                onToggle={() => toggleSection('overview')}
              >
                <p className="section-content">{currentReading.interpretation.overview}</p>
              </CollapsibleSection>

              {/* Cosmic Connection */}
              <CollapsibleSection
                title="🌌 Cosmic Connections"
                icon={<Star />}
                isExpanded={expandedSections.has('cosmic')}
                onToggle={() => toggleSection('cosmic')}
              >
                <div className="cosmic-details">
                  <h4>🌙 Lunar Guidance</h4>
                  <p>{currentReading.cosmicConnection.lunarGuidance}</p>
                  
                  <h4>🪐 Astronomical Relevance</h4>
                  <p>{currentReading.cosmicConnection.astronomicalRelevance}</p>
                  
                  <h4>🌍 World Event Correlations</h4>
                  <ul>
                    {currentReading.cosmicConnection.currentEventCorrelations.map((event, index) => (
                      <li key={index}>{event}</li>
                    ))}
                  </ul>
                </div>
              </CollapsibleSection>

              {/* Timing */}
              <CollapsibleSection
                title="⏰ Cosmic Timing"
                icon={<Clock />}
                isExpanded={expandedSections.has('timing')}
                onToggle={() => toggleSection('timing')}
              >
                <div className="timing-details">
                  <div className="timing-period">
                    <h4>Immediate (Next few days)</h4>
                    <p>{currentReading.interpretation.timing.immediate}</p>
                  </div>
                  <div className="timing-period">
                    <h4>Short Term (Next month)</h4>
                    <p>{currentReading.interpretation.timing.shortTerm}</p>
                  </div>
                  <div className="timing-period">
                    <h4>Long Term (3-6 months)</h4>
                    <p>{currentReading.interpretation.timing.longTerm}</p>
                  </div>
                </div>
              </CollapsibleSection>

              {/* Education */}
              <CollapsibleSection
                title="📚 Mystical Education"
                icon={<BookOpen />}
                isExpanded={expandedSections.has('education')}
                onToggle={() => toggleSection('education')}
              >
                <div className="education-content">
                  <h4>🔗 Symbolism Revealed</h4>
                  <p>{currentReading.education.symbolismExplained}</p>
                  
                  <h4>📜 Historical Wisdom</h4>
                  <p>{currentReading.education.historicalContext}</p>
                  
                  <h4>🏛️ Ancient Mythology</h4>
                  <p>{currentReading.education.mythology}</p>
                </div>
              </CollapsibleSection>

              {/* Guidance */}
              <CollapsibleSection
                title="🧭 Sacred Guidance"
                icon={<Sparkles />}
                isExpanded={expandedSections.has('guidance')}
                onToggle={() => toggleSection('guidance')}
              >
                <div className="guidance-content">
                  <h4>✨ Divine Guidance</h4>
                  <p>{currentReading.interpretation.guidance}</p>
                  
                  {currentReading.interpretation.opportunities && (
                    <>
                      <h4>🌟 Opportunities</h4>
                      <ul>
                        {currentReading.interpretation.opportunities.map((opp, index) => (
                          <li key={index}>{opp}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  
                  {currentReading.interpretation.warnings && (
                    <>
                      <h4>⚠️ Mystical Warnings</h4>
                      <ul>
                        {currentReading.interpretation.warnings.map((warning, index) => (
                          <li key={index}>{warning}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </CollapsibleSection>
            </div>

            {/* Action Buttons */}
            <motion.div 
              className="reading-actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <button className="save-btn" onClick={handleSaveReading}>
                <Save className="btn-icon" />
                Save to Mystical Collection
              </button>
              <button className="new-reading-btn" onClick={resetReading}>
                <RotateCcw className="btn-icon" />
                Seek New Wisdom
              </button>
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="enhanced-reading-room">
      <AnimatePresence mode="wait">
        {renderStageContent()}
      </AnimatePresence>
    </div>
  );
};

// Collapsible Section Component
interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  icon,
  children,
  isExpanded,
  onToggle
}) => (
  <motion.div className="collapsible-section">
    <button 
      className="section-header"
      onClick={onToggle}
    >
      <div className="header-content">
        {icon}
        <span>{title}</span>
      </div>
      {isExpanded ? <ChevronDown /> : <ChevronRight />}
    </button>
    
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="section-content"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export default EnhancedReadingRoom;