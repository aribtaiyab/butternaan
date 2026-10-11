import { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Particles from '../components/Particles';
import VoiceNotePlayer from '../components/VoiceNotePlayer';
import './Page5.css';

function Page5({ onBack, onRestart }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="page5-pink-vintage" id="page-secret-vintage-letter">
      <Particles count={10} />
      <BackButton onClick={onBack} />

      <div className={`page5__inner ${visible ? 'is-visible' : ''}`}>
        
        {/* Antique Stationery Sheet */}
        <article
          className="vintage-letter-card"
          aria-label="Secret vintage letter for Afnan"
          role="region"
        >
          {/* Subtle Paper Texture & Aged Deckled Edge Overlays */}
          <div className="paper-grain" aria-hidden="true" />
          <div className="paper-aging-corners" aria-hidden="true" />
          <div className="paper-fold-shadow" aria-hidden="true" />

          {/* Realistic Red Roses Botanical Top Embellishment (Completely separate from text) */}
          <div className="rose-top-embellishment" aria-hidden="true">
            <svg viewBox="0 0 260 110" className="rose-svg-art" aria-hidden="true">
              <defs>
                <radialGradient id="rosePetalCenter" cx="45%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="#F24E67" />
                  <stop offset="35%" stopColor="#C41A32" />
                  <stop offset="70%" stopColor="#7E0C1E" />
                  <stop offset="100%" stopColor="#43060E" />
                </radialGradient>
                <radialGradient id="rosePetalOuter" cx="50%" cy="45%" r="55%">
                  <stop offset="0%" stopColor="#E8304D" />
                  <stop offset="50%" stopColor="#A81427" />
                  <stop offset="85%" stopColor="#670815" />
                  <stop offset="100%" stopColor="#35040B" />
                </radialGradient>
                <radialGradient id="roseBudGrad" cx="45%" cy="35%" r="55%">
                  <stop offset="0%" stopColor="#FF6B81" />
                  <stop offset="45%" stopColor="#C91C35" />
                  <stop offset="80%" stopColor="#780A1A" />
                  <stop offset="100%" stopColor="#3E050D" />
                </radialGradient>
                <linearGradient id="leafGradStem" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5E8C4E" />
                  <stop offset="60%" stopColor="#39582D" />
                  <stop offset="100%" stopColor="#1E3316" />
                </linearGradient>
                <linearGradient id="leafGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7DAE69" />
                  <stop offset="50%" stopColor="#4F753A" />
                  <stop offset="100%" stopColor="#2A431F" />
                </linearGradient>
              </defs>

              {/* Graceful Stems */}
              <path d="M48 76 Q95 62 148 78" stroke="#334D27" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M148 78 Q182 82 210 70" stroke="#334D27" strokeWidth="2" strokeLinecap="round" fill="none" />

              {/* Natural Leaves with vein details */}
              <g filter="drop-shadow(0 2px 4px rgba(40,20,10,0.18))">
                <path d="M58 60 C38 42 48 24 68 28 C78 38 72 54 58 60 Z" fill="url(#leafGradLight)" />
                <path d="M58 60 Q63 42 66 30" stroke="#253E1B" strokeWidth="1" fill="none" opacity="0.7" />

                <path d="M192 68 C214 50 206 32 188 34 C176 44 180 60 192 68 Z" fill="url(#leafGradStem)" />
                <path d="M192 68 Q195 50 190 36" stroke="#1E3316" strokeWidth="1" fill="none" opacity="0.7" />

                <path d="M110 74 C118 90 138 88 142 74 C132 68 118 68 110 74 Z" fill="url(#leafGradStem)" />
              </g>

              {/* Companion Rosebud (Left) */}
              <g transform="translate(92, 46)" filter="drop-shadow(0 4px 10px rgba(55,6,15,0.32))">
                <ellipse cx="0" cy="0" rx="18" ry="19" fill="url(#roseBudGrad)" />
                <path d="M-13 -9 C-2 -18 10 -15 14 -7 C18 3 10 13 -1 16 C-11 14 -16 4 -13 -9 Z" fill="#991224" opacity="0.95" />
                <path d="M-9 -6 C-1 -13 8 -11 10 -5 C13 2 7 9 0 11 C-8 10 -11 2 -9 -6 Z" fill="#C41D35" />
                <path d="M-5 -4 C0 -9 6 -8 8 -4 C10 1 5 6 0 7 C-5 6 -7 1 -5 -4 Z" fill="#F0425E" />
                <path d="M-2 -2 C1 -5 4 -4 5 -2 C6 1 3 4 0 4 C-3 3 -4 1 -2 -2 Z" fill="#FFA5B5" />
              </g>

              {/* Main Realistic Blooming Rose (Right) */}
              <g transform="translate(154, 42)" filter="drop-shadow(0 6px 14px rgba(55,6,15,0.36))">
                {/* Outer Petals */}
                <circle cx="0" cy="0" r="24" fill="url(#rosePetalOuter)" />
                <path d="M-22 -10 C-14 -24 14 -24 22 -10 C28 4 18 20 0 24 C-18 20 -28 4 -22 -10 Z" fill="#880E20" />
                <path d="M-17 -13 C-6 -22 12 -20 18 -10 C24 0 16 16 2 18 C-14 16 -22 1 -17 -13 Z" fill="#B3172E" />
                {/* Mid Petals */}
                <path d="M-13 -8 C-4 -16 11 -15 14 -7 C18 2 11 13 0 14 C-11 13 -16 2 -13 -8 Z" fill="url(#rosePetalCenter)" />
                <path d="M-9 -6 C-2 -12 8 -11 10 -5 C13 2 8 9 0 10 C-8 9 -11 2 -9 -6 Z" fill="#DF2B48" />
                {/* Inner Petal Swirl */}
                <path d="M-5 -4 C0 -8 6 -8 7 -4 C9 1 5 5 0 6 C-5 5 -7 0 -5 -4 Z" fill="#F85C76" />
                <path d="M-2 -2 C1 -5 4 -4 4 -2 C5 0 2 3 0 3 C-2 3 -3 0 -2 -2 Z" fill="#FFB2C0" />
              </g>
            </svg>

            {/* Fine Decorative Dividing Line */}
            <div className="rose-sep-line" aria-hidden="true" />
          </div>

          {/* Letter Title Header */}
          <header className="letter-header">
            <h1 className="letter-title">
              A Little Letter for You ♡
            </h1>
          </header>

          {/* Exact User Provided Letter Content (Preserving exact wording, punctuation, spaces, emojis) */}
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

        {/* Voice Note Player (Immediately above Back to the Birthday Cake button) */}
        <VoiceNotePlayer />

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
