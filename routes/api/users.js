const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// User Models
const users = require('../../models/UserModel')


// * Utils
const  getRandom  = require('../../helpers/Utils')

router.post('/', (req,res) => {
    const {name,email,phone,password,userRef} = req.body
    

    // Validations for request
    if (!name ||!email ||!phone ||!password) {
        return res.status(400).send({
            message: 'Please fill in all the credentials'
        })
    }

    // if user Exist
    users.findOne({email}).then(user => {
        if(user) return res.status(400).json({
            message: "user already existing"
        })
       const newUser = new users({
        name,email,phone,
        accont_number:Math.floor(Math.random() * 100000000000),
        account_balance: Math.floor(Math.random() * 1000),
        userRef,
        password
       })

    //    encrypting the user password using bcry
       bcrypt.genSalt(10,(err,salt) =>{
        bcrypt.hash(newUser.password, salt, (err, hash) =>{
            if(err) throw err
            newUser.password = hash
        //    console.log(newUser)
        newUser.save().then(user => {
            jwt.sign({id: user.id},
                config.get('hiwalletscret'),
                {expiresIn: '30d'},
                (err, token) => {
                    if(err) throw err
                   return res.status(200).json({
                        token,
                        user:{
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            phone: user.phone,
                            accont_number: user.accont_number,
                            account_balance: user.account_balance
                        }
                })
        })
        })
       })
    })
    })
}
)

module.exports = router;