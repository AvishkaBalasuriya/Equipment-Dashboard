const login = require('../auth/login').login
const register = require('../auth/register').register
const forget = require('../auth/forget').forgetPassword

const otp = require('../helpers/otp')

const jwtMiddleware = require('../middlewares/jwt').HttpJWT

const validator = require('../utils/validators')

const config = require('config')

module.exports = (()=>{

    let routes = require('express').Router()

    routes.post('/login',async(request, respond)=>{
        try{
            if(!validator.validateEmptyFields(request.body))
                return respond.status(200).send(config.get("error.emptyFields"))

            let data = {
                email:request.body.email,
                password:request.body.password
            }

            let helperResult = await login(data) 
            return respond.status(200).send(helperResult)
        }catch(e){
            let errorResponse = config.get('error.unexpected')
            errorResponse['error']=e.message
            return respond.status(errorResponse.code).send(errorResponse)
        }
    })

    routes.post('/register',jwtMiddleware,async(request, respond)=>{
        try{
            if(!validator.validateEmptyFields(request.body))
                return respond.status(200).send(config.get("error.emptyFields"))

            if(!validator.validateConfirmPassword(request.body))
                return respond.status(200).send({success:false,message:'Passwords not matching',error:null,code:400,data:null})
            
            if(!validator.validatePassword(request.body))
                return respond.status(200).send({success:false,message:'Password mot matching security criteria',error:null,code:400,data:null})

            let data = {
                email:request.body.email,
                rawPassword:request.body.password,
                firstName:request.body.firstName,
                lastName:request.body.lastName,
                type:request.body.type,
                status:false
            }
            
            let helperResult = await register(data) 
            return respond.status(200).send(helperResult)
        }catch(e){
            let errorResponse = config.get('error.unexpected')
            errorResponse['error']=e.message
            return respond.status(errorResponse.code).send(errorResponse)
        }
    })

    routes.post('/forget',async(request, respond)=>{
        try{
            if(!validator.validateEmptyFields(request.body))
                return respond.status(200).send(config.get("error.emptyFields"))
                
            if(!validator.validateConfirmPassword(request.body))
                return respond.status(200).send({success:false,message:'Passwords not matching',error:null,code:400,data:null})
    
            if(!validator.validatePassword(request.body))
                return respond.status(200).send({success:false,message:'Password mot matching security criteria',error:null,code:400,data:null})
    
            let data = {
                otpId:request.body.otpId,
                password:request.body.password,
                passwordConfirm:request.body.passwordConfirm,
            }

            let helperResult = await forget(data) 
            return respond.status(200).send(helperResult)
        }catch(e){
            let errorResponse = config.get('error.unexpected')
            errorResponse['error']=e.message
            return respond.status(errorResponse.code).send(errorResponse)
        }
    })

    return routes

})()