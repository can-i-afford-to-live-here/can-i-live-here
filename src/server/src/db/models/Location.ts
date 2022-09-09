import { Sequelize, DataTypes, Model } from 'sequelize';
import { credentials } from '../../../../../dbCredentials.js';

const sequelize = new Sequelize(credentials.database, credentials.user, credentials.password, {
    host: credentials.host,
    dialect: 'postgres',
    define: {
        freezeTableName: true
      },
    dialectOptions: {
        ssl: {
            require: true
        }
    }
  });

    class location extends Model {}

    location.init({
        location_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true, 
            primaryKey: true
        },
        country: {
            type: DataTypes.STRING,
            allowNull:true
        },
        city: {
            type: DataTypes.STRING,
            allowNull:true
        },
        region: {
            type: DataTypes.STRING,
            allowNull:true
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull:true
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull:true
        },
        location_index_key: {
            type: DataTypes.INTEGER,
            allowNull:true
        }
    },
      {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'location', // We need to choose the model name
        timestamps: false
      });

function connectToDB() {
    try {
        sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

   
}

// Keep around for a bit - we might need it
// (async () => {
//     await sequelize.sync({ force: true });
//     // Code here
//   })();

connectToDB()


async function getLocations() {
    console.log("Entered in here")
    const locations = await location.findAll({
        attributes: ['country']
    });
    console.log("locations" + JSON.stringify(locations) )
}

getLocations()
console.log(location)
console.log(sequelize.models.location)
console.log(location === sequelize.models.location); 
