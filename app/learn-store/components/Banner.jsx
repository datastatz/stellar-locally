import React from 'react';
import styled from 'styled-components';

const Banner = () => {
  return (
    <StyledWrapper>
      <div className="content">
        <div className="benefits">
          <div className="basic-marquee basic-marquee-1">
            {/* Circle Grid Pattern */}
            <button className="social-button">
              <svg viewBox="0 0 24 24">
                <circle cx="6" cy="6" r="2"/>
                <circle cx="12" cy="6" r="2"/>
                <circle cx="18" cy="6" r="2"/>
                <circle cx="6" cy="12" r="2"/>
                <circle cx="12" cy="12" r="2"/>
                <circle cx="18" cy="12" r="2"/>
                <circle cx="6" cy="18" r="2"/>
                <circle cx="12" cy="18" r="2"/>
                <circle cx="18" cy="18" r="2"/>
              </svg>
            </button>

            {/* Diamond Shape */}
            <button className="social-button">
              <svg viewBox="0 0 24 24">
                <path d="M12 2L2 12l10 10 10-10L12 2zm0 3.5L18.5 12 12 18.5 5.5 12 12 5.5z"/>
              </svg>
            </button>

            {/* Hexagon */}
            <button className="social-button">
              <svg viewBox="0 0 24 24">
                <path d="M17.5 3.5L22 12l-4.5 8.5h-11L2 12l4.5-8.5h11zm-1.7 2h-7.6L5 12l3.2 6.5h7.6L19 12l-3.2-6.5z"/>
              </svg>
            </button>

            {/* Triangle Play */}
            <button className="social-button">
              <svg viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>

            {/* Wave Lines */}
            <button className="social-button">
              <svg viewBox="0 0 24 24">
                <path d="M2 7c3-3 6-3 9 0s6 3 9 0M2 12c3-3 6-3 9 0s6 3 9 0M2 17c3-3 6-3 9 0s6 3 9 0" stroke="currentColor" fill="none" strokeWidth="2"/>
              </svg>
            </button>

            {/* Star */}
            <button className="social-button">
              <svg viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </button>

            {/* Square with Circle */}
            <button className="social-button">
              <svg viewBox="0 0 24 24">
                <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="4"/>
              </svg>
            </button>

            {/* Lightning Bolt */}
            <button className="social-button">
              <svg viewBox="0 0 24 24">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </button>

            {/* Chat Bubble */}
            <button className="social-button">
              <svg viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              </svg>
            </button>

            {/* Hash Symbol */}
            <button className="social-button">
              <svg viewBox="0 0 24 24">
                <path d="M10 3L8 21M16 3l-2 18M3 9h18M3 15h18" stroke="currentColor" fill="none" strokeWidth="2"/>
              </svg>
            </button>

            {/* Spiral */}
            <button className="social-button">
              <svg viewBox="0 0 24 24">
                <path d="M12 3c2.5 0 4.5 2 4.5 4.5S14.5 12 12 12s-4.5 2-4.5 4.5S9.5 21 12 21" stroke="currentColor" fill="none" strokeWidth="2"/>
                <circle cx="12" cy="7.5" r="1.5"/>
              </svg>
            </button>

            {/* Plus in Circle */}
            <button className="social-button">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>

            {/* Arrow Circle */}
            <button className="social-button">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 8l4 4-4 4M8 12h8" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>

            {/* Dots Connected */}
            <button className="social-button">
              <svg viewBox="0 0 24 24">
                <circle cx="6" cy="6" r="2"/>
                <circle cx="18" cy="6" r="2"/>
                <circle cx="6" cy="18" r="2"/>
                <circle cx="18" cy="18" r="2"/>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" fill="none" strokeWidth="1"/>
              </svg>
            </button>
          </div>

          <div className="basic-marquee basic-marquee-2">
            {/* Abstract Leaf */}
            <button className="social-button">
              <svg viewBox="0 0 24 24">
                <path d="M17 8c0 7-7 13-7 13s-7-6-7-13c0-4 3-7 7-7s7 3 7 7z"/>
              </svg>
            </button>

            {/* Infinity */}
            <button className="social-button">
              <svg viewBox="0 0 24 24">
                <path d="M8 12c0-2.2-1.8-4-4-4s-4 1.8-4 4 1.8 4 4 4 4-1.8 4-4zm8 0c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z" stroke="currentColor" fill="none" strokeWidth="2"/>
                <path d="M8 12h8" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>

            {/* Cube */}
            <button className="social-button">
              <svg viewBox="0 0 24 24">
                <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 3l7 3.5v7L12 19l-7-3.5v-7L12 5z"/>
              </svg>
            </button>

            {/* Eye Shape */}
            <button className="social-button">
              <svg viewBox="0 0 24 24">
                <path d="M12 4.5C7 4.5 2.7 7.6 1 12c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5c-1.7-4.4-6-7.5-11-7.5z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>

            {/* Pentagon */}
            <button className="social-button">
              <svg viewBox="0 0 24 24">
                <path d="M12 2l8 6v8l-8 6-8-6V8l8-6zm0 3L6 9v6l6 4.5L18 15V9l-6-4z"/>
              </svg>
            </button>

            {/* Heart Shape */}
            <button className="social-button">
              <svg viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>

            {/* Moon Crescent */}
            <button className="social-button">
              <svg viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
              </svg>
            </button>

            {/* Three Bars */}
            <button className="social-button">
              <svg viewBox="0 0 24 24">
                <rect x="3" y="6" width="18" height="2"/>
                <rect x="3" y="11" width="18" height="2"/>
                <rect x="3" y="16" width="18" height="2"/>
              </svg>
            </button>

            {/* Flower */}
            <button className="social-button">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3"/>
                <circle cx="12" cy="5" r="3"/>
                <circle cx="19" cy="12" r="3"/>
                <circle cx="12" cy="19" r="3"/>
                <circle cx="5" cy="12" r="3"/>
              </svg>
            </button>

            {/* X Shape */}
            <button className="social-button">
              <svg viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="3"/>
              </svg>
            </button>

            {/* Circle Waves */}
            <button className="social-button">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3"/>
                <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
              </svg>
            </button>

            {/* Triangle Grid */}
            <button className="social-button">
              <svg viewBox="0 0 24 24">
                <path d="M12 2l4 7H8zM4 15l4 7H0zM20 15l4 7h-8z"/>
              </svg>
            </button>

            {/* Abstract A */}
            <button className="social-button">
              <svg viewBox="0 0 24 24">
                <path d="M7 20L12 4l5 16M9 14h6" stroke="currentColor" fill="none" strokeWidth="2"/>
              </svg>
            </button>

            {/* Octagon */}
            <button className="social-button">
              <svg viewBox="0 0 24 24">
                <path d="M8 3h8l5 5v8l-5 5H8l-5-5V8l5-5zm1.5 2L5 9.5v5L9.5 19h5l4.5-4.5v-5L14.5 5h-5z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 0;
  
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    width: 300px;
    height: 100px;
    position: relative;
    overflow: hidden;
    border-radius: 14px;
    background: #1a1a1a;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin: 0 auto;
  }

  .content::before,
  .content::after {
    content: "";
    position: absolute;
    top: 0;
    width: 40px;
    height: 100%;
    z-index: 2;
    pointer-events: none;
  }

  .content::before {
    left: 0;
    background: linear-gradient(90deg, rgba(26, 26, 26, 1), transparent);
  }

  .content::after {
    right: 0;
    background: linear-gradient(-90deg, rgba(26, 26, 26, 1), transparent);
  }

  .benefits {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
    min-width: 900px;
    height: 100%;
    position: absolute;
    inset: 0;
  }

  .basic-marquee {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .basic-marquee-1 {
    animation: marquee 15s linear infinite;
  }

  .basic-marquee-2 {
    animation: marquee 21s linear infinite reverse;
  }

  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .social-button {
    width: 40px;
    height: 40px;
    border: none;
    background: #2a2a2a;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .social-button:hover {
    transform: translateY(-3px) scale(1.1);
    background: #3a3a3a;
  }

  .social-button svg {
    width: 24px;
    height: 24px;
    fill: #ffffff;
    opacity: 0.8;
    transition: all 0.3s;
  }

  .social-button:hover svg {
    opacity: 1;
  }
`;

export default Banner;