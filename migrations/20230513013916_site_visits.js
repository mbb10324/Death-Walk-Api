/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('site_visits', table => {
        table.increments();
        table.integer('user_id');
        table.dateTime('initial_date');
        table.dateTime('last_date');
        table.integer('total');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('site_visits');
};
