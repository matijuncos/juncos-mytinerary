const Joi = require('joi')

const validator = {
  joiValidate: (req, res, next) =>{
      //tengo que generar un schema con sus propiedades y el molde o patrón que le corresponde
      const schema = Joi.object({
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().required(),
        email: Joi.string().trim().required().email({tlds: {allow:false}}),
        password: Joi.string().trim().required(),
        userPicture: Joi.string().uri(),
        country: Joi.string().required()
      })
      const validation = schema.validate( req.body, {abortEarly: false})
      //validation tiene una propiedad value y si la validacion no pasa, una propiedad error. Voy a ver si existe o no en un condicional para pasar a next (ver cuaderno)
      if(!validation.error){
        next()
      }else{
        res.json({
          success: false, errors: validation.error
        })
      }
    }
}

module.exports = validator

//al middleware lo importo en las rutas y lo agrego antes de que llegue al controlador
//validator.validate, rutaAcontrolador

//para validaciones vamos a usar una librearía de react -> Joi
//jsonwebtoken para generar un token
//