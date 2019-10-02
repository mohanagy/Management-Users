exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments("id").primary();
    table.string("email").unique();
    table.string("password");
    table.string("age");
    table.boolean("isAdmin").defaultTo(false);
    table.boolean("isRegester").defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("uesers");
};
