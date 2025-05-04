// config/config.js
require('dotenv').config()

module.exports = {
  development: {
    username: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || null,
    database: process.env.PGDATABASE || 'postgres',
    host: process.env.PGHOST || '127.0.0.1',
    port: process.env.PGPORT || 5432,
    dialect: 'postgres',
    // dialectOptions: {
    //   ssl: process.env.PGSSLMODE === 'require'
    //     ? { require: true, rejectUnauthorized: false }
    //     : false
    // }
  },
  test: {
    username: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || null,
    database: process.env.PGDATABASE || 'postgres_test',
    host: process.env.PGHOST || '127.0.0.1',
    port: process.env.PGPORT || 5432,
    dialect: 'postgres',
    // dialectOptions: {
    //   ssl: process.env.PGSSLMODE === 'require'
    //     ? { require: true, rejectUnauthorized: false }
    //     : false
    // }
  },
  production: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: 'postgres',
    // dialectOptions: {
    //   ssl: { require: true, rejectUnauthorized: false }
    // }
  }
}
