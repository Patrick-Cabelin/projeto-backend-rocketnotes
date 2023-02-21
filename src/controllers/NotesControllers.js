const knex = require('../database/knex')

class NotesController{
    async Create(request , reponse){
        const { title, description, tags, links } = request.body
        const { user_id }= request.params

        const notes_id = await knex('notes').insert({
            title,
            description,
            user_id
        })

        const linksInsert = links.map(link => {
            return {
                notes_id,
                url: link
            }
        })

        await knex('links').insert(linksInsert)

        
        const tagsInsert = tags.map(name => {
            return {
                notes_id,
                name,
                user_id
            }
        })
        
        await knex('tags').insert(tagsInsert)



        reponse.status(201).json()
    }
    
    async Show(request, response){
        const { id } = request.params
        
        const note = await knex('notes').where({id}).first()
        const tags = await knex('tags').where({notes_id:id}).orderBy('name') 
        const links = await knex('links').where({notes_id:id}).orderBy('created_at')
        
        response.json({
            ...note,
            tags,
            links
        })
    }

    async Delete(request, response){
        const { id } = request.params
        console.log(id)
        await knex('notes').where({id}).delete()

        response.json()
    }
}

module.exports = NotesController