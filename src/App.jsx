import { useState, useRef, useCallback, useEffect } from 'react';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Page5 from './pages/Page5';
import './App.css';

// Flow: Page1 (Home) → Page2 (Passcode) → Page3 (Gallery) → Page4 (Letter) → Page5 (Secret Vintage Letter)
const PAGES = [Page1, Page2, Page3, Page4, Page5];
const TOTAL = PAGES.length;

function App() {
  const [currentPage, setCurrentPage]  = useState(0);
  const [transitioning, setTransition] = useState(false);
  const timerRef                       = useRef(null);

  const navigate = useCallback((target) => {
    if (transitioning || target === currentPage) return;
    if (target < 0 || target >= TOTAL) return;
    setTransition(true);
    timerRef.current = setTimeout(() => {
      setCurrentPage(target);
      setTransition(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 350);
  }, [transitioning, currentPage]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const goNext    = () => navigate(currentPage + 1);
  const goBack    = () => navigate(currentPage - 1);
  const goRestart = () => navigate(0);

  const CurrentPage = PAGES[currentPage];

  const pageProps = {
    0: { onNext: goNext },
    1: { onNext: goNext, onBack: goBack },
    2: { onNext: goNext, onBack: goBack },
    3: { onNext: goNext, onBack: goBack },
    4: { onBack: goBack, onRestart: goRestart },
  };

  return (
    <div className="app-root">
      <div
        className={`page-wrapper ${transitioning ? 'is-exiting' : 'is-entering'}`}
        key={currentPage}
      >
        <CurrentPage {...(pageProps[currentPage] || {})} />
      </div>
    </div>
  );
}

export default App;
