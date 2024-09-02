
const tableName = 'critics';

exports.up = function(knex) {
  return knex.schema.createTable(tableName, function(table) {
    table.increments('critic_id').primary();
    table.string('preferred_name').notNullable();
    table.string('surname').notNullable();
    table.string('organization_name').notNullable();
    table.timestamps(true, true); // Adds created_at and updated_at columns
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable(tableName);
};
