const City = require('../models/City')

/* const allCities = [
    {
      "title": "Paris",
      "id": 1,
      "picture": "https://www.101viajes.com/sites/default/files/styles/guia-full/public/puesta-sol-paris.jpg"
      
    },{
        "title": "Rome",
        "id": 2,
        "picture": "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/6c/2c/70.jpg"
    },{
        "title": "Istanbul",
        "id": 3,
        "picture": "https://afar-production.imgix.net/uploads/syndication/holland_americas/images/69uV268ww4/original_C_Hero_WE125547.jpg?w=750&h=563&fit=crop"
    },{
      
        "title": "London",
        "id": 4,
        "picture": "https://images.musement.com/cover/0002/49/big-ben-westminster-bridge-on-river-thames-in-london-jpg_header-148518.jpeg?w=1200&h=630&q=95&fit=crop"
    },{
        "title": "Sidney",
        "id": 5,
        "picture": "https://ep01.epimg.net/elviajero/imagenes/2019/06/05/album/1559747677_909530_1559748130_noticia_normal.jpg"
    },{
        "title": "Berlin",
        "id": 6,
        "picture": "https://assets.buendiatours.com/s3fs-public/styles/highlight_large/public/2019-11/berlin-por-que-visitar-vista-aerea-noche_4.jpg?er_OKexWcbGYBbxrrbjbK19YE9Xy2VE3&itok=wbeD35Qm"
    },{
      
        "title": "Toulouse",
        "id": 7,
        "picture": "https://connective.eu/wp-content/uploads/Toulouse-office-3.jpg"
    },{
        "title": "San Sebastian",
        "id": 8,
        "picture": "https://www.axelmag.com/wp-content/uploads/2019/11/apertura-axel-hotel-san-sebastian-1300x598.jpg"
    },{
      
        "title": "Barcelona",
        "id": 9,
        "picture": "https://www.metropoliabierta.com/uploads/s1/62/75/35/bcn_5_570x340.jpeg"
    },{
      
        "title": "Ibiza",
        "id": 10,
        "picture": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/10/2e/a4/ibiza.jpg?w=1000&h=-1&s=1"
    },{
      
        "title": "Milan",
        "id": 11,
        "picture": "https://images.musement.com/cover/0002/39/milan-vittorio-emanuele-ii-gallery-italy-jpg_header-138313.jpeg?w=1200&h=630&q=95&fit=crop"
    },{
        "title": "Bilbao",
        "id": 12,"picture": "https://tourism.euskadi.eus/contenidos/d_destinos_turisticos/0000004981_d2_rec_turismo/en_4981/images/CT_cabecerabilbaoguggen.jpg"
  
    }] */

const citiesController = {
    addCity: (req, res) =>{
        const {cityName, cityPicture} = req.body
        const newCity = new City({
            cityName: cityName,
            cityPicture: cityPicture
        })
        newCity.save()
        .then(newCity =>{
            return res.json({
                success: true, 
                response: newCity
            })
        })
        .catch(error => {
            return res.json({
                success: false, 
                error: error
            })
        })
    },
    getCities: (req, res) =>{
        City.find()
        .then( allCities =>{
            return res.json({
                results: allCities
             })
        })
        .catch(error =>{
            return res.json({
                success: false, 
                error: error
            })
        })
    },
    getOneCity: (req, res) =>{
         const id = req.params._id
         City.findById(id)
         .then (oneCitie => {
             return res.json({
                results: oneCitie
             })
         })
         .catch(error =>{
            return res.json({
                success: false, 
                error: error
            })
        })
    } 
 }
 
 module.exports = citiesController