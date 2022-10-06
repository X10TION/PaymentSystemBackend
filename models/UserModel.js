const mongoose = require('mongoose')

const userSchema =mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    account_balance : {
        type: Number,
        required: true,
        default: 0
    },
    accont_number:{
        type: Number,
        required: true,
        default: 0
    },
    registered_date:{
        type: Date,
        default: Date.now
    },
    userRef:{
        type: String,
        default: ''
    }
})

module.exports = mongoose.model("user", userSchema)