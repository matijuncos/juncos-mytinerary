const Joi = require('joi')

const validator = {
  joiValidate: (req, res, next) =>{
      //tengo que generar un schema con sus propiedades y el molde o patrón que le corresponde -       ([a-zA-Z0-9])
      const schema = Joi.object({
        firstName: Joi.string().trim().required().min(3).messages({
          "string.base": "Your name should by a text type",
          "string.empty": "Your first name is a required field",
          "any.required": "Your first name is a required field",
          "string.min": "You first name must have at least 3 letters"

        }),
        lastName: Joi.string().trim().required().min(3).messages({
          "string.base": "Sorry! It looks like something went wrong. Please try later.",
          "string.empty": "Your last name is a required field",
          "any.required": "Your last name is a required field",
          "string.min": "You last name must have at least 3 letters"

        }),
        email: Joi.string().trim().required().email({tlds: {allow:false}}).messages({
          "string.base": "Sorry! It looks like something went wrong. Please try later.",
          "string.empty": "Your mail address is a required field",
          "any.required": "Your mail address is a required field",
          "string.email": "Please write a valid email address",
          "array.unique": "The account already exists"
        }),
        password: Joi.string().trim().required().min(6).pattern(/(?=.*\d)(?=.*[A-z])/).messages({
          "string.base": "Sorry! It looks like something went wrong. Please try later.",
          "string.empty": "Your password is a required field",
          "string.pattern.base": "Your password must contain a letter and a number",
          "string.min": "Your passwrod must contain at least 6 characters",
          "any.required": "Your password is a required field",

        }),
        // userPicture: Joi.string().uri().required().messages({
        //   "string.uri": "You should use a valid URL",
        //   "string.empty": "You should use a valid URL",
        //   "string.base": "Sorry! It looks like something went wrong. Please try later.",
        //   "any.required": "You should use a valid URL",

        // }),
        // country: Joi.string().required().messages({
        //   "string.empty": "Please, choose a country",
        //   "any.required": "Please, choose a country",
        // })
      })

      const validation = schema.validate( req.body, {abortEarly: false})
      //validation tiene una propiedad value y si la validacion no pasa, una propiedad error. Voy a ver si existe o no en un condicional para pasar a next (ver cuaderno)
      if(!validation.error){
        next()
      }else{
        res.json({
          success: false, errors: validation.error.details
        })
      }
    }
}

module.exports = validator

//al middleware lo importo en las rutas y lo agrego antes de que llegue al controlador
//validator.validate, rutaAcontrolador

//para validaciones vamos a usar una librearía de react -> Joi

//