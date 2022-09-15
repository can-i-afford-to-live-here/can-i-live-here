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

  class location_indexes extends Model {}

  location_indexes.init({
    location_indexes_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true, 
        primaryKey: true
    },
    cost_of_living_index: {
        type: DataTypes.FLOAT,
        allowNull:true
    },
    cost_of_living_plus_rent_index: {
        type: DataTypes.FLOAT,
        allowNull:true
    },
    groceries_index: {
        type: DataTypes.FLOAT,
        allowNull:true
    },
    last_updated_timestamp: {
        type: DataTypes.DATE,
        allowNull:true
    },
    local_purchasing_power_index: {
        type: DataTypes.FLOAT,
        allowNull:true
    },
    rent_index: {
        type: DataTypes.FLOAT,
        allowNull:true
    }, 
    restaurant_price_index: {
        type: DataTypes.FLOAT,
        allowNull:true
    }
},
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'location_indexes', // We need to choose the model name
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

connectToDB()

async function getLocations() {
    console.log("Entered in here")
    const locations = await location_indexes.findAll({
        attributes: ['cost_of_living_index']
    });
    console.log("locations" + JSON.stringify(locations) )
}

getLocations()
console.log(location_indexes)
console.log(sequelize.models.location_indexes)
console.log(location_indexes === sequelize.models.location); 

