import dotenv from 'dotenv';
dotenv.config(); 
import { Sequelize } from "sequelize-typescript";
import path from 'path';


const parentDir = path.dirname(__dirname);

export const sqlServerDb = new Sequelize({
    dialect: 'mssql',
    host: 'localhost',
    port: parseInt(process.env.DB_PORT!),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    models: [parentDir + '/models'],
    logging: false,
    dialectOptions: {
        options: {
            encrypt: false,
            trustServerCertificate: true,
        },
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

export const connect_db = async () => {
    try {
        await sqlServerDb.authenticate();
        console.log('✅ Database connection established successfully.');
        // await sqlServerDb.sync({ alter: true });
        await sqlServerDb.sync();
        console.log("🔄 Database sync complete.");
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
};

export default sqlServerDb;
