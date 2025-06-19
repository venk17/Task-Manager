const { DataSource } = require('typeorm');
const { Task } = require('../entities/Task');

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_PATH || './database.sqlite',
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: [Task],
  migrations: [],
  subscribers: []
});

module.exports = { AppDataSource };