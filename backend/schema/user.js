const mongoose = require('mongoose')
const hasher = require('../utils/hasher')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        validate:{
            validator:(value)=>{
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm
                return value.match(pattern)
            },
            message: "Incorrect email address"
        }
    },
    password:String,
    firstName: String,
    lastName: String,
    type: Number,
    status: {
        type:Boolean,
        default:false
    },
    createdAt: {
        type:Date,
        default:Date()
    },
    updatedAt: {
        type:Date,
        default:Date()
    }
})

userSchema.virtual('rawPassword').get(function(){ 
    return this.rawPassword
}).set(function(rawPassword){
    this.password=hasher.hash(rawPassword)
})

const User = mongoose.model('User',userSchema)

exports.User = User
exports.mongoose = mongoose


