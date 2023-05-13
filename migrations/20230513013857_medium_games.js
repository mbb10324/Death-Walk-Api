/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('medium_game', table => {
        table.increments();
        table.integer('user_id');
        table.integer('games');
        table.integer('wins');
        table.integer('loses');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('medium_game');
};
