const knex = require('../database/knex')

const {compare} = require('bcryptjs')
const AppError = require('../utils/AppError')
const authConfig = require('../config/auth')
const {sign} =require('jsonwebtoken')


class SessionsController{
    async Create(request, response){
        const {email , password}= request.body

        const user = await knex('users').where({email}).first()

        if(!user) throw new AppError('Email e/ou senha incorreta')
        
        const passwordRight = await compare(password, user.password)
        if(!passwordRight) throw new AppError('Email e/ou senha incorreta', 401)

        const {secret, expiresIn} = authConfig
        const token =  sign({},secret,{
            subject: String(user.id),
            expiresIn
        })        
        return response.json({user, token})
    }
}


module.exports =SessionsController