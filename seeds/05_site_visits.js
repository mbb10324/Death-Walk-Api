/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const now = new Date();
const past = new Date(Date.UTC(2023, 4, 1));

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('site_visits').del()
  await knex('site_visits').insert([
    {id: 1, user_id: 1, initial_date: past, last_date: now, total: 12},
    {id: 2, user_id: 2, initial_date: past, last_date: now, total: 12},
    {id: 3, user_id: 3, initial_date: past, last_date: now, total: 12},
    {id: 4, user_id: 4, initial_date: past, last_date: now, total: 12},
    {id: 5, user_id: 5, initial_date: past, last_date: now, total: 12},
  ]);
};
