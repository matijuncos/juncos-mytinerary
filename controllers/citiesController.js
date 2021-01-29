const City = require('../models/City')

const citiesController = {
    addCity: (req, res) =>{
        const {cityName, cityPicture} = req.body
        const newCity = new City({
            cityName,
            cityPicture
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
                error
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
                error
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
                error
            })
        })
    } 
 }
 
 module.exports = citiesController