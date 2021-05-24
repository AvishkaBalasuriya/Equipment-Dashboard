function getResponse(success=true,message=null,error=null,code=null,data=null){
    return {
        success:success,
        message:message,
        error:error,
        code:code,
        data:data
    }
}

exports.getResponse = getResponse