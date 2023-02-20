const { hash, compare } = require('bcryptjs')
const AppError = require('../utils/AppError')
const sqliteConnection = require('../database/sqlite')


class UsersController{
    async Create(request, response){
        const {name , email, password} = request.body
        
        const database = await sqliteConnection()
        const checkUserExists = await database.get('SELECT * FROM users WHERE email = (?)', [email])
        
        if(checkUserExists){
            throw new AppError('Email já em uso')
        }

        const hashedPassword = await hash(password, 8)

        await database.run('INSERT INTO users (name , email, password) VALUES (?,?,?)', [name , email, hashedPassword])
        return response.status(201).json()
    }

    async Update(request, response){
        const {name , email, password,old_password} = request.body
        const { id } = request.params

        const database = await sqliteConnection()
        const user = await database.get('SELECT * FROM users WHERE id = (?)', [id])

        if(!user){
            throw new AppError('Usuário não existe')
        }

        const userWithUpdatedEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email])

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError('Email está em uso')
        }

        user.name = name ?? user.name
        user.email = email ?? user.email
        
        if(password && !old_password){
            throw new AppError('Necessario informar a senha antiga')
        }

        if(password && old_password){
            const checkPassword = await compare(old_password, user.password)
            if(!checkPassword){
                throw new AppError('Senha antiga incorreta')
            }
        
            user.password= await hash(password, 8)
        }


        await database.run(`
            UPDATE users SET 
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('NOW')
            WHERE id  = ?
        `, [user.name, user.email, user.password, id]);
        return response.json()

    }
}

module.exports = UsersController