const codeGenerator = require('../utils/codeGenerator')
const time = require('../utils/time')
const response = require('../utils/response')
const jwt = require('../utils/jwt')

const email = require('../services/email')

const User = require('../schema/user').User
const OTP = require('../schema/otp').OTP

const moment = require('moment')
const mongoose = require('mongoose')

async function issueAnOtp(reqData){
    try{
        
        var user = await User.findOne({email:reqData.email})

        if(!user)
            return response.getResponse(false,"Email is not match with any of our users",null,404)

        let code = codeGenerator.generateOtp()
        let createdAt = moment(new Date()).add(5, 'm').toDate()

        let otpDetails = new OTP({user:user,code:code,createdAt:createdAt})

        let emailSendResult = await email.sendEmail(reqData.email,"Verify OTP",`Please use below OTP to reset your password. ${code}`)

        if(!emailSendResult.success)
            return response.getResponse(false,"Unable to send email",emailSendResult.error,424)

        let result = await otpDetails.save()
        
        if(!result)
            return response.getResponse(false,'Unable to save user',null,502)

        let data = {
            userId:user._id
        }

        return response.getResponse(true,'OTP code successfully sent.',null,200,data)

    }catch(e){
        return response.getResponse(false,"Undetected error",e.message,500)
    }
}

async function verifyAnOtp(reqData){
    try{
        let otpDetails = await (await OTP.findOne({user:new mongoose.Types.ObjectId(reqData.userId),code:reqData.otpCode,isVerified:false}))

        if(!otpDetails)
            return response.getResponse(false,"Invalid OTP code or OTP code is used",null,401)

        let timeAfterOtpIssued = time.calculateTimeDifferent(otpDetails.createdAt,new Date())
        if(timeAfterOtpIssued>=300)
            return response.getResponse(false,"OTP code expired. Please try again with new OTP",null,498)

        let user = await User.findOne({_id:new mongoose.Types.ObjectId(reqData.userId)})
        
        if(user.status==false){
            
            user.status=1

            otpDetails.isVerified = true
            otpDetails.isActive = false

            await otpDetails.save()
            await user.save()

            let payload = jwt.makePayloadWithUser(user)

            let data = {
                userId:otpDetails.user._id,
                accessToken:jwt.generateJWT(payload)
            }
            
            return response.getResponse(true,"OTP code is successfully verified and account activated",null,201,data)
        }
        
        let uuid = codeGenerator.generateUUID()

        otpDetails.isVerified = true
        otpDetails.isActive = true
        otpDetails.uuid = uuid

        let result = await otpDetails.save()
        
        if(!result)
            return response.getResponse(false,'Unable to save user',null,502)

        let data = {
            userId:otpDetails.user._id,
            otpId:uuid
        }

        return response.getResponse(true,'OTP code successfully verified',null,200,data)
        
    }catch(e){
        return response.getResponse(false,"Undetected error",e.message,500)
    }
}

exports.issueAnOtp = issueAnOtp
exports.verifyAnOtp = verifyAnOtp