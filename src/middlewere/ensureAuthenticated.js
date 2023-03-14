
const AppError = require('../utils/AppError')
const authConfig = require('../config/auth')
const {verify} = require('jsonwebtoken')



function ensureAuthenticated(request, response, next){
    const authHeader = request.headers.authorization

    if(!authHeader) throw new AppError('JWT token não informado', 401)

    const [, token] = authHeader.split(' ')

    try {
        const {sub: user_id}= verify(token, authConfig.secret)

        request.user= {
            id: Number(user_id)
        }

        next()
    }
    catch{
        throw new AppError('JWT token invalido', 401)
    }
}

module.exports = ensureAuthenticated