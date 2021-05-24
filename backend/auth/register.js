const User = require('../schema/user').User

const otp = require('../helpers/otp')

const response = require('../utils/response')

async function register(userData){
    try{
        let isUserAlreadyRegistered = await User.findOne({email:userData.email})

        if(isUserAlreadyRegistered)
            return response.getResponse(false,'User with provided email is already registered to our system',null,409)

        let user = new User(userData)

        let result = await user.save()

        if(!result)
            return response.getResponse(false,'Unable to save user',null,502)
        
        let data = {
            userId:user._id,
        }

        return response.getResponse(true,'User successfuly registered to the system',null,200,data)
    }catch(e){
        return response.getResponse(false,"Undetected error",e.message,500)
    }
}

exports.register=register