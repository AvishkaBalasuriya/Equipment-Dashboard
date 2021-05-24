const User = require('../schema/user').User

const otp = require('../helpers/otp')

const jwt = require('../utils/jwt')
const response = require('../utils/response')
const hasher = require('../utils/hasher')

async function login(data){
    try{
        let user = await User.findOne({email:data.email,password:hasher.hash(data.password)})

        if(!user)
            return response.getResponse(false,'Username or password is incorrect',null,401)
    
        if(user.status===false){
            await otp.issueAnOtp({email:data.email})
            return response.getResponse(false,'User account not activate yet. Please verify your email address. Email verification code sent to your email address.',null,503,{email:user.email,userId:user._id})
        }

        let payload = jwt.makePayloadWithUser(user)

        return response.getResponse(true,'User successfully authenticated',null,200,{'accessToken':jwt.generateJWT(payload)})
    }catch(e){
        return response.getResponse(false,"Undetected error",e.message,500)
    }
}

exports.login = login