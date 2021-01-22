import React from 'react'


const Slide = ({foto}) => {
    return (
        <div className="slideCity" style={{                
                                        backgroundImage: `url(${foto.src})`, 
                                        backgroundSize: "cover", 
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "50% 50%",
                                        width: "30vw",
                                        height: "40vh"
                                         }}>
        <h3>{foto.title}</h3>
        </div>
    )
}

export default Slide
