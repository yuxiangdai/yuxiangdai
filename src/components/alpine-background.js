import React from 'react'
import styled from 'styled-components'

const Scenery = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
  background: #18323b;

  .panel {
    position: absolute;
    top: 0;
    bottom: 0;
    background-position: center;
    background-size: cover;
    filter: saturate(1.35) contrast(0.9);
  }
  .trees {
    left: 0;
    width: 21%;
    background-image: url('/images/home/alpine-tree.webp');
  }
  .ridge {
    left: 21%;
    width: 38%;
    background-image: url('/images/home/alpine-ridge.webp');
    background-position: 38% center;
  }
  .sunset {
    left: 59%;
    width: 23%;
    background-image: url('/images/home/alpine-sunset.webp');
    background-position: 85% center;
  }
  .forest {
    left: 82%;
    width: 18%;
    background-image: url('/images/home/alpine.webp');
    background-position: 25% center;
  }
  /* Static grain belongs only to the backdrop, leaving the prints crisp. */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    background: url('/images/home/grain.svg') repeat;
    background-size: 140px 140px;
    mix-blend-mode: soft-light;
    opacity: 0.8;
  }
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 2;
    background: linear-gradient(
      180deg,
      rgba(8, 25, 35, 0.65),
      rgba(8, 25, 35, 0.12) 30%,
      rgba(8, 25, 35, 0.2) 60%,
      rgba(8, 25, 35, 0.9)
    );
  }

  @media (max-width: 760px) {
    .trees {
      width: 28%;
    }
    .ridge {
      left: 28%;
      width: 44%;
    }
    .sunset {
      left: 72%;
      width: 28%;
    }
    .forest {
      left: 0;
      top: 62%;
      width: 62%;
    }
  }
`

const AlpineBackground = () => (
  <Scenery aria-hidden="true">
    <div className="panel trees" />
    <div className="panel ridge" />
    <div className="panel sunset" />
    <div className="panel forest" />
  </Scenery>
)

export default AlpineBackground
