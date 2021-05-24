const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    uuid: {
        type:String,
        default:null
    },
    code: Number,
    isVerified: {
        type:Boolean,
        default:false
    },
    isActive: {
        type:Boolean,
        default:false
    },
    createdAt: {
        type:Date,
        default:new Date()
    },
    updatedAt: {
        type:Date,
        default:new Date()
    }
})

const OTP = mongoose.model('OTP',otpSchema)

exports.OTP = OTP
exports.mongoose = mongoose