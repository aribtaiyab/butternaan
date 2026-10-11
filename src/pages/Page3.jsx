import { useState, useEffect, useCallback } from 'react';
import BackButton from '../components/BackButton';
import Particles from '../components/Particles';
import { photos } from '../data/content';
import './Page3.css';

function PhotoCard({ photo, index, onClick }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError]   = useState(false);

  // Original staggered rotations: Photo 1 (-2.5°), Photo 2 (+2.2°), Photo 3 (-1.8°)
  const rotations = [-2.5, 2.2, -1.8];
  const rotation = photo.rotation || rotations[index % 3];

  // Original staggered positions: Photo 1 (pos-left), Photo 2 (pos-right), Photo 3 (pos-left)
  const posClass = photo.positionClass || (index % 2 === 0 ? 'pos-left' : 'pos-right');

  // Specific aspect-ratios matching original uncropped photo geometry:
  // Photo 1 (1280x1208) is ~1:1 square
  // Photo 2 (936x1280) is ~3:4 portrait
  // Photo 3 (1080x1050) is ~1:1 square
  const aspectRatios = ['1 / 1', '3 / 4', '1 / 1'];
  const frameAspect = aspectRatios[index % 3] || '1 / 1';

  // Tasteful coordinated symbols near the frames (outside the photographs)
  const symbols = ['✿', '✨', '♡'];
  const symbol = symbols[index % 3];

  return (
    <div
      className={`photo-card-wrap ${posClass}`}
      style={{ '--delay': `${index * 0.12}s` }}
    >
      <button
        className={`photo-card photo-card--style-${(index % 3) + 1}`}
        style={{ '--rotation': `${rotation}deg` }}
        onClick={() => !error && onClick(photo)}
        aria-label={`View enlarged photo: ${photo.caption}`}
        type="button"
      >
        {/* Coordinated Scrapbook Decorative Accent (Outside image) */}
        {index === 0 && (
          <div className="photo-card__washi-tape" aria-hidden="true" />
        )}
        {index === 1 && (
          <div className="photo-card__craft-pin" aria-hidden="true">✧</div>
        )}
        {index === 2 && (
          <div className="photo-card__corner-tape" aria-hidden="true" />
        )}

        {/* Delicate decorative badge symbol outside photograph */}
        <div className={`photo-card__symbol-badge badge--${(index % 3) + 1}`} aria-hidden="true">
          {symbol}
        </div>

        {/* Photo Image Frame Aperture */}
        <div
          className="photo-card__frame"
          style={{ aspectRatio: frameAspect }}
        >
          {error ? (
            <div className="photo-card__placeholder">
              <span>🌸</span>
              <p>Photo {photo.id}</p>
            </div>
          ) : (
            <img
              src={photo.src}
              alt={photo.alt}
              className={`photo-card__img ${loaded ? 'is-loaded' : ''}`}
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
              loading="lazy"
            />
          )}
        </div>

        <p className="photo-card__caption">{photo.caption}</p>
      </button>
    </div>
  );
}

function Lightbox({ photo, onClose }) {
  const [loaded, setLoaded] = useState(false);

  const close = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [close]);

  useEffect(() => {
    const closeBtn = document.getElementById('lightbox-close');
    closeBtn?.focus();
  }, []);

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Enlarged view: ${photo.caption}`}
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="lightbox__card">
        <button
          id="lightbox-close"
          className="lightbox__close"
          onClick={close}
          aria-label="Close enlarged photo"
          type="button"
        >
          ✕
        </button>
        <div className="lightbox__img-wrap">
          {!loaded && (
            <div className="lightbox__loading" aria-label="Loading image">
              <span className="loading-spinner" aria-hidden="true">✦</span>
            </div>
          )}
          <img
            src={photo.src}
            alt={photo.alt}
            className={`lightbox__img ${loaded ? 'is-loaded' : ''}`}
            onLoad={() => setLoaded(true)}
          />
        </div>
        <p className="lightbox__caption">{photo.caption}</p>
      </div>
    </div>
  );
}

function Page3({ onNext, onBack }) {
  const [visible, setVisible]       = useState(false);
  const [lightboxPhoto, setLightbox] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const openLightbox  = (photo) => setLightbox(photo);
  const closeLightbox = ()      => setLightbox(null);

  // Exactly 3 photos
  const displayPhotos = photos.slice(0, 3);

  return (
    <div className="page3" id="page-gallery">
      <Particles count={12} />
      <BackButton onClick={onBack} />

      <div className={`page3__inner ${visible ? 'is-visible' : ''}`}>
        {/* Header */}
        <header className="page3__header">
          <div className="page3__header-deco" aria-hidden="true">
            ✦ ✧ ✦
          </div>
          <h1 className="page3__title">
            Little moments ♡
          </h1>
          <p className="page3__subtitle">
            A few pictures to add a little extra happiness to your day.
          </p>
        </header>

        {/* Elegant Instant-Film Scrapbook Gallery */}
        <section
          className="scrapbook-gallery"
          aria-label="Birthday photo gallery"
        >
          {displayPhotos.map((photo, i) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={i}
              onClick={openLightbox}
            />
          ))}
        </section>

        {/* Continue Button */}
        <div className="page3__cta">
          <button
            id="btn-continue-to-note"
            className="btn-primary page3__cta-btn"
            onClick={onNext}
            aria-label="Continue to the final birthday note"
            type="button"
          >
            Continue ♡
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <Lightbox photo={lightboxPhoto} onClose={closeLightbox} />
      )}
    </div>
  );
}

export default Page3;
