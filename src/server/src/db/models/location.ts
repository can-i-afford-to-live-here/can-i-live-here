import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connect';

    export class location extends Model {}

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
