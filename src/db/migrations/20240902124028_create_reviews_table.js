
const tableName = 'reviews';

exports.up = function(knex) {
  return knex.schema.createTable(tableName, function(table) {
    table.increments('review_id').primary();
    table.text('content').notNullable();
    table.integer('score').notNullable();

    table.integer('critic_id').unsigned().notNullable();
    table.foreign('critic_id').references('critic_id').inTable('critics');

    table.integer('movie_id').unsigned().notNullable();
    table.foreign('movie_id').references('movie_id').inTable('movies');

    table.timestamps(true, true); // Adds created_at and updated_at columns
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable(tableName);
};
