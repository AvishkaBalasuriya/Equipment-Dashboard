const uuid = require('uuid')

function generateOtp(){
    return Math.floor(100000 + Math.random() * 900000)
}

function generateUUID(){
    return uuid.v4().toString()
}

exports.generateOtp=generateOtp
exports.generateUUID=generateUUID