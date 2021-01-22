import React, { Component } from 'react';
import Carousel from 'react-elastic-carousel';
import Slides from './Slides'

class SlideShow extends Component {
  state = {
    items: [
        [
          {
            title: 'Paris',
            src: '/assets/paris.jpg'
          },{
            title: 'Rome',
            src: '/assets/rome.jpg'
          },{
            title: 'Istanbul',
            src: '/assets/istanbul.jpg'
          },{
            title: 'London',
            src: '/assets/london.jpg'
          }],[{
            title: 'Sidney',
            src: '/assets/sidney.jpg'
          },{
            title: 'Berlin',
            src: '/assets/berlin.jpg'
          },{
            title: 'Toulouse',
            src: '/assets/toulouse.jpg'
          },{
            title: 'San Sebastian',
            src: '/assets/sansebastian.jpg'
          }],[{
            title: 'Barcelona',
            src: '/assets/barcelona.jpg'
          },{
            title: 'Ibiza',
            src: '/assets/ibiza.jpg'
          },{
            title: 'Milan',
            src: '/assets/milan.jpeg'
          },{
            title: 'Bilbao',
            src: '/assets/bilbao.jpg'
          }]]
    }
  
  render () {
    const { items } = this.state;
    return (
        <div className="carruselSection">
          <h2 className="slidesTitle">Popular MYtineraries</h2>
          <Carousel disableArrowsOnEnd={false}>
            {
              items.map((item, id) =>{
                  return(
                      <Slides item={item} key={id}/>
                  )
              })
            }
          </Carousel>
      </div>
    )
  }
}

export default SlideShow