import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import ReadingRoom from './pages/ReadingRoom';
import Encyclopedia from './pages/Encyclopedia';
import History from './pages/History';
import { TarotProvider } from './context/TarotContext';
import { APIProvider } from './providers/APIProvider';
import './App.css';

function App() {
  return (
    <APIProvider>
      <TarotProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/reading-room" element={<ReadingRoom />} />
                  <Route path="/encyclopedia" element={<Encyclopedia />} />
                  <Route path="/history" element={<History />} />
                </Routes>
              </AnimatePresence>
            </main>
          </div>
          <Toaster 
            theme="dark" 
            position="top-right"
            toastOptions={{
              style: {
                background: 'var(--color-black)',
                border: '1px solid var(--color-gold)',
                color: 'var(--color-parchment)',
              },
            }}
          />
        </Router>
      </TarotProvider>
    </APIProvider>
  );
}

export default App;