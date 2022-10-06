const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// User Models
const users = require('../../models/UserModel')

// User login reqest

router.post('/login', async (req, res) => {
  const { email, password } = req.body;


//   validations 
    if(!email || !password)
            return res.status(400).json({
                massage: "Please Enter all fields"
            })
//  check existing user
        users.findOne({email}).then(user => {
            if(!user)
                return res.status(400).json({
                    massage: "No crediantials found, Please creaate an Account"
                })

               bcrypt.compare(password, user.password)
               .then(isMatch => {
                    if(!isMatch) return res.status(400).json({
                        massage:"Invalide User Inputs"
                    })
                    jwt.sign({id: user.id},
                        config.get('hiwalletscret'),
                        {expiresIn: '30d'},
                        (err, token) => {
                            if(err) throw err 
                            return  res.json({
                                token: token,
                                user:{
                                    id: user.id,
                                    name: user.name,
                                    email: user.email,
                                    phone: user.phone,
                                    accont_number: user.accont_number,
                                    account_balance: user.account_balance
                                },
                                massage: "Login Successful"
                            })
                })
            })
})
})

module.exports = router