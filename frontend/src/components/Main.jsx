import React, { useEffect } from 'react'
import video from '../assets/video-1.mp4'
import CallToAction from './CallToAction'
import Logo from './Logo'
import SlideShow from './SlideShow'

function Entrar() {
  useEffect(()=>{
    window.scrollTo(0, 0)    
  },[])

    return (
        <>
          <video src={video}  autoPlay loop muted ></video>  
          <Logo/>
          <CallToAction/>
          <SlideShow/>
        </>
    )
}

export default Entrar
