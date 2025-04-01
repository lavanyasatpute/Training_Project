// import { DataSource } from "typeorm";
// import * as dotenv from 'dotenv';
// import 'reflect-metadata'

// dotenv.config()

// export const AppDataSource = new DataSource({
//     type: "mssql",
//     port: Number(process.env.DB_PORT),
//     host: process.env.DB_HOST,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     entities: ['./src/entities/*.ts'],
//     synchronize: true,
//     logging: false,
//     options: {
//         trustServerCertificate: true
//     }
// })


//------------------------------------------------------------------------------------


// This is my mariaDB congfiguration....

import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
import 'reflect-metadata';

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mariadb",  // Change from "mssql" to "mariadb"
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['./src/entities/*.ts'], // Ensure your entities are correctly specified
    synchronize: true,
    logging: false
});
