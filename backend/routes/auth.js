const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWTSECRET = 'jaihinddoston'

// ROUTE - 1 : Create a user using "/api/auth/createuser"  . No Login required
router.post('/createuser', [
  body('name', 'Enter valid name').isLength({ min: 3 }),
  body('email', 'Enter valid e-mail').isEmail(),
  body('password', 'Minimun length of password atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  // If errors are present .send Bad Req
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Check if user with same email already exists in database
  try {
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ error: "User with this email already exists" });
    }
    // Adding salt and hashing password before sending to database
    let salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(req.body.password, salt);

    // create user in database
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWTSECRET)    // json webtoken to be given to the new user
    console.log(authtoken)
    res.json({ authtoken })
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Some Internal error occured")
  }

})

// ROUTE - 2 : Login in page "/api/auth/login"  . 
router.post('/login', [
  body('email', 'Enter Email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  // If errors are present .send Bad Req
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //Using try catch to authenticate the login credentials are correct or incorrect
  const{email,password}=req.body;
  try {
    let user = await User.findOne({email})                        // Finding if entered email is present in my DB
    if (!user) {
      return res.status(400).json({ error: "Please enter correct credentials" })
    }
    const passwordcompare = await bcrypt.compare(password, user.password)        // Comparing entered pass with hashed pass in DB
    if (!passwordcompare) {
      return res.status(400).json({ error: "Please enter correct credentials" })
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWTSECRET)    // json webtoken to be given after successfull login
    console.log(authtoken)
    res.json({ authtoken })
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error")
  }
}
)

// ROUTE - 3 : get data of loggedin user using "/api/auth/getuser"  . No Login required

router.post('/getuser', fetchuser, async (req, res) => {
  try {
    userID = req.user.id                                          // saving jwt ka payload only, refer Route 2 jwt.sign 
    const user = await User.findById(userID).select('-password')  // geting details from DB 
    res.send(user)
  }catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error")
  } 

})


module.exports = router