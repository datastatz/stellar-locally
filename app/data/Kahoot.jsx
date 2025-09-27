import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

export default function Kahoot() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/kahoot/Kahoot');
  };

  return (
    <StyledWrapper>
      <div className="button-container">
        <button className="brutalist-button openai button-1" onClick={handleClick}>
          <div className="openai-logo">
            <svg className="openai-icon" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <circle style={{fill:"#FC6F58"}} cx="256" cy="256" r="256"></circle>
              <path style={{fill:"#F1543F"}} d="M508.65,297.405L401.094,189.847l-26.871,8.539L260.237,87.545l-8.654,106.932l-85.152,69.93 l-59.518,92.972l154.552,154.552C386.296,509.316,489.141,417.351,508.65,297.405z"></path>
              <path style={{fill:"#FFFFFF"}} d="M256,199.111L256,199.111c-2.857,0-5.172-2.315-5.172-5.172V90.505c0-2.857,2.315-5.172,5.172-5.172 l0,0c2.857,0,5.172,2.315,5.172,5.172v103.434C261.172,196.796,258.855,199.111,256,199.111z"></path>
              <path style={{fill:"#E6F3FF"}} d="M256,85.333c-0.197,0-0.383,0.036-0.574,0.059v113.662c0.191,0.021,0.378,0.059,0.574,0.059 c2.857,0,5.172-2.315,5.172-5.172V90.507C261.172,87.649,258.855,85.333,256,85.333z"></path>
              <path style={{fill:"#808183"}} d="M277.261,199.111h-42.524c-3.967,0-7.184-3.215-7.184-7.182V177.85c0-3.967,3.215-7.182,7.184-7.182 h42.524c3.967,0,7.184,3.215,7.184,7.182v14.079C284.444,195.896,281.228,199.111,277.261,199.111z"></path>
              <path style={{fill:"#59595B"}} d="M277.261,170.667h-21.837v28.444h21.837c3.967,0,7.184-3.215,7.184-7.184v-14.079 C284.444,173.882,281.228,170.667,277.261,170.667z"></path>
              <path style={{fill:"#CFDBE6"}} d="M343.414,225.742V192.3h-174.83v33.442l-67.736-8.466v126.147c0,13.093,14.152,23.705,31.608,23.705 c11.343,0,21.816-4.558,27.443-11.945l67.015-87.957h58.17l67.015,87.957c5.627,7.387,16.101,11.945,27.443,11.945 c17.456,0,31.608-10.614,31.608-23.705V217.276L343.414,225.742z"></path>
              <path style={{fill:"#B8C9D9"}} d="M343.414,225.742V192.3h-87.988v74.926h29.658l67.015,87.957 c5.627,7.385,16.101,11.945,27.443,11.945c17.456,0,31.608-10.614,31.608-23.705V217.276L343.414,225.742z"></path>
              <circle style={{fill:"#E6F3FF"}} cx="171.942" cy="226.314" r="71.094"></circle>
              <circle style={{fill:"#CFDBE6"}} cx="340.058" cy="226.314" r="71.094"></circle>
              <path style={{fill:"#B8C9D9"}} d="M199.601,215.119h-10.552c-3.267,0-5.915-2.648-5.915-5.915v-10.552c0-3.267-2.648-5.915-5.915-5.915 h-10.552c-3.267,0-5.915,2.648-5.915,5.915v10.552c0,3.267-2.648,5.915-5.915,5.915h-10.552c-3.267,0-5.915,2.648-5.915,5.915 v10.552c0,3.267,2.648,5.915,5.915,5.915h10.552c3.267,0,5.915,2.648,5.915,5.915v10.552c0,3.267,2.648,5.915,5.915,5.915h10.552 c3.267,0,5.915-2.648,5.915-5.915v-10.552c0-3.267,2.648-5.915,5.915-5.915h10.552c3.267,0,5.915-2.648,5.915-5.915v-10.552 C205.515,217.767,202.867,215.119,199.601,215.119z"></path>
              <circle style={{fill:"#4CDBC4"}} cx="358.072" cy="208.282" r="14.564"></circle>
              <circle style={{fill:"#B8C9D9"}} cx="322.043" cy="244.329" r="14.564"></circle>
              <circle style={{fill:"#FD8469"}} cx="358.072" cy="244.329" r="14.564"></circle>
              <circle style={{fill:"#FF80AA"}} cx="322.043" cy="208.282" r="14.564"></circle>
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
    background-color: #4a1a4a;
    border: 3px solid #ec4899;
    border-radius: 12px;
    box-shadow: 4px 4px 1px #000000;
  }

  .button-1:hover {
    background-color: #6b2c6b;
    border-color: #030504;
    transform: translate(-6px, -6px) rotate(1deg);
    box-shadow: 10px 10px 0 #000000, 15px 15px 20px rgba(236, 72, 153, 0.2);
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

