/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('medium_game').del()
  await knex('medium_game').insert([
    {id: 1, user_id: 1, games: 10, wins: 8, loses: 2},
    {id: 2, user_id: 2, games: 30, wins: 5, loses: 25},
    {id: 3, user_id: 3, games: 15, wins: 10, loses: 5},
    {id: 4, user_id: 4, games: 1, wins: 1, loses: 0},
    {id: 5, user_id: 5, games: 400, wins: 369, loses: 31},
  ]);
};
