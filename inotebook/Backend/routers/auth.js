const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); //for convering password into secure password we have install theses pacckage
const jwt = require('jsonwebtoken');

const JWT_SECRET = "Tanmayisagoodboy";


//create a user using: POST "api/auth/createuser". Doesn't require Auth. No login required

router.post('/createuser',[ //these can be taken from express validator
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password','Passwords must be atleast 5 charcters').isLength({ min: 5 }),
],async(req,res)=>{
  // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
      //check whether the user with this email exists already
    let user = await User.findOne({email: req.body.email});
    if(user){
      return res.status(400).json({error: "Sorry a user with this email alreday exists"})
    }
    const salt = await bcrypt.genSalt(10); // these two line is used for password hasing
    const secPass = await bcrypt.hash(req.body.password, salt);

    //create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

  const data = {
    usser:{
      id: user.id
    }
    }
  const authtoken = jwt.sign(data, JWT_SECRET);
  
    
    res.json(authtoken)

  } catch(error){
    console.error(error.message);
    res.status(500).send("some error occured");
  }
})

module.exports = router 