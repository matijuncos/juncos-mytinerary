import React from 'react'
import video from '../assets/video-1.mp4'
import CallToAction from './CallToAction'
import Logo from './Logo'
import SlideShow from './SlideShow'

function Entrar() {
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
