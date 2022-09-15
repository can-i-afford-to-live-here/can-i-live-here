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
            require: true,
            rejectUnauthorized: false 
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
        lat: {
            type: DataTypes.FLOAT,
            allowNull:true
        },
        lng: {
            type: DataTypes.FLOAT,
            allowNull:true
        },
        north_vp: {
            type: DataTypes.FLOAT,
            allowNull:true
        },
        south_vp: {
            type: DataTypes.FLOAT,
            allowNull:true
        },
        east_vp: {
            type: DataTypes.FLOAT,
            allowNull:true
        },
        west_vp: {
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
(async () => {
    await sequelize.sync({ force: false });
    // Code here
  })();

connectToDB()


async function getLocations() {
    console.log("Getting locations")
    const locations = await location.findAll();
    console.log("locations" + JSON.stringify(locations) )
}

getLocations()
console.log(location === sequelize.models.location); 
