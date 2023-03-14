const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class UsersAvatarController{
    async Update(resquest, response){ 
        const diskstorage = new DiskStorage()

        const user_id = resquest.user.id
        const avatarFileName = resquest.file.filename

        const user = await knex('users').where({id : user_id}).first()
        if(!user) throw new AppError('Apenas usuarios autenticado pode mudar o Avatar', 401)

        if(user.avatar) await diskstorage.deleteFile(user.avatar)

        const filename = await diskstorage.saveFile(avatarFileName)

        user.avatar = filename
        await knex('users').update(user).where({id : user})

        return response.json(user)
    }
}

module.exports = UsersAvatarController