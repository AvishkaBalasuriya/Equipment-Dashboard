const otp = require('../helpers/otp')
const validator = require('../utils/validators')

const config = require('config')

module.exports = (()=>{

    let routes = require('express').Router()

    routes.post('/issue',async(request, respond)=>{
        try{
            let data = {
                email:request.body.contact
            }

            if(!validator.validateEmptyFields(data.email))
                return respond.status(200).send(config.get("error.emptyFields"))
            
            let helperResult = await otp.issueAnOtp(data) 
            return respond.status(200).send(helperResult)
        }catch(e){
            let errorResponse = config.get('error.unexpected')
            errorResponse['error']=e.message
            return respond.status(errorResponse.code).send(errorResponse)
        }
    })

    routes.post('/verify', async(request, respond)=>{
        try{
            let data = {
                userId:request.body.userId,
                otpCode:request.body.otpCode
            }

            if(!validator.validateEmptyFields(data.userId,data.otpCode))
                return respond.status(200).send(config.get("error.emptyFields"))
            
            let helperResult = await otp.verifyAnOtp(data) 
            return respond.status(200).send(helperResult)
        }catch(e){
            let errorResponse = config.get('error.unexpected')
            errorResponse['error']=e.message
            return respond.status(errorResponse.code).send(errorResponse)
        }
    })

    return routes
})()