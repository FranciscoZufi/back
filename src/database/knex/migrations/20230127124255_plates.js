exports.up = knex =>
  knex.schema.createTable('plates', table => {
    table.increments('id')
    table.text('name')
    table.text('description')
    table.text('ingredients')
    table.text('value')
    table.text('img')
    table.integer('user_id').references('id').inTable('users')
    table
      .integer('followUp_id')
      .references('id')
      .inTable('followUp')
      .onDelete('CASCADE')
  })

exports.down = knex => knex.schema.dropTable('plates')
