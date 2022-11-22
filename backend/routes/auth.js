const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

// this variable is super secret !
const JWT_SECRET = "mynameisDev15";


// ROUTE 1:  create a user using POST "/api/auth/". Doesn't require login
router.post('/createuser', [
        body('email', 'Enter a valid email').isEmail(),
        body('name', 'Enter a valid name').isLength({min: 3}),
        body('password', 'Password length should be minimum 3').isLength({min: 5})
    ], async (req, res)=>{

        let success = false;

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({success, errors: errors.array()});
        }
        // check whether the user with this email exist already
        try{ 
            let user = await User.findOne({email: req.body.email});
            if(user){
                return res.status(400).json({success, error: "Sorry, this email is already used by user !"})
            }
            
            const salt = await bcrypt.genSalt(10);
            const secured_pass = await bcrypt.hash(req.body.password, salt);
            
            // creating a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secured_pass,
            })

            const data = {
                user:{
                    id: user.id
                }
            }
            const auth_token = jwt.sign(data, JWT_SECRET);

            // sending response back to the client
            success = true;
            res.json({success, auth_token});

        } catch(error){
            console.error(error.message);
            res.status(500).send("Internal Server Error occured !");
        }
})

// ROUTE 2:   Authenticate a user using POST "/api/auth/login". Doesn't require login
router.post('/login', [
    body('email', 'Enter a valid Email !').isEmail(),
    body('password', 'Password can not be blank !').exists()
], async (req, res)=>{

    let success = false;

    // if there are errors then return BAD request along with the error
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Try to get in with correct Credentials !"})
        }
        
        const password_compare = await bcrypt.compare(password, user.password);

        if(!password_compare){
            success = false;
            return res.status(400).json({success, error: "Try to get in with correct Credentials !"})
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const auth_token = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, auth_token});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error occured !");
    }
} 
)

// ROUTE 3:  Getting loggedin user's details using: POST "/api/auth/getuser". Required login

router.post('/getuser', fetchuser, async (req, res)=>{
    try {

        const user_id = req.user.id;
        const user = await User.findById(user_id).select("-password");
        res.send(user);

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal Server Error occured !");

    }
})

module.exports = router;