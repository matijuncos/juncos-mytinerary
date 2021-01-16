import React, { Component } from 'react';
import Carousel from 'react-elastic-carousel';
import Slides from './Slides'

class SlideShow extends Component {
  state = {
        items: [
            [
              {
                title: 'Paris',
                src: require('../assets/paris.jpg'),
              },{
                title: 'Rome',
                src: require('../assets/rome.jpg'),
              },{
                title: 'Istanbul',
                src: require('../assets/istanbul.jpg'),
              },{
                title: 'London',
                src: require('../assets/london.jpg'),
              }],[{
                title: 'Sidney',
                src: require('../assets/sidney.jpg'),
              },{
                title: 'Berlin',
                src: require('../assets/berlin.jpg'),
              },{
                title: 'Toulouse',
                src: require('../assets/toulouse.jpg'),
              },{
                title: 'San Sebastian',
                src: require('../assets/sansebastian.jpg'),
              }],[{
                title: 'Barcelona',
                src: require('../assets/barcelona.jpg'),
              },{
                title: 'Ibiza',
                src: require('../assets/ibiza.jpg'),
              },{
                title: 'Milan',
                src: require('../assets/milan.jpeg'),
              },{
                title: 'Bilbao',
                src: require('../assets/bilbao.jpg'),
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