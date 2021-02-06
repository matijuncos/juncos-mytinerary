const User = require('../models/User')
const bcryptjs = require('bcryptjs');
const jwtoken = require('jsonwebtoken')

const userController = {
  signUp: async (req, res) =>{
    const {firstName, lastName, email, password, userPicture, country} = req.body //son las propiedades que vienen desde el formulario del componente
    const errors = [] 
    const usedUserName = await User.findOne({email: email}) //me fijo si ya existe alguien con ese mail
    if(usedUserName){
      errors.push("There's already an account using that mail adress") //si ya existe, mando el error al array vacío
    }
    if(errors.length === 0){ //si no han habido errores, hasheo el password y genero el nuevo usuario, con el password haseado
      const hashedPass = bcryptjs.hashSync(password, 10)
      const newUser = new User({
        firstName, lastName, email, password: hashedPass , userPicture, country
      })
      var savedUser = await newUser.save() //aqui al nuevo usuario lo guardo en la BD y genero un token con los datos del usuario
      var token = jwtoken.sign({...savedUser}, process.env.SECRET_KEY, {})
    }
    return res.json({//respuesta al frontend
      success: errors.length === 0 ? true : false, //suceess sera true si no han habido errores, envío al front los errores
      errors,
      response: errors.length === 0 && { //si no hay errores, la respuesta será el token, el nombre y la foto de usuario.
        token, 
        firstName: savedUser.firstName, 
        userPicture: savedUser.userPicture
      }
    })
  },
  signIn: async (req, res) =>{
    const {email, password} = req.body
    const existingUser = await User.findOne({email: email}) //veo si ya existe el usuario
    const loginerror = "User or password is incorrect. Please, try again" //No ser específico con el mensaje
    if (!existingUser){ //si no existe, la respuesta será el error de arriba
      console.log('usuario no existe')
      return res.json({success: false, response: loginerror})
    }
    const matchingPass = bcryptjs.compareSync(password, existingUser.password) //acá llegó porq el usuario existe
    if(!matchingPass){//pero si escribe mal la contraseña
      console.log('contraseña erronea')
      return res.json({success: false, response: loginerror})//responde con el mismo error
    }
    var token = jwtoken.sign({...existingUser}, process.env.SECRET_KEY, {}) //si puso bien la contraseña, genera un token con los datos del usuario y lo almacena en la var token
    console.log('inicistaste sesion')
    
    return res.json({
      success: true,  //si todo salio bien, le respondo al front-end con el token (existing user) y el nombre y foto para poder usarlo. Ningun dato sensible
      response: {
        token, 
        firstName: existingUser.firstName, 
        userPicture: existingUser.userPicture}
      })
    },
    preserveLog: (req, res) => {
      res.json({
        success: true, 
        response: {
          token: req.body.token, 
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          userPicture: req.user.userPicture
          
        }})
     }
  }
  
  module.exports = userController
  //jsonwebtoken para generar un token