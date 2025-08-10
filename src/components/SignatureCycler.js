import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const fadeInOut = keyframes`
  0% { opacity: 0; transform: translateY(10px); }
  20%, 80% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-10px); }
`

const SignatureContainer = styled.div`
  position: relative;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const SignatureText = styled.div`
  position: absolute;
  font-size: 3.5rem;
  color: #e8e6e1;
  white-space: nowrap;
  animation: ${fadeInOut} 3s ease-in-out;
  
  &.style-script {
    font-family: 'Brush Script MT', cursive;
    font-style: italic;
    transform: rotate(-2deg);
  }
  
  &.style-elegant {
    font-family: 'Playfair Display', serif;
    font-weight: 300;
    letter-spacing: 0.1em;
  }
  
  &.style-modern {
    font-family: 'Helvetica Neue', sans-serif;
    font-weight: 100;
    letter-spacing: 0.05em;
  }
  
  &.style-bold {
    font-family: 'Georgia', serif;
    font-weight: bold;
    text-transform: lowercase;
  }
  
  &.style-handwritten {
    font-family: 'Kalam', cursive;
    transform: rotate(1deg);
  }
`

const signatureStyles = [
  { text: 'Yuxiang Dai', className: 'style-script' },
  { text: 'YUXIANG DAI', className: 'style-elegant' },
  { text: 'yuxiang dai', className: 'style-modern' },
  { text: 'yuxiang dai', className: 'style-bold' },
  { text: 'Yuxiang Dai', className: 'style-handwritten' },
]

const SignatureCycler = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % signatureStyles.length)
    }, 3000) // Change every 3 seconds
    
    return () => clearInterval(interval)
  }, [])
  
  const currentStyle = signatureStyles[currentIndex]
  
  return (
    <SignatureContainer>
      <SignatureText 
        key={currentIndex} 
        className={currentStyle.className}
      >
        {currentStyle.text}
      </SignatureText>
    </SignatureContainer>
  )
}

export default SignatureCycler