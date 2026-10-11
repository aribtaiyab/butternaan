import { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Particles from '../components/Particles';
import './Page5.css';

function Page5({ onBack, onRestart }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="page5-pink-vintage" id="page-secret-vintage-letter">
      <Particles count={10} />
      <BackButton onClick={onBack} />

      <div className={`page5__inner ${visible ? 'is-visible' : ''}`}>
        
        {/* Aesthetic Coffee-Toned Deckled Paper Letter Card */}
        <article
          className="vintage-letter-card"
          aria-label="Secret vintage letter for Afnan"
          role="region"
        >
          {/* Subtle Paper Texture & Aged Deckled Edge Overlay */}
          <div className="paper-grain" aria-hidden="true" />
          <div className="paper-fold-shadow" aria-hidden="true" />

          {/* Elegant Top Red Roses Embellishment (1-2 Realistic Roses) */}
          <div className="rose-top-embellishment" aria-hidden="true">
            <svg viewBox="0 0 240 100" className="rose-svg-art">
              <defs>
                <radialGradient id="roseGlow1" cx="45%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="#E63952" />
                  <stop offset="50%" stopColor="#B81D33" />
                  <stop offset="85%" stopColor="#750E1E" />
                  <stop offset="100%" stopColor="#4A0812" />
                </radialGradient>
                <radialGradient id="roseGlow2" cx="50%" cy="45%" r="50%">
                  <stop offset="0%" stopColor="#FF526B" />
                  <stop offset="60%" stopColor="#C8223B" />
                  <stop offset="100%" stopColor="#630B17" />
                </radialGradient>
                <linearGradient id="leafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#557F48" />
                  <stop offset="100%" stopColor="#253D1E" />
                </linearGradient>
              </defs>

              {/* Stems & Leaves */}
              <path d="M40 70 Q90 60 140 75" stroke="#3D5A32" strokeWidth="3" fill="none" />
              <path d="M50 55 Q30 40 45 28 Q65 35 50 55" fill="url(#leafGrad1)" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.15))" />
              <path d="M170 60 Q190 40 175 28 Q155 35 170 60" fill="url(#leafGrad1)" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.15))" />
              <path d="M105 68 Q115 82 135 78 Q130 62 105 68" fill="url(#leafGrad1)" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.15))" />

              {/* Left Rose */}
              <g transform="translate(85, 42)" filter="drop-shadow(0 4px 8px rgba(50,5,12,0.35))">
                <circle cx="0" cy="0" r="22" fill="url(#roseGlow1)" />
                <path d="M-16 -10 Q0 -20 16 -10 Q24 2 14 14 Q0 22 -14 14 Q-22 2 -16 -10" fill="#B81D33" opacity="0.9" />
                <path d="M-10 -7 Q0 -14 10 -7 Q15 1 9 9 Q0 14 -9 9 Q-14 1 -10 -7" fill="#D9364F" />
                <path d="M-6 -4 Q0 -9 6 -4 Q9 1 5 6 Q0 9 -5 6 Q-9 1 -6 -4" fill="#FF6B81" />
                <path d="M-2 -2 Q0 -5 2 -2 Q4 0 2 3 Q0 4 -2 3 Q-4 0 -2 -2" fill="#FFA3B1" />
              </g>

              {/* Right Main Rose */}
              <g transform="translate(142, 38)" filter="drop-shadow(0 5px 10px rgba(50,5,12,0.38))">
                <circle cx="0" cy="0" r="26" fill="url(#roseGlow2)" />
                <path d="M-20 -12 Q0 -24 20 -12 Q28 2 16 16 Q0 26 -16 16 Q-28 2 -20 -12" fill="#A81D33" />
                <path d="M-13 -8 Q0 -17 13 -8 Q19 1 11 11 Q0 17 -11 11 Q-17 1 -13 -8" fill="#D9364F" />
                <path d="M-8 -5 Q0 -11 8 -5 Q11 1 7 7 Q0 11 -7 7 Q-11 1 -8 -5" fill="#FF526B" />
                <path d="M-4 -3 Q0 -7 4 -3 Q6 0 3 4 Q0 6 -3 4 Q-6 0 -4 -3" fill="#FFA3B1" />
              </g>
            </svg>
          </div>

          {/* Letter Title Header */}
          <header className="letter-header">
            <h1 className="letter-title">
              A Little Letter for You ♡
            </h1>
            <div className="letter-sep" aria-hidden="true" />
          </header>

          {/* Exact User Provided Letter Content (Preserving exact wording and formatting) */}
          <div className="letter-content-body">
            
            <p className="letter-greeting">
              Afnan, kaisi hain aap
            </p>

            <p className="letter-para">
              Ek baat kehni thi. Mujhe aisa lag raha hai ki shayad aap mujhse baat nhi karna chahti hain ya mere messages se uncomfortable hoti hain. Agar aisa hai to I am genuinely sorry. Main kabhi nahi chahunga ki meri wajah se aap pareshan ho ya apko irritation ho.
            </p>

            <p className="letter-para">
              Sach kahu to main bas aapse baat karna chahta tha isliye message kar diya karta tha. Aapka reply aa jata tha toh acha lagta tha
            </p>

            <p className="letter-para">
              Mera kabhi bhi apko hurt karne ya uncomfortable feel karwane ka intention nhi tha.
            </p>

            <p className="letter-para">
              Aur sukriya ki apne mera woh poora message padha aur apni taraf se sab kuch clearly bata diya. Main uski respect karta hoon. Sorry ki uske baad bhi maine aapko messages kiye. Bas mann karta tha ki apse normal si baat ho jaye, lekin mujhe ehsaas hai ki meri chahat ki wajah se aap par koi pressure nahi aana chahiye.
            </p>

            <p className="letter-para">
              Agar meri kisi bhi baat ya message se aapko kabhi pareshani hui ho, toh I'm really sorry. Main dil se kabhi nahi chahunga ki aapko meri wajah se koi discomfort ho.
            </p>

            {/* Delicate Sepia Ornament Separator */}
            <div className="letter-ornament" aria-hidden="true">
              <span>❦</span>
            </div>

            <p className="letter-para letter-highlight">
              So yaar, choriye ab ye sab  Aaj apka birthday hai toh bas enjoy kariye, cake kaatiye , dosto ke saath ghumiye
            </p>

            <p className="letter-para">
              Aur apke birthday ke liye main bas yahi kar sakta tha to ek website bana di.  Aur kuchh to ka nhi sakta tha, kyunki aap gifts leti nhi
            </p>

            <p className="letter-para">
              Bas socha kuchh aisa karu jo thoda alag ho aur dekhkar apke face par smile aa jaaye. Isliye banayi, aur kuch nahi. Baaki, I hope aapko achhi lagi hogi. 😊
            </p>

            <p className="letter-para letter-closing-text">
              Chaliye, ab birthday enjoy kariye aur keep smiling! 🎂✨
            </p>

          </div>

        </article>

        {/* Action Button: Return to Page 1 */}
        <div className="page5__cta">
          <button
            id="btn-back-to-cake-final"
            className="btn-primary page5__restart-btn"
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

export default Page5;
