const passport = require('passport')
const jwStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/User')

module.exports = passport.use(new jwStrategy({    //tengo que hacer una estrategia, la exporto. 
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),        //sacame el token de la caebcera de la peticion
  secretOrKey: process.env.SECRET_KEY   //con esta clave, lo vas a interpretar
}, (payload, done)=>{//en el payload tengo disponible el token. Ya lo codifico. Busco si ese usuario existe por el id que esta en paload._doc._id
  User.findById(payload._doc._id)
  .then(user =>{
    if(!user){ //no encontró el usuario
      return done(null, false) //no devuelve usuario ni error
    }else{
      return done(null, user) //no hay error y devuelvo usuario 
    }
  })
  .catch(error =>{
    return done(error, false) //error y no hay usuario
  })
}))



//dependencias passport y passport-jwt

