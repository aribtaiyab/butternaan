import { useState, useEffect, useCallback, useRef } from 'react';
import BackButton from '../components/BackButton';
import Particles from '../components/Particles';
import { PASSCODE } from '../data/content';
import './Page2.css';

const DIGITS  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'clear', 0, 'del'];
const MAX_LEN = 4;

function Page2({ onNext, onBack }) {
  const [visible, setVisible]     = useState(false);
  const [code, setCode]           = useState('');
  const [shaking, setShaking]     = useState(false);
  const [error, setError]         = useState('');
  const [success, setSuccess]     = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const containerRef              = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const checkCode = useCallback((attempt) => {
    if (attempt === PASSCODE) {
      setSuccess(true);
      setUnlocking(true);
      setTimeout(() => onNext(), 1200);
    } else {
      setShaking(true);
      setError("Incorrect code, try again! ♡");
      setTimeout(() => {
        setShaking(false);
        setCode('');
      }, 650);
    }
  }, [onNext]);

  const handleDigit = useCallback((d) => {
    if (success || unlocking) return;
    setError('');

    if (d === 'del') {
      setCode(prev => prev.slice(0, -1));
      return;
    }
    if (d === 'clear') {
      setCode('');
      return;
    }
    if (code.length >= MAX_LEN) return;

    const next = code + String(d);
    setCode(next);

    if (next.length === MAX_LEN) {
      checkCode(next);
    }
  }, [code, success, unlocking, checkCode]);

  // Keyboard listener
  useEffect(() => {
    const handler = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        handleDigit(parseInt(e.key, 10));
      } else if (e.key === 'Backspace') {
        handleDigit('del');
      } else if (e.key === 'Escape' || e.key === 'Delete') {
        handleDigit('clear');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleDigit]);

  return (
    <div className="page2" id="page-passcode">
      <Particles count={10} />
      <BackButton onClick={onBack} />

      <div className={`page2__inner ${visible ? 'is-visible' : ''}`} ref={containerRef}>
        {/* Lock icon */}
        <div className={`page2__lock ${success ? 'is-unlocked' : ''}`} aria-hidden="true">
          <div className="lock-body">
            <div className="lock-shackle" />
            <div className="lock-face">
              <div className="lock-keyhole" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <header className="page2__header">
          <h1 className="page2__title">
            A little birthday moment ♡
          </h1>
          <p className="page2__subtitle">
            Just for you, Afnan 🎀
          </p>
          <p className="page2__instruction">
            Enter the code to continue
          </p>
        </header>

        {/* Digit slots */}
        <div
          className={`page2__slots ${shaking ? 'is-shaking' : ''} ${success ? 'is-success' : ''}`}
          role="group"
          aria-label="Passcode entry"
        >
          {Array.from({ length: MAX_LEN }, (_, i) => (
            <div
              key={i}
              className={`digit-slot ${i < code.length ? 'is-filled' : ''} ${success ? 'is-correct' : ''}`}
              aria-label={`Digit ${i + 1}: ${i < code.length ? (success ? 'entered' : '•') : 'empty'}`}
            >
              <span className="digit-dot">
                {i < code.length ? (success ? '✓' : '•') : ''}
              </span>
            </div>
          ))}
        </div>

        {/* Error / Success message */}
        <div className="page2__error" role="alert" aria-live="polite">
          {error && <span className="error-text">❤️‍🩹 {error}</span>}
          {success && <span className="success-text">✓ Unlocked! Opening photos…</span>}
        </div>

        {/* Keypad — Stable 3-column grid with equal key sizing & zero digit overlap */}
        <div
          className="keypad"
          role="group"
          aria-label="Numeric keypad"
        >
          {DIGITS.map((d, i) => {
            if (d === 'clear') {
              return (
                <button
                  key={i}
                  className="key key--clear"
                  onClick={() => handleDigit('clear')}
                  aria-label="Clear all digits"
                  disabled={success || unlocking}
                  type="button"
                >
                  ✕
                </button>
              );
            }
            if (d === 'del') {
              return (
                <button
                  key={i}
                  className="key key--del"
                  onClick={() => handleDigit('del')}
                  aria-label="Delete last digit"
                  disabled={success || unlocking}
                  type="button"
                >
                  ⌫
                </button>
              );
            }
            return (
              <button
                key={i}
                className="key key--digit"
                onClick={() => handleDigit(d)}
                aria-label={`Enter digit ${d}`}
                id={`key-${d}`}
                disabled={success || unlocking}
                type="button"
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Page2;
