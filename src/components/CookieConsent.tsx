
import { useState, useEffect } from 'react';

const GA_MEASUREMENT_ID = 'G-0P6QNGTZX0';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    } else if (consent === 'accepted') {
      initializeGA();
    }
  }, []);

  const initializeGA = () => {
    // Inject Google Analytics script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
  };

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    initializeGA();
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner slide-in-bottom">
      <div className="cookie-content">
        <p>
          Das Orakel nutzt Cookies, um die Magie zu verbessern. 
          Sind Sie einverstanden?
        </p>
        <div className="cookie-buttons">
          <button onClick={handleDecline} className="btn-secondary small">
            Nur Essentielle
          </button>
          <button onClick={handleAccept} className="btn-primary small">
            Alles akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}

// Add types for GA
declare global {
  interface Window {
    dataLayer: any[];
  }
}
