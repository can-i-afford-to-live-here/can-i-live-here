import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connect';

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
