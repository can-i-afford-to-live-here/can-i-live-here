import { Sequelize } from 'sequelize';
import { credentials } from '../../../../dbCredentials.js';

export const sequelize = new Sequelize(credentials.database, credentials.user, credentials.password, {
    host: credentials.host,
    dialect: 'postgres',
    define: {
        freezeTableName: true
      },
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false 
        }
    }
  });

export function connectToDB(sequelize: Sequelize) {
    try {
        sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        sequelize.close();
    }
}

