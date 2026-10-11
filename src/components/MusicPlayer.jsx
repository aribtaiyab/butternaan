import { useState, useEffect, useRef, useCallback } from 'react';
import goldenHourAsset from '../golden-hour.mp3';
import './MusicPlayer.css';

// Fallback to /golden-hour.mp3 in public folder if asset resolution varies
const AUDIO_SRC = goldenHourAsset || '/golden-hour.mp3';

function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const hasUserToggledRef = useRef(false);

  // Synchronize audio element state
  const handlePlayEvent = useCallback(() => setIsPlaying(true), []);
  const handlePauseEvent = useCallback(() => setIsPlaying(false), []);
  const handleEndedEvent = useCallback(() => setIsPlaying(false), []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set initial comfortable volume around 30%
    audio.volume = 0.3;

    audio.addEventListener('play', handlePlayEvent);
    audio.addEventListener('pause', handlePauseEvent);
    audio.addEventListener('ended', handleEndedEvent);

    // Attempt autoplay when website first loads
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked by browser policy without prior interaction
          setIsPlaying(false);

          // Listen for the first user interaction to start playback smoothly
          const startOnInteraction = () => {
            // Only auto-start if the visitor has not explicitly clicked pause
            if (!hasUserToggledRef.current && audio.paused) {
              audio.play()
                .then(() => setIsPlaying(true))
                .catch(() => {});
            }
            removeInteractionListeners();
          };

          const removeInteractionListeners = () => {
            window.removeEventListener('click', startOnInteraction);
            window.removeEventListener('keydown', startOnInteraction);
            window.removeEventListener('touchstart', startOnInteraction);
            window.removeEventListener('pointerdown', startOnInteraction);
          };

          window.addEventListener('click', startOnInteraction, { once: true, passive: true });
          window.addEventListener('keydown', startOnInteraction, { once: true, passive: true });
          window.addEventListener('touchstart', startOnInteraction, { once: true, passive: true });
          window.addEventListener('pointerdown', startOnInteraction, { once: true, passive: true });
        });
    }

    return () => {
      audio.removeEventListener('play', handlePlayEvent);
      audio.removeEventListener('pause', handlePauseEvent);
      audio.removeEventListener('ended', handleEndedEvent);
    };
  }, [handlePlayEvent, handlePauseEvent, handleEndedEvent]);

  const togglePlayback = (e) => {
    // Prevent clicks on the floating control from triggering underlying page elements
    e.stopPropagation();
    hasUserToggledRef.current = true;

    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Audio playback attempt failed:', err);
        });
    }
  };

  return (
    <div className="floating-music-container">
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        preload="auto"
        loop
        playsInline
      />

      <button
        id="floating-music-toggle"
        className={`music-player-btn ${isPlaying ? 'is-playing' : 'is-paused'}`}
        onClick={togglePlayback}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        title={isPlaying ? 'Pause music (Golden Hour)' : 'Play music (Golden Hour)'}
        type="button"
      >
        {/* Subtle circular orbit rotating in reverse when playing */}
        <div className="music-orbit" aria-hidden="true">
          <svg viewBox="0 0 44 44" className="music-orbit-svg">
            <circle cx="22" cy="22" r="18" className="music-orbit-path" />
            <circle cx="22" cy="4" r="1.5" className="music-orbit-dot music-orbit-dot--1" />
            <circle cx="38" cy="29" r="1.2" className="music-orbit-dot music-orbit-dot--2" />
          </svg>
        </div>

        {/* Subtle musical sparkles emerging near orbit */}
        <span className="music-sparkle music-sparkle--1" aria-hidden="true">✦</span>
        <span className="music-sparkle music-sparkle--2" aria-hidden="true">✧</span>
        <span className="music-sparkle music-sparkle--3" aria-hidden="true">✦</span>

        {/* Center music-note icon */}
        <div className="music-icon-center" aria-hidden="true">
          {isPlaying ? (
            <svg viewBox="0 0 24 24" className="music-note-svg">
              <path
                d="M9 18V6l10-2v12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="6" cy="18" r="3" fill="currentColor" />
              <circle cx="16" cy="16" r="3" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="music-note-svg music-note-paused">
              <path
                d="M9 18V6l10-2v12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.85"
              />
              <circle cx="6" cy="18" r="3" fill="currentColor" opacity="0.85" />
              <circle cx="16" cy="16" r="3" fill="currentColor" opacity="0.85" />
              {/* Elegant delicate slash indicator */}
              <line
                x1="3"
                y1="21"
                x2="21"
                y2="3"
                stroke="#C4607E"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}

export default MusicPlayer;
