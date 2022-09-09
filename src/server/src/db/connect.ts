import { Sequelize } from 'sequelize';
import { credentials } from '../../../../dbCredentials.js';

const sequelize = new Sequelize(credentials.database, credentials.user, credentials.password, {
    host: credentials.host,
    dialect: 'postgres'
});

function connectToDB() {
    try {
        sequelize.authenticate();
        console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }

        sequelize.close();
}

connectToDB()
