/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, email: 'timmy1@test.com', username: 'timmy1', password: 'Timmy123!'},
    {id: 2, email: 'johnny2@test.com', username: 'johnny2', password: 'Johnny123!'},
    {id: 3, email: 'harry3@test.com', username: 'harry3', password: 'Harry123!'},
    {id: 4, email: 'becky4@test.com', username: 'becky4', password: 'Becky123!'},
    {id: 5, email: 'lily5@test.com', username: 'lily5', password: 'Lily123!'},
  ]);
};
