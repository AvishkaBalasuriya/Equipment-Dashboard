const auth = require('../auth/register')
const config = require('config')

const createDefaultUser = async(type) => {
    let userData = {
        email: type===1? config.get('default.admin.email') : config.get('default.user.email'),
        rawPassword: type===1? config.get('default.admin.rawPassword') : config.get('default.admin.rawPassword'),
        firstName: type===1? config.get('default.admin.firstName') : config.get('default.admin.firstName'),
        lastName: type===1? config.get('default.admin.lastName') : config.get('default.admin.lastName'),
        type:type,
        status:true
    }
    let result = await auth.register(userData)
    if(result.success)
        console.log("Default user created")
    else    
        console.log("Unable to create default user")
}

exports.createDefaultUser = createDefaultUser