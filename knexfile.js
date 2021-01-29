module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    migrations: { directory: './data/migrations' },
    connection: {
      filename: './data/users.db3',
    },
  },
  testing: {
    client: 'sqlite3',
    useNullAsDefault: true,
    migrations: { directory: './data/migrations' },
    connection: {
      filename: './data/users.db3',
    },
  },
  production: {

  },
};
