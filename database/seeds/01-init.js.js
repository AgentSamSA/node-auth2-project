exports.seed = function (knex) {
  const users = [
    {
      username: 'samxlee',
      password: '1234',
      department: 'sales'
    }
  ]
  return knex('users').insert(users)
    .then(() => console.log("Added seed data for users table."));
};
