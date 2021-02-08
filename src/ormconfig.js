module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 3100,
    username: 'postgres',
    password: 'pass123',
    database: 'postgres',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    cli: {
      migrationsDir: 'src/migrations',
    },
  };
  