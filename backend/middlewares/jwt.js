const configs = require('config')
const jwtrsa = configs.get('accessTokens.jwtRsa')
const jwt = require('jsonwebtoken')

function HttpJWT(req, res, next) {
    try{
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        const result = checkJWT(token)

        if(result==0)
            return res.status(403).send({
                "success": false,
                "message": "Missing JWT header in the request.",
                "data": null
            })
        
        if(result==1)
            return res.status(403).send({
                "success": false,
                "message": "JWT authentication failed.", 
                "data": null
            })
        
        req.user = result
        next()

    }catch(e){
        return res.status(500).send({
            "success": false,
            "message": e.message, 
            "data": null
        })
    }  
}

function SocketJWT(socket, next) {
    try{
        const token = socket.handshake.query.token

        const result = checkJWT(token)

        if(result==0)
            return res.status(403).send({
                "success": false,
                "message": "Missing JWT header in the request.",
                "data": null
            })
        
        if(result==1)
            return res.status(403).send({
                "success": false,
                "message": "JWT authentication failed.", 
                "data": null
            })

        next()
        
    }catch(e){
        return res.status(500).send({
            "success": false,
            "message": e.message, 
            "data": null
        })
    }  
}

function checkJWT(token){
    if (!token)
        return 0
    jwt.verify(token, jwtrsa, (err, data) => {
        if (err)
            return 1
        return data
    })
}

exports.SocketJWT=SocketJWT
exports.HttpJWT=HttpJWT
