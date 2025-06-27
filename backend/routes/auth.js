const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET='ThisisasecretT0ken'

//Create a User using: POST "/api/auth/createuser".
router.post("/createuser",[
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be atleast 5 characters long").isLength({min: 5})
],
async (req, res) => {
    //returing BAD REQUEST if there is an error
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    //Check whether user with the same email exist
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
          return res.status(400).json({ error: "Sorry user with the same email exist" });
        }
        
      //Hasing password
      const salt = await bcrypt.genSalt(10)
      const pass = await bcrypt.hash(req.body.password,salt)
      
      //Create new User
      user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: pass,
        });
        
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken : authToken})
    } 
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
}
);

//Authenticate a User using: POST "/api/auth/login".
router.post("/login",[
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password cannot be blank").exists()
],
async (req, res) => {
    //returing BAD REQUEST if there is an error
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Please try to login with correct credentials" });
      }

      const passCompare = await bcrypt.compare(password, user.password);
      if (!passCompare) {
        return res.status(400).json({ error: "Please try to login with correct credentials" });
      }

       const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken : authToken})
    } 
    catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
})

module.exports = router;  