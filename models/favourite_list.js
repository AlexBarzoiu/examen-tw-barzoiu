const { DataTypes } = require('sequelize');
const sequelize = require("../sequelize");
const Video = require('./video')

const FavouriteList = sequelize.define(
    "FavouriteList",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.STRING,
            validate: {
                len: [3, 100]
            }
        },
        date: {
            type: DataTypes.DATE
        },
    }
)


module.exports = FavouriteList;