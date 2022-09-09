import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('d7nhp04n5jvm88', 'gyiqtoylsqblqc', '5a7e393c053367539aec280fa6c82d50c1d4d2727d6e087fc7e89f19db59cbe1', {
    host: 'ec2-3-223-213-207.compute-1.amazonaws.com',
    dialect: 'postgres'
  });

function connectToDB() {
    try {
        sequelize.authenticate();
        console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
}

connectToDB()
