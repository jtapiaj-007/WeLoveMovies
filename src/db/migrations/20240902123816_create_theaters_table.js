
const tableName = 'theaters';

exports.up = function(knex) {
  return knex.schema.createTable(tableName, function(table) {
    table.increments('theater_id').primary();
    table.string('name').notNullable();
    table.string('address_line_1').notNullable();
    table.string('address_line_2').nullable();
    table.string('city').notNullable();
    table.string('state').notNullable();
    table.string('zip').notNullable();
    table.timestamps(true, true); // Adds created_at and updated_at columns
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable(tableName);
};
