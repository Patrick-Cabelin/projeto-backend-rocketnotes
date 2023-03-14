const knex = require('../database/knex')

class TagsControllers{
    async Index(request , reponse){
        const  user_id  = request.user.id

        const tags = await knex('tags').where({user_id})

        return reponse.json(tags)
    }
}

module.exports= TagsControllers