const jwt = require('jsonwebtoken')
const User = require('../models/user')
const auth = async (req,res,next) => {
  try{
    
      // get the token from the header
      const token = req.header('Authorization').replace('Bearer ','')
   
      //validate header
      const decoded = jwt.verify(token,process.env.JWT)
     
      //find user with id from token and the token
      const user = await User.findOne({ _id : decoded._id,'tokens.token' : token})
    

      if(!user)
      {
          throw new Error()
      }
      req.token = token
      req.user = user
      next()
  }catch(e)
  {
       res.status(401).send({error : "please authenticate"})
  }
}

module.exports = auth