import React from 'react'
import styled, { keyframes } from 'styled-components'

const tide = keyframes`
  0%, 100% { transform: translateY(-24px) scaleY(0.94); opacity: 0.42; }
  42% { transform: translateY(35px) scaleY(1.07); opacity: 0.82; }
  62% { transform: translateY(48px) scaleY(1.1); opacity: 0.3; }
  82% { transform: translateY(4px) scaleY(1); opacity: 0.32; }
`

const dissolve = keyframes`
  0%, 100% { opacity: 0.25; }
  36% { opacity: 0.95; }
  60% { opacity: 0.08; }
  80% { opacity: 0.1; }
`

const drift = keyframes`
  from { transform: translateX(-66.6666667%); }
  to { transform: translateX(0); }
`

const Scenery = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  background: #f4c9af url('/images/home/sunrise.webp') center / 100% 100%
    no-repeat;

  .sky {
    position: absolute;
    inset: 0;
    mask-image: linear-gradient(#000 0% 49%, transparent 58%);
  }

  .clouds {
    display: flex;
    width: 300%;
    height: 100%;
    animation: ${drift} 280s linear infinite;
    will-change: transform;
  }

  .cloud-panel {
    flex: 0 0 calc(100% / 3);
    height: 100%;
    background: url('/images/home/sunrise.webp') center / 100% 100% no-repeat;
  }

  /* Mirrored neighbors meet at identical edges, so the sky loops without a jump. */
  .cloud-panel:nth-child(2) {
    transform: scaleX(-1);
  }

  .shore {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 28%;
    overflow: visible;
  }

  .tide {
    opacity: 0.32;
    transform-origin: center top;
    animation: ${tide} 12s ease-in-out -3s infinite;
  }

  .foam {
    opacity: 0.15;
    animation: ${dissolve} 12s ease-in-out -3s infinite;
  }

  /* This texture never moves or changes seed, so the grain does not flicker. */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/images/home/grain.svg') repeat;
    opacity: 0.13;
    mix-blend-mode: soft-light;
  }

  @media (prefers-reduced-motion: reduce) {
    .clouds,
    .tide,
    .foam {
      animation: none;
    }

    .clouds {
      will-change: auto;
    }
    .tide {
      opacity: 0.35;
    }
    .foam {
      opacity: 0.35;
    }
  }

  @media (max-width: 760px) {
    background-size: auto 100%;
    .cloud-panel {
      background-size: auto 100%;
    }
    .shore {
      height: 14%;
    }
  }
`

const SunriseBackground = () => (
  <Scenery aria-hidden="true">
    <div className="sky">
      <div className="clouds">
        <div className="cloud-panel" />
        <div className="cloud-panel" />
        <div className="cloud-panel" />
      </div>
    </div>
    <svg className="shore" viewBox="0 0 1600 300" preserveAspectRatio="none">
      <defs>
        <linearGradient id="tide-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#91acd0" stopOpacity="0" />
          <stop offset="0.75" stopColor="#91acd0" stopOpacity="0.65" />
          <stop offset="1" stopColor="#eee1df" stopOpacity="0.8" />
        </linearGradient>
        <filter id="sea-grain" x="-5%" y="-30%" width="110%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.45"
            numOctaves="2"
            seed="12"
            result="noise"
          />
          <feComposite in="SourceGraphic" in2="noise" operator="in" />
        </filter>
      </defs>
      <g className="tide">
        <path
          d="M-40 -40 H1640 V92 C1280 100 1130 220 820 205 S250 110 -40 85 Z"
          fill="url(#tide-water)"
        />
        <g
          className="foam"
          filter="url(#sea-grain)"
          fill="none"
          stroke="#fff4d8"
        >
          <path
            d="M-40 85 C250 110 510 190 820 205 S1280 100 1640 92"
            strokeWidth="11"
          />
          <path
            d="M-40 82 C250 110 510 184 820 200 S1280 99 1640 88"
            strokeWidth="2"
          />
        </g>
      </g>
    </svg>
  </Scenery>
)

export default SunriseBackground
