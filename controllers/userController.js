const User = require('../models/User')
const bcryptjs = require('bcryptjs');
const jwtoken = require('jsonwebtoken')

const userController = {
  signUp: async (req, res) =>{
    
    const {firstName, lastName, email, password, userPicture, country} = req.body //son las propiedades que vienen desde el formulario del componente
    var errors= []
    const usedUserName = await User.findOne({email: email}) //me fijo si ya existe alguien con ese mail
    if(usedUserName){
      console.log('userexists')
      var error = {context: {label: 'email'}, message: "There's already an account with that mail"}
      errors.push(error)
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
        lastName: savedUser.lastName,
        email: savedUser.email, 
        userPicture: savedUser.userPicture,
        id: savedUser._id

      }
    })
  },
  signIn: async (req, res) =>{
    const {email, password} = req.body
    const existingUser = await User.findOne({email: email}) //veo si ya existe el usuario
    var loginerror = "User or password is incorrect. Please, try again" //No ser específico con el mensaje
    if (!existingUser){ //si no existe, la respuesta será el error de arriba
      return res.json({success: false, response: loginerror})
    }
    const matchingPass = bcryptjs.compareSync(password, existingUser.password) //acá llegó porq el usuario existe
    if(!matchingPass){//pero si escribe mal la contraseña
      return res.json({success: false, response: loginerror})//responde con el mismo error
    }
    var token = jwtoken.sign({...existingUser}, process.env.SECRET_KEY, {}) //si puso bien la contraseña, genera un token con los datos del usuario y lo almacena en la var token
    return res.json({
      success: true,  //si todo salio bien, le respondo al front-end con el token (existing user) y el nombre y foto para poder usarlo. Ningun dato sensible
      response: {
        token, 
        firstName: existingUser.firstName, 
        lastName: existingUser.lastName,
        email: existingUser.email, 
        userPicture: existingUser.userPicture,
        id: existingUser._id
      }
      })
    },
    preserveLog: (req, res) => {
      res.json({
        success: true, 
        response: {
          token: req.body.token, 
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          email: req.user.email,
          userPicture: req.user.userPicture,
          id: req.user._id
          
        }})
     }
  }
  
  module.exports = userController
  //jsonwebtoken para generar un token



  