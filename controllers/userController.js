const User = require('../models/User')
const bcryptjs = require('bcryptjs');
const jwtoken = require('jsonwebtoken')

const userController = {
  signUp: async (req, res) =>{
    const {firstName, lastName, email, password, userPicture, country} = req.body
    const errors = []
    const usedUserName = await User.findOne({email: email})
    if(usedUserName){
      errors.push("There's already an account using that mail adress")
    }
    if(errors.length === 0){
      const hashedPass = bcryptjs.hashSync(password, 10)
      const newUser = new User({
        firstName, lastName, email, password: hashedPass , userPicture, country
      })
      const savedUser = await newUser.save()
      var token = jwtoken.sign({...savedUser}, process.env.SECRET_KEY, {})
      return res.json({
        success: errors.length === 0 ? true : false,
        errors: errors,
        response: {token, 
          firstName: savedUser.firstName, 
          userPicture: savedUser.userPicture
        }
      })
    }
  },
  signIn: async (req, res) =>{
    const {email, password} = req.body
    const existingUser = await User.findOne({email: email})
    const loginerror = "User or password is incorrect. Please, try again"
    if (!existingUser){
      console.log('usuario no existe')
      return res.json({success: false, response: loginerror})
    }
    const matchingPass = bcryptjs.compareSync(password, existingUser.password)
    if(!matchingPass){
      console.log('contraseña erronea')
      return res.json({success: false, response: loginerror})
    }
    var token = jwtoken.sign({...existingUser}, process.env.SECRET_KEY, {})
    return res.json({
      success: true, 
      response: {
        token, 
        firstName: existingUser.firstName, 
        userPicture: existingUser.userPicture}
    })
  }
}

module.exports = userController