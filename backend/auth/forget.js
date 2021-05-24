const OTP = require('../schema/otp').OTP
const User = require('../schema/user').User

const jwt = require('../utils/jwt')
const response = require('../utils/response')

const mongoose = require('mongoose')

async function forgetPassword(reqData){
    try{
        let otpDetails = await OTP.findOne({uuid:reqData.otpId,isActive:true})

        if(!otpDetails)
            return response.getResponse(false,"Invalid OTP id or OTP code is already used",null,401)
        
        let user = await User.findOne({_id:new mongoose.Types.ObjectId(otpDetails.user)})

        otpDetails.isActive=false

        user.rawPassword = reqData.password

        let userResult = await user.save()
        let otpResult = await otpDetails.save()

        if(!otpResult && !userResult)
            return response.getResponse(false,"Unable to save data to database",null,502)

        let payload = jwt.makePayloadWithUser(user)

        return response.getResponse(true,'User password successfully changed',null,200,{'accessToken':jwt.generateJWT(payload)})
    }catch(e){
        return response.getResponse(false,"Undetected error",e.message,500)
    }
}

exports.forgetPassword = forgetPassword