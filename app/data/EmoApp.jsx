import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

export default function EmoApp() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/apps/Emo');
  };

  return (
    <StyledWrapper>
      <div className="button-container">
        <button className="brutalist-button openai button-1" onClick={handleClick}>
          <div className="openai-logo">
            <svg className="openai-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" fill="currentColor"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" fill="currentColor"/>
            </svg>
          </div>
          <div className="button-text">
            <span>Powered By</span>
            <span>Stellar Education</span>
          </div>
        </button>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button-container {
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  /* Common styles for both buttons */
  .brutalist-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 142px;
    height: 142px;
    color: #e5dede;
    font-weight: bold;
    text-decoration: none;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  /* Styles for the first button */
  .button-1 {
    background-color: #063525;
    border: 3px solid #42c498;
    border-radius: 12px;
    box-shadow: 4px 4px 1px #000000;
  }

  .button-1:hover {
    background-color: #1a5c46;
    border-color: #030504;
    transform: translate(-6px, -6px) rotate(1deg);
    box-shadow: 10px 10px 0 #000000, 15px 15px 20px rgba(64, 164, 122, 0.2);
  }

  .button-1::before,
  .button-1::after {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: 0.6s;
  }

  .button-1::before {
    left: -100%;
  }
  .button-1::after {
    left: 100%;
  }

  .button-1:hover::before {
    animation: swipeRight 1.5s infinite;
  }
  .button-1:hover::after {
    animation: swipeLeft 1.5s infinite;
  }

  @keyframes swipeRight {
    100% {
      transform: translateX(200%) skew(-45deg);
    }
  }

  @keyframes swipeLeft {
    100% {
      transform: translateX(-200%) skew(-45deg);
    }
  }

  /* Hover effects */
  .brutalist-button:hover .openai-logo {
    transform: translateY(-10px);
  }

  .brutalist-button:hover .openai-icon {
    width: 40px;
    height: 40px;
  }

  .bruta.brutalist-button:hover .openai-text {
    opacity: 1;
    max-height: 60px;
    margin-top: 8px;
  }

  /* Styles for the OpenAI logo and text */
  .openai-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    z-index: 3;
  }

  .openai-icon {
    width: 64px;
    height: 64px;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .openai-text {
    font-size: 24px;
    letter-spacing: 0.5px;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    opacity: 0;
    max-height: 0;
    overflow: hidden;
  }

  .button-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1.2;
    text-align: center;
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    z-index: 3;
  }

  .button-text span:first-child {
    font-size: 12px;
    font-weight: normal;
  }

  .button-text span:last-child {
    font-size: 16px;
  }

  /* Hover effects */
  .brutalist-button:hover .openai-logo {
    transform: translateY(-10px);
  }

  .brutalist-button:hover .openai-icon {
    width: 40px;
    height: 40px;
  }

  .brutalist-button:hover .button-text,
  .brutalist-button:hover .openai-text {
    opacity: 1;
    max-height: 60px;
    margin-top: 8px;
  }

  /* Animation for the OpenAI logo */
  @keyframes spin-and-zoom {
    0% {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(180deg) scale(1.1);
    }
    100% {
      transform: rotate(360deg) scale(1);
    }
  }

  .brutalist-button:hover .openai-icon {
    animation: spin-and-zoom 4s cubic-bezier(0.25, 0.8, 0.25, 1) infinite;
  }

  .brutalist-button:hover .openai-text {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  .brutalist-button:active .openai-icon,
  .brutalist-button:active .openai-text,
  .brutalist-button:active .button-text {
    transform: scale(0.95);
  }`;

