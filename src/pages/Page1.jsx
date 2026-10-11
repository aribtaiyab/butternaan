import { useEffect, useState } from 'react';
import Particles from '../components/Particles';
import { cakeImage } from '../data/content';
import './Page1.css';

function Page1({ onNext }) {
  const [visible, setVisible]       = useState(false);
  const [imgLoaded, setImgLoaded]   = useState(false);
  const [imgError, setImgError]     = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="page1" id="page-birthday">
      <Particles count={14} />

      {/* Sparse, softly falling rose petals */}
      <div className="falling-petals-container" aria-hidden="true">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <span key={n} className={`falling-petal petal-${n}`} />
        ))}
      </div>

      <div className={`page1__inner ${visible ? 'is-visible' : ''}`}>

        {/* ── HEADING ── */}
        <header className="page1__header">
          <p className="page1__pre" aria-hidden="true">✦ for you ✦</p>
          <h1 className="page1__title">
            <span className="page1__title-top">Happy Birthday</span>
            <span className="page1__title-name">
              Afnan
              <span className="page1__heart" aria-hidden="true"> ♡</span>
            </span>
          </h1>
        </header>

        {/* ── ANIMATED CSS CAKE ── */}
        <div className="cake-scene-wrap">
          {/* Subtle warm ambient glow behind cake */}
          <div className="cake-ambient-glow" aria-hidden="true" />
          
          <div className="cake-scene" aria-label="Animated birthday cake with three tiers and candles" role="img">
            {/* Candles & flames */}
            <div className="cake-candles" aria-hidden="true">
              <div className="candle candle-1">
                <div className="candle-body" />
                <div className="flame-wrap">
                  <div className="flame" />
                  <div className="flame-glow" />
                </div>
              </div>
              <div className="candle candle-2">
                <div className="candle-body" />
                <div className="flame-wrap">
                  <div className="flame" />
                  <div className="flame-glow" />
                </div>
              </div>
              <div className="candle candle-3">
                <div className="candle-body" />
                <div className="flame-wrap">
                  <div className="flame" />
                  <div className="flame-glow" />
                </div>
              </div>
            </div>

            {/* Tier 1 — top (smallest) */}
            <div className="cake-tier cake-tier-1" aria-hidden="true">
              <div className="tier-frost" />
              <div className="tier-drip tier-drip-1" />
              <div className="tier-body" />
              <div className="tier-sprinkles">
                <span className="sp sp1" /><span className="sp sp2" /><span className="sp sp3" />
              </div>
            </div>

            {/* Tier 2 — middle */}
            <div className="cake-tier cake-tier-2" aria-hidden="true">
              <div className="tier-frost" />
              <div className="tier-drip tier-drip-2" />
              <div className="tier-body" />
              <div className="tier-sprinkles">
                <span className="sp sp1" /><span className="sp sp2" /><span className="sp sp3" />
                <span className="sp sp4" /><span className="sp sp5" />
              </div>
            </div>

            {/* Tier 3 — bottom (largest) */}
            <div className="cake-tier cake-tier-3" aria-hidden="true">
              <div className="tier-frost" />
              <div className="tier-drip tier-drip-3" />
              <div className="tier-body" />
              <div className="tier-sprinkles">
                <span className="sp sp1" /><span className="sp sp2" /><span className="sp sp3" />
                <span className="sp sp4" /><span className="sp sp5" /><span className="sp sp6" />
              </div>
              {/* Small decorative bow on the front */}
              <div className="tier-bow">🎀</div>
            </div>

            {/* Plate */}
            <div className="cake-plate" aria-hidden="true" />
          </div>
        </div>

        {/* ── SUPPLIED CAKE / CAT PHOTOGRAPH ── */}
        <div className="cake-image-wrap">
          {imgError ? (
            <div className="cake-img-placeholder" aria-label="Birthday cake photo placeholder">
              <span>🎂</span>
            </div>
          ) : (
            <img
              src={cakeImage}
              alt="Birthday cake photo"
              className={`cake-supplied-img ${imgLoaded ? 'is-loaded' : ''}`}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              loading="eager"
            />
          )}
        </div>

        {/* ── CUE & BUTTON ── */}
        <div className="page1__cta">
          <div className="page1__cue" aria-hidden="true">
            <span className="page1__cue-text">A little surprise awaits you ♡</span>
            <span className="page1__cue-arrow">↓</span>
          </div>
          <button
            id="btn-continue"
            className="btn-primary page1__btn"
            onClick={onNext}
            aria-label="Continue to the birthday secret"
          >
            Continue ♡
          </button>
        </div>

      </div>
    </div>
  );
}

export default Page1;
