import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

export default function Paint() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/paint/Paint');
  };

  return (
    <StyledWrapper>
      <div className="button-container">
        <button className="brutalist-button openai button-1" onClick={handleClick}>
          <div className="openai-logo">
            <svg className="openai-icon" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M439.652,200.348h-16.696V50.087C422.957,22.469,400.487,0,372.87,0H139.13c-27.618,0-50.087,22.469-50.087,50.087 v150.261H72.348c-9.22,0-16.696,7.475-16.696,16.696v33.391c0,27.618,22.469,50.087,50.087,50.087h83.478v144.696 C189.217,482.041,219.176,512,256,512s66.783-29.959,66.783-66.783V300.522h83.478c27.618,0,50.087-22.469,50.087-50.087v-33.391 C456.348,207.823,448.873,200.348,439.652,200.348z M122.435,50.087c0-9.206,7.49-16.696,16.696-16.696h33.391v83.478 c0,9.22,7.475,16.696,16.696,16.696s16.696-7.475,16.696-16.696V33.391h33.391v83.478c0,9.22,7.475,16.696,16.696,16.696 s16.696-7.475,16.696-16.696V33.391h33.391v83.478c0,9.22,7.475,16.696,16.696,16.696s16.696-7.475,16.696-16.696V33.391h33.391 c9.206,0,16.696,7.49,16.696,16.696v150.261h-267.13V50.087z M289.391,445.217c0,18.412-14.979,33.391-33.391,33.391 c-18.412,0-33.391-14.979-33.391-33.391V300.522h66.783V445.217z M422.957,250.435c0,9.206-7.49,16.696-16.696,16.696 c-11.705,0-292.856,0-300.522,0c-9.206,0-16.696-7.49-16.696-16.696v-16.696h16.696h300.522h16.696V250.435z" fill="currentColor"/>
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
    background-color: #0a1a2e;
    border: 3px solid #3b82f6;
    border-radius: 12px;
    box-shadow: 4px 4px 1px #000000;
  }

  .button-1:hover {
    background-color: #1e3a8a;
    border-color: #030504;
    transform: translate(-6px, -6px) rotate(1deg);
    box-shadow: 10px 10px 0 #000000, 15px 15px 20px rgba(59, 130, 246, 0.2);
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

