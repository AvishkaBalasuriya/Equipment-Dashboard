function validatePassword(requestBody){
    let password = requestBody.password
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/gm
    return password.match(pattern)!=null
}

function validateConfirmPassword(requestBody){
    let password = requestBody.password
    let passwordConfirm = requestBody.passwordConfirm
    return password===passwordConfirm
}

function validateEmptyFields(requestBody){
    let is_valid = true
    Object.entries(requestBody).forEach((arg)=>{
        if(typeof(arg)==Array){
            if(arg.length==0)
                is_valid=false
        }
        else if(arg===undefined || arg==="")
            is_valid = false
    })
    return is_valid
}

exports.validatePassword=validatePassword
exports.validateConfirmPassword=validateConfirmPassword
exports.validateEmptyFields=validateEmptyFields