import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const BackgroundContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300%;
  height: 250%;
  z-index: 1;
`

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${props => props.loaded ? (props.active ? 0.7 : 0) : 0};
  transition: opacity ${props => props.loaded ? '0.8s ease-in-out' : '1.2s ease-in-out'};
  display: block;
  -webkit-mask-image:
    linear-gradient(to right, transparent, #000 8%, #000 92%, transparent),
    linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent);
  -webkit-mask-composite: destination-in;
  mask-image:
    linear-gradient(to right, transparent, #000 8%, #000 92%, transparent),
    linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent);
  mask-composite: intersect;
`

const backgroundImages = [
  require('../images/backgrounds/a-close-up-macro-photograph-of-a-soft-si_lBQVWz5kRx2hmpiAoz-qrg_8lqR5ZLUSK6AuMy5U0gOGw.png'),
  require('../images/backgrounds/a-close-up-macro-photograph-of-a-texture_1LCCiFeAR1iE41rkV4Ratw_iTxqaOI_ShmwdevNU2PDQw.png'),
  require('../images/backgrounds/a-macro-photograph-of-a-deep-violet-blue_n8QDHdRUSdatu4eAYnOilg_RxQZuQ0vQUCsvjC88GuCWQ.png'),
  require('../images/backgrounds/a-macro-photograph-of-a-pale-silver-blue_9KVHlcTFSRK5Af40qWNsMg_KBzoo_k0S86ON6H-jqyU_A.png'),
  require('../images/backgrounds/a-macro-photograph-of-a-soft-champagne-g_aLfhrZC0TdSvikXRkCKBOA_vW9Y_pT7Q5ejl0RxMuqRPg.png'),
  require('../images/backgrounds/a-macro-photograph-of-a-soft-pink-surfac_eSoRO0uBSiKys7D3ol1GUQ_Af86dXhVQ3KczMx-82xKbA.png'),
  require('../images/backgrounds/abstract-background-charcoal-black-with-_bU2AYEU1RM-RpJ5oMzNAMA_h8ROQuukRwe0ZAPO2YVCJw.png'),
  require('../images/backgrounds/abstract-background-nearly-black-base-wi_Kg_tpKQsTTepitwzZyjssQ_1fE2PvxYQMK_TLHuksqrjw.png'),
  require('../images/backgrounds/abstract-background-subtle-vertical-stro_MT6JUJQsTfCz5L-QkvS3dw_bnwoTnf-Si6vRBptwWsrQw.png'),
  require('../images/backgrounds/abstract-painterly-background-dark-midni_WmgzVEEcSWWvb2N8Rf21dQ_ZHqU_aBURR2k1ZEknGGS4g.png'),
  require('../images/backgrounds/abstract-painterly-background-icy-blue-p_N2YKRwF7QCGST59vztZ3zw_FuGAnEP_SnOvMI1dMuk4Jg.png'),
  require('../images/backgrounds/abstract-painterly-background-with-swirl_kB84LJXiSg6r2t_WbEnqzA_7XUPfhuNQ9KMB_CcWIlUOQ.png')
]

const BackgroundCycler = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState({})
  
  useEffect(() => {
    // Delay background loading to let signature load first
    const loadTimer = setTimeout(() => {
      setLoaded(true)
    }, 1000) // Start loading backgrounds after 1 second
    
    return () => clearTimeout(loadTimer)
  }, [])
  
  useEffect(() => {
    if (!loaded) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 3000) // Change every 3 seconds
    
    return () => clearInterval(interval)
  }, [loaded])
  
  const handleImageLoad = (index) => {
    setImagesLoaded(prev => ({ ...prev, [index]: true }))
  }
  
  if (!loaded) return null // Don't render until after delay
  
  return (
    <BackgroundContainer>
      {backgroundImages.map((image, index) => (
        <BackgroundImage 
          key={index} 
          src={image.default || image}
          alt="Background texture"
          active={index === currentIndex}
          loaded={imagesLoaded[index]}
          loading="lazy"
          onLoad={() => handleImageLoad(index)}
        />
      ))}
    </BackgroundContainer>
  )
}

export default BackgroundCycler