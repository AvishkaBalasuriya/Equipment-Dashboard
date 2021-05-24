import axios from 'axios'
import configData from '../config.json'

const login = async (data) => {
    var reqData = JSON.stringify({
        "email": data.email,
        "password": data.password
    });
        
    var config = {
        method: 'post',
        url: `${configData.server.host}/api/v1/auth/login`,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : reqData
    };
    
    let response = await axios(config).catch((e)=>{
        return {success:false,error:e.message,data:null}
    });
    return response.success===undefined?response.data:response
}

const sendOtpCode = async (data) => {
    var reqData = JSON.stringify({
        "contact": data.email
    });
        
    var config = {
        method: 'post',
        url: `${configData.server.host}/api/v1/otp/issue`,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : reqData
    };
    
    let response = await axios(config).catch((e)=>{
        return {success:false,error:e.message,data:null}
    });
    return response.success===undefined?response.data:response
}

const verifyOtpCode = async (data) => {
    var reqData = JSON.stringify({
        userId : data.userId,
        otpCode: data.otpCode
    });
        
    var config = {
        method: 'post',
        url: `${configData.server.host}/api/v1/otp/verify`,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : reqData
    };
    
    let response = await axios(config).catch((e)=>{
        return {success:false,error:e.message,data:null}
    });
    return response.success===undefined?response.data:response
}

const resetPassword = async (data) => {
    var reqData = JSON.stringify({
        otpId : data.otpId,
        password: data.password,
        passwordConfirm:data.passwordConfirm,
    });
        
    var config = {
        method: 'post',
        url: `${configData.server.host}/api/v1/auth/forget`,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : reqData
    };
    
    let response = await axios(config).catch((e)=>{
        return {success:false,error:e.message,data:null}
    });
    return response.success===undefined?response.data:response
}

const register = async (data) => {
    var reqData = JSON.stringify({
        email:data.email,
        password:data.password,
        passwordConfirm:data.passwordConfirm,
        firstName:data.firstName,
        lastName:data.lastName,
        type:data.type
    })
        
    var config = {
        method: 'post',
        url: `${configData.server.host}/api/v1/auth/register`,
        headers: { 
            'Authorization': `Bearer ${data.accessToken}`, 
            'Content-Type': 'application/json'
        },
        data : reqData
    };
    
    let response = await axios(config).catch((e)=>{
        return {success:false,error:e.message,data:null}
    });
    return response.success===undefined?response.data:response
}

export {
    login,
    sendOtpCode,
    verifyOtpCode,
    resetPassword,
    register,
}