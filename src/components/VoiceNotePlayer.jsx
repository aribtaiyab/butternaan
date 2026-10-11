import { useState, useEffect, useRef, useCallback } from 'react';
import voiceNoteAsset from '../voicenote2.mpeg?url';
import './VoiceNotePlayer.css';

const AUDIO_SRC = voiceNoteAsset || '/voicenote2.mpeg';

// 32 aesthetic waveform bar heights in percentages (18% to 100%)
const WAVE_BARS = [
  30, 48, 70, 42, 60, 85, 55, 92, 40, 65, 88, 50, 78, 62, 95, 72,
  45, 80, 65, 90, 52, 74, 96, 58, 42, 82, 60, 88, 48, 66, 40, 28
];

const SPEEDS = [1, 1.5, 2];

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function VoiceNotePlayer() {
  const audioRef = useRef(null);
  const waveformRef = useRef(null);
  const speedMenuRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  // Synchronize audio element playback rate whenever state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Close speed menu when clicking outside or pressing Escape
  useEffect(() => {
    if (!showSpeedMenu) return;

    const handleClickOutside = (e) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target)) {
        setShowSpeedMenu(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowSpeedMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showSpeedMenu]);

  // Synchronize play state
  const handlePlay = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
    setIsPlaying(true);
    // Pause background music while voice note plays
    window.dispatchEvent(new CustomEvent('voicenote:play'));
  }, [playbackRate]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    // Resume background music if it was paused by this voice note
    window.dispatchEvent(new CustomEvent('voicenote:pause'));
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.playbackRate = playbackRate;
    }
    // Resume background music when voice note completes
    window.dispatchEvent(new CustomEvent('voicenote:pause'));
  }, [playbackRate]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      if (!isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
      audioRef.current.playbackRate = playbackRate;
      setHasError(false);
    }
  };

  const handleSpeedSelect = (speed) => {
    setPlaybackRate(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };

  const handleError = () => {
    // If the imported URL failed, fallback to /voicenote2.mpeg
    const audio = audioRef.current;
    if (audio && !audio.src.endsWith('/voicenote2.mpeg')) {
      audio.src = '/voicenote2.mpeg';
      audio.load();
      return;
    }
    setHasError(true);
    setIsPlaying(false);
  };

  // Listen if background music is manually resumed elsewhere
  useEffect(() => {
    const handleBgMusicPlay = () => {
      const audio = audioRef.current;
      if (audio && !audio.paused) {
        audio.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener('bgmusic:play', handleBgMusicPlay);
    return () => {
      window.removeEventListener('bgmusic:play', handleBgMusicPlay);
      // Clean up: if unmounting while playing, notify background music
      window.dispatchEvent(new CustomEvent('voicenote:pause'));
    };
  }, []);

  const togglePlayback = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      handlePause();
    } else {
      audio.play()
        .then(() => handlePlay())
        .catch((err) => {
          console.warn('Voice note playback error:', err);
          handlePause();
        });
    }
  };

  // Interactive seeking on waveform
  const handleWaveformClick = (e) => {
    const rect = waveformRef.current?.getBoundingClientRect();
    const audio = audioRef.current;
    if (!rect || !audio || !duration) return;

    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = ratio * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <section
      className="voice-note-card"
      aria-label="Personal voice note"
    >
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        preload="metadata"
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onError={handleError}
      />

      {/* Header with delicate microphone outline icon */}
      <div className="voice-card__header">
        <div className="voice-card__icon-badge" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="voice-mic-svg">
            <path
              d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4M8 22h8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="voice-card__meta">
          <h2 className="voice-card__title">One last little thing…</h2>
          <p className="voice-card__subtitle">A little something in my own voice.</p>
        </div>
      </div>

      {/* Functional Player Row: Play/Pause button + Waveform + Timestamp */}
      <div className="voice-card__player-row">
        <button
          className={`voice-play-btn ${isPlaying ? 'is-playing' : ''}`}
          onClick={togglePlayback}
          aria-label={isPlaying ? 'Pause voice recording' : 'Play voice recording'}
          type="button"
          disabled={hasError}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" className="voice-btn-icon" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1.5" fill="currentColor" />
              <rect x="14" y="5" width="4" height="14" rx="1.5" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="voice-btn-icon voice-icon-play" aria-hidden="true">
              <path d="M7 5.5v13a1 1 0 0 0 1.55.83l10.5-6.5a1 1 0 0 0 0-1.66l-10.5-6.5A1 1 0 0 0 7 5.5Z" fill="currentColor" />
            </svg>
          )}
        </button>

        {/* Waveform Visualization (Interactive Seekable) */}
        <div
          ref={waveformRef}
          className={`voice-waveform-wrap ${isPlaying ? 'is-active' : ''}`}
          onClick={handleWaveformClick}
          role="slider"
          aria-label="Voice note playback progress"
          aria-valuemin="0"
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(currentTime)}
          tabIndex={0}
        >
          <div className="voice-waveform-bars" aria-hidden="true">
            {WAVE_BARS.map((heightPercent, index) => {
              const barRatio = index / WAVE_BARS.length;
              const isPlayed = barRatio <= progress;
              return (
                <span
                  key={index}
                  className={`wave-bar ${isPlayed ? 'is-filled' : ''} ${isPlaying ? 'is-animating' : ''}`}
                  style={{
                    height: `${heightPercent}%`,
                    '--bar-index': index,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Playback Time Indicator */}
        <div className="voice-time-display" aria-live="off">
          {hasError ? (
            <span className="voice-time-error">Voice note ready</span>
          ) : (
            <span>
              {formatTime(currentTime)} <span className="time-sep">/</span> {formatTime(duration)}
            </span>
          )}
        </div>

        {/* Playback Speed Control */}
        <div className="voice-speed-wrap" ref={speedMenuRef}>
          <button
            type="button"
            className={`voice-speed-btn ${showSpeedMenu ? 'is-active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setShowSpeedMenu((prev) => !prev);
            }}
            aria-label={`Playback speed: ${playbackRate}×. Click to change speed`}
            aria-expanded={showSpeedMenu}
            aria-haspopup="listbox"
          >
            {playbackRate}×
          </button>

          {showSpeedMenu && (
            <div
              className="voice-speed-menu"
              role="listbox"
              aria-label="Playback speed options"
            >
              {SPEEDS.map((speed) => (
                <button
                  key={speed}
                  type="button"
                  role="option"
                  aria-selected={playbackRate === speed}
                  className={`voice-speed-option ${playbackRate === speed ? 'is-selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeedSelect(speed);
                  }}
                >
                  {speed}×
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default VoiceNotePlayer;
