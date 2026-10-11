import { useState, useEffect } from 'react';
import Particles from '../components/Particles';
import './Page6.css';

function Page6({ onRestart }) {
  const [visible, setVisible]     = useState(false);
  const [blownOut, setBlownOut]   = useState(false);
  const [confetti, setConfetti]   = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleBlowCandles = () => {
    setBlownOut(true);
    // Trigger extra celebratory sparkles
    setConfetti(false);
    setTimeout(() => setConfetti(true), 100);
  };

  return (
    <div className="page6" id="page-final-celebration">
      <Particles count={20} hearts />

      <div className={`page6__inner ${visible ? 'is-visible' : ''}`}>
        
        {/* Decorative Top Sparkle Header */}
        <div className="page6__top-deco" aria-hidden="true">
          <span>✨</span>
          <span>🌸</span>
          <span>✦</span>
          <span>🌸</span>
          <span>✨</span>
        </div>

        {/* Closing Message */}
        <header className="page6__header">
          <h1 className="page6__title">
            Keep smiling, Afnan! <span aria-hidden="true">🎀</span>
          </h1>
          <p className="page6__subtitle">
            Wishing you a year filled with endless joy, laughter, and sweet moments.
          </p>
        </header>

        {/* Interactive Animated Celebration Cake */}
        <div
          className={`celebration-cake-scene ${blownOut ? 'is-blown-out' : ''}`}
          onClick={handleBlowCandles}
          role="button"
          aria-label="Interactive birthday cake - tap to blow out candles"
          tabIndex={0}
        >
          {/* Confetti Burst */}
          {confetti && (
            <div className="celebration-burst" aria-hidden="true">
              {['✨', '🌸', '💖', '✦', '🎉', '🌸', '✨', '💕'].map((s, i) => (
                <span key={i} className="c-burst-item" style={{ '--bi': i }}>{s}</span>
              ))}
            </div>
          )}

          {/* Candle Flames */}
          <div className="celebration-candles" aria-hidden="true">
            {[1, 2, 3].map((c) => (
              <div key={c} className={`c-candle c-candle-${c}`}>
                <div className="c-candle-body" />
                <div className={`c-flame-wrap ${blownOut ? 'is-extinguished' : ''}`}>
                  <div className="c-flame" />
                  <div className="c-glow" />
                </div>
                {blownOut && <div className="c-smoke" />}
              </div>
            ))}
          </div>

          {/* Cake Tiers (Muted Gold & Soft Pink Frosting) */}
          <div className="c-tier c-tier-top">
            <div className="c-frost" />
            <div className="c-body" />
          </div>
          <div className="c-tier c-tier-bottom">
            <div className="c-frost" />
            <div className="c-body" />
            <div className="c-ribbon">🎀</div>
          </div>
          <div className="c-plate" />

          <p className="c-hint">
            {blownOut ? '✨ Make a birthday wish! ✨' : '🌬️ Tap the cake to blow out candles'}
          </p>
        </div>

        {/* Action Button: Return to Page 1 */}
        <div className="page6__cta">
          <button
            id="btn-back-to-cake-final"
            className="btn-primary page6__restart-btn"
            onClick={onRestart}
            aria-label="Back to the birthday cake home screen"
            type="button"
          >
            Back to the Birthday Cake ♡
          </button>
        </div>

      </div>
    </div>
  );
}

export default Page6;
