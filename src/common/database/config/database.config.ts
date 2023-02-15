import { registerAs } from '@nestjs/config';
export default registerAs('database', () => ({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    entities: ['dist/**/*.entity.{ts,js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    ssl:(process.env.DATABASE_USE_SSL ==='true') ?  { 
        rejectUnauthorized: false,
    }: null,
    port: +process.env.DATABASE_PORT,
    migrationsRun: true,
    synchronize: (process.env.DATABASE_SYNCHRONIZE === 'true') ? true : false,
    logging: true,
    autoLoadEntities:true
}));
