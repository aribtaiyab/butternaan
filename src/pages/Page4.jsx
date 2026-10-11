import { useState, useEffect, useRef } from 'react';
import BackButton from '../components/BackButton';
import Particles from '../components/Particles';
import { birthdayLetter } from '../data/content';
import './Page4.css';

const CHAR_SPEED = 20; // ms per character for typewriter effect

function Page4({ onNext, onBack, onRestart }) {
  const [visible, setVisible]            = useState(false);
  const [typing, setTyping]              = useState(false);
  const [displayedText, setDisplayText] = useState('');
  const [showClosing, setShowClosing]   = useState(false);
  const timerRef                         = useRef(null);

  // Full letter text assembled
  const fullText = [
    birthdayLetter.greeting,
    '',
    ...birthdayLetter.paragraphs.flatMap((p, i) =>
      i < birthdayLetter.paragraphs.length - 1 ? [p, ''] : [p]
    ),
    ...(birthdayLetter.closing ? ['', birthdayLetter.closing] : []),
    ...(birthdayLetter.signature ? [birthdayLetter.signature] : []),
  ].join('\n');

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(true);
      startTyping();
    }, 250);
    return () => {
      clearTimeout(t);
      clearTimeout(timerRef.current);
    };
  }, []);

  const startTyping = () => {
    setTyping(true);
    setDisplayText('');
    let i = 0;
    const tick = () => {
      i++;
      setDisplayText(fullText.slice(0, i));
      if (i < fullText.length) {
        timerRef.current = setTimeout(tick, CHAR_SPEED);
      } else {
        setTyping(false);
        setShowClosing(true);
      }
    };
    timerRef.current = setTimeout(tick, 500);
  };

  const revealAll = () => {
    clearTimeout(timerRef.current);
    setDisplayText(fullText);
    setTyping(false);
    setShowClosing(true);
  };

  // Convert newlines to formatted JSX lines
  const renderText = (text) => {
    return text.split('\n').map((line, i) => (
      <span key={i} className={line.startsWith('Hey') ? 'letter-greeting' : line.startsWith('With') || line.startsWith('Your') ? 'letter-closing' : ''}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <div className="page4" id="page-letter">
      <Particles count={12} hearts />
      <BackButton onClick={onBack} />

      <div className={`page4__inner ${visible ? 'is-visible' : ''}`}>
        {/* Header */}
        <header className="page4__header">
          <div className="page4__deco" aria-hidden="true">✦ ♡ ✦</div>
          <h1 className="page4__title">
            A little birthday letter ♡
          </h1>
        </header>

        {/* Cream Paper Letter Card */}
        <article
          className="letter-card"
          aria-label="Birthday letter"
          role="region"
        >
          {/* Top paper ribbon */}
          <div className="letter-card__top" aria-hidden="true">
            <div className="letter-top-line" />
            <span className="letter-seal">🎀</span>
            <div className="letter-top-line" />
          </div>

          {/* Letter Body */}
          <div className="letter-body">
            <p className="letter-text" aria-live="polite" aria-atomic="false">
              {renderText(displayedText)}
              {typing && (
                <span className="letter-cursor" aria-hidden="true">|</span>
              )}
            </p>
          </div>

          {/* Bottom decoration */}
          <div className="letter-card__bottom" aria-hidden="true">
            <span>✦</span>
            <span>🌷</span>
            <span>✦</span>
          </div>
        </article>

        {/* Reveal button while typing */}
        {typing && (
          <button
            id="btn-reveal-letter"
            className="btn-secondary page4__reveal-btn"
            onClick={revealAll}
            aria-label="Show the full letter immediately"
            type="button"
          >
            ✦ Show full letter
          </button>
        )}

        {/* Closing details and Navigation buttons */}
        {showClosing && (
          <div className="page4__closing">
            {/* Heart burst */}
            <div className="hearts-burst" aria-hidden="true">
              {['♡', '🌸', '✦', '🌷', '♡'].map((s, i) => (
                <span key={i} className="burst-heart" style={{ '--bi': i }}>
                  {s}
                </span>
              ))}
            </div>

            <div className="page4__final">
              <p className="page4__final-quote">
                May your year be as bright and beautiful as your smile ♡
              </p>

              <div className="page4__action-buttons">
                {onNext && (
                  <button
                    id="btn-secret-note"
                    className="btn-primary page4__note-btn"
                    onClick={onNext}
                    aria-label="Open the secret note section"
                    type="button"
                  >
                    A Little Note for You ♡
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page4;
