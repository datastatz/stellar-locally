import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

export default function AiTutor() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/tutor/aitutor');
  };

  return (
    <StyledWrapper>
      <div className="button-container">
        <button className="brutalist-button openai button-1" onClick={handleClick}>
          <div className="openai-logo">
            <svg className="openai-icon" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M463.313,346.29c-0.758-2.274-2.224-4.747-4.085-6.608l-83.683-83.682l131.503-131.502c6.603-6.603,6.603-17.307,0-23.909 L411.411,4.952C408.241,1.782,403.941,0,399.456,0s-8.785,1.782-11.954,4.952c-4.677,4.677-123.793,123.793-131.502,131.502 l-71.724-71.725c-0.001-0.001-0.002-0.002-0.003-0.005c-0.001-0.002-0.002-0.002-0.005-0.003l-47.815-47.815 c-19.819-19.821-51.904-19.826-71.727,0L16.908,64.726c-19.776,19.775-19.776,51.952,0,71.727l119.547,119.547 C134.263,258.19,16.761,375.691,4.952,387.5c-6.603,6.603-6.603,17.307,0,23.909l95.637,95.639 c3.171,3.17,7.47,4.952,11.954,4.952s8.785-1.782,11.954-4.952l131.502-131.502l83.682,83.682 c1.853,1.853,4.317,3.322,6.608,4.085l143.456,47.818c6.058,2.02,12.762,0.455,17.301-4.085c4.529-4.528,6.11-11.226,4.085-17.301 L463.313,346.29z M303.82,136.453l23.909,23.91c3.301,3.301,7.628,4.952,11.954,4.952s8.654-1.651,11.954-4.952 c6.603-6.601,6.603-17.307,0-23.909l-23.909-23.909l23.909-23.909l23.91,23.909c3.301,3.301,7.628,4.952,11.954,4.952 c4.326,0,8.654-1.65,11.954-4.952c6.603-6.603,6.603-17.307,0-23.909l-23.909-23.909l23.909-23.909l71.728,71.728L351.638,232.09 l-71.728-71.728L303.82,136.453z M423.366,351.637l-23.91,23.91L148.408,124.499l23.909-23.909L423.366,351.637z M76.681,148.408 l-35.864-35.864c-6.591-6.592-6.591-17.318,0-23.909l47.819-47.819c6.607-6.606,17.301-6.609,23.909,0l35.864,35.864 C145.133,79.956,79.944,145.145,76.681,148.408z M112.545,471.183l-71.728-71.728l23.91-23.909l23.909,23.91 c3.301,3.301,7.628,4.952,11.954,4.952c4.326,0,8.654-1.651,11.954-4.952c6.603-6.601,6.603-17.307,0-23.909l-23.908-23.91 l23.909-23.909l23.91,23.909c3.301,3.301,7.628,4.952,11.954,4.952c4.326,0,8.654-1.65,11.954-4.952 c6.603-6.603,6.603-17.307,0-23.909l-23.91-23.909l23.909-23.909l71.728,71.728L112.545,471.183z M351.637,423.366L100.59,172.317 l23.909-23.909l251.048,251.048L351.637,423.366z M382.935,439.886l56.952-56.952l28.475,85.427L382.935,439.886z" fill="white"/>
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
    background-color: #4a0000;
    border: 3px solid #ff0000;
    border-radius: 12px;
    box-shadow: 4px 4px 1px #000000;
  }

  .button-1:hover {
    background-color: #6b0000;
    border-color: #030504;
    transform: translate(-6px, -6px) rotate(1deg);
    box-shadow: 10px 10px 0 #000000, 15px 15px 20px rgba(255, 0, 0, 0.2);
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

