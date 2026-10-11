import { useMemo } from 'react';
import './Particles.css';

const PARTICLE_SYMBOLS = ['✦', '✧', '♡', '✿', '⋆', '˚', '✩', '⊹'];
const HEART_SYMBOLS    = ['♡', '♡', '♡', '♥', '✦'];

function Particles({ count = 18, hearts = false }) {
  const particles = useMemo(() => {
    const symbols = hearts ? HEART_SYMBOLS : PARTICLE_SYMBOLS;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      symbol: symbols[i % symbols.length],
      left: Math.random() * 100,
      duration: 5 + Math.random() * 8,
      delay: Math.random() * 8,
      size: 10 + Math.random() * 16,
      opacity: 0.25 + Math.random() * 0.5,
    }));
  }, [count, hearts]);

  return (
    <div className="particles-layer" aria-hidden="true">
      {particles.map(p => (
        <span
          key={p.id}
          className="float-particle"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            '--duration': `${p.duration}s`,
            '--delay': `${p.delay}s`,
            '--opacity': p.opacity,
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
}

export default Particles;
