import React from 'react'
import Slide from "./Slide";
import { v4 as uuidv4 } from 'uuid';


const Slides = ({item}) => {
    return (
        <div className="slide">
            {
                item.map(foto =>{
                    return(
                            <Slide foto={foto} key={uuidv4()} />
                    )
                })
            }
        </div>
    )
}

export default Slides
