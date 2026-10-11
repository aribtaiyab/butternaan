import { useState, useEffect, useRef, useCallback } from 'react';
import goldenHourAsset from '../golden-hour.mp3';
import './MusicPlayer.css';

// Fallback to /golden-hour.mp3 in public folder if asset resolution varies
const AUDIO_SRC = goldenHourAsset || '/golden-hour.mp3';

const INTERACTION_EVENTS = ['click', 'touchend', 'pointerup', 'keydown'];

function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const hasUserToggledRef = useRef(false);
  const hasStartedRef = useRef(false);
  const isStartingRef = useRef(false);
  const isVoiceNoteActiveRef = useRef(false);
  const removeListenersRef = useRef(null);

  // Synchronize audio element state
  const handlePlayEvent = useCallback(() => setIsPlaying(true), []);
  const handlePauseEvent = useCallback(() => setIsPlaying(false), []);
  const handleEndedEvent = useCallback(() => setIsPlaying(false), []);

  const handleInteraction = useCallback((e) => {
    // If visitor has explicitly paused or toggled the music, never auto-start
    if (hasUserToggledRef.current) {
      if (removeListenersRef.current) removeListenersRef.current();
      return;
    }

    // Never auto-start while VoiceNotePlayer is playing
    if (isVoiceNoteActiveRef.current) return;

    // Do not intercept interactions on the floating music button or on the voice note card
    if (e && e.target && typeof e.target.closest === 'function') {
      if (e.target.closest('#floating-music-toggle')) return;
      if (e.target.closest('.voice-note-card')) return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    // If audio is already playing, has already started, or playback is currently in flight, do nothing
    if (!audio.paused || hasStartedRef.current || isStartingRef.current) {
      return;
    }

    isStartingRef.current = true;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isStartingRef.current = false;
          hasStartedRef.current = true;
          setIsPlaying(true);
          if (removeListenersRef.current) removeListenersRef.current();
        })
        .catch(() => {
          // Playback rejected by mobile browser restrictions (e.g. scroll gesture or unfulfilled activation)
          isStartingRef.current = false;
          // Keep listeners active to retry smoothly on next genuine user interaction
        });
    } else {
      isStartingRef.current = false;
      hasStartedRef.current = true;
      setIsPlaying(true);
      if (removeListenersRef.current) removeListenersRef.current();
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set initial comfortable volume around 30%
    audio.volume = 0.3;

    audio.addEventListener('play', handlePlayEvent);
    audio.addEventListener('pause', handlePauseEvent);
    audio.addEventListener('ended', handleEndedEvent);

    const removeInteractionListeners = () => {
      INTERACTION_EVENTS.forEach((eventType) => {
        window.removeEventListener(eventType, handleInteraction, { capture: true });
        document.removeEventListener(eventType, handleInteraction, { capture: true });
      });
    };
    removeListenersRef.current = removeInteractionListeners;

    // Attach listeners on both window and document with capture to catch genuine mobile and desktop gestures
    INTERACTION_EVENTS.forEach((eventType) => {
      window.addEventListener(eventType, handleInteraction, { capture: true, passive: true });
      document.addEventListener(eventType, handleInteraction, { capture: true, passive: true });
    });

    // Attempt autoplay when website first loads (desktop browsers with permissive policy)
    isStartingRef.current = true;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isStartingRef.current = false;
          hasStartedRef.current = true;
          setIsPlaying(true);
          removeInteractionListeners();
        })
        .catch(() => {
          // Normal mobile/strict browser autoplay restriction before user interaction
          isStartingRef.current = false;
          setIsPlaying(false);
          // Interaction listeners remain active and will catch the first user tap/click
        });
    } else {
      isStartingRef.current = false;
    }

    return () => {
      removeInteractionListeners();
      audio.removeEventListener('play', handlePlayEvent);
      audio.removeEventListener('pause', handlePauseEvent);
      audio.removeEventListener('ended', handleEndedEvent);
    };
  }, [handlePlayEvent, handlePauseEvent, handleEndedEvent, handleInteraction]);

  // Coordinate with VoiceNotePlayer: pause background music during voice playback
  useEffect(() => {
    let wasPlayingBeforeVoice = false;

    const handleVoicePlay = () => {
      isVoiceNoteActiveRef.current = true;
      const audio = audioRef.current;
      if (audio && !audio.paused) {
        wasPlayingBeforeVoice = true;
        audio.pause();
        setIsPlaying(false);
      } else {
        wasPlayingBeforeVoice = false;
      }
    };

    const handleVoicePause = () => {
      isVoiceNoteActiveRef.current = false;
      const audio = audioRef.current;
      if (wasPlayingBeforeVoice && audio && audio.paused && !hasUserToggledRef.current) {
        audio.play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
        wasPlayingBeforeVoice = false;
      }
    };

    window.addEventListener('voicenote:play', handleVoicePlay);
    window.addEventListener('voicenote:pause', handleVoicePause);

    return () => {
      window.removeEventListener('voicenote:play', handleVoicePlay);
      window.removeEventListener('voicenote:pause', handleVoicePause);
    };
  }, []);

  const togglePlayback = (e) => {
    // Prevent clicks on the floating control from triggering underlying page elements
    e.stopPropagation();
    hasUserToggledRef.current = true;
    if (removeListenersRef.current) {
      removeListenersRef.current();
    }

    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          // Notify any playing voice notes that background music has resumed
          window.dispatchEvent(new CustomEvent('bgmusic:play'));
        })
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
