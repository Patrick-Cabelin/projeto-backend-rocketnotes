exports.up = knex => knex.schema.createTable('tags', table => {
    table.increments('id')
    table.text('name').notNullable()
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE')
    table.integer('notes_id').references('id').inTable('notes')
    
})

exports.down = knex => knex.schema.dropTable('tags')