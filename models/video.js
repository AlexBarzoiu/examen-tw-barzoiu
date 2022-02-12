const { DataTypes } = require('sequelize');
const sequelize = require("../sequelize");
const FavouriteList = require('./favourite_list')

const Video = sequelize.define(
    "Video",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.STRING,
            validate: {
                len: [5, 100]
            }
        },
        title: {
            type: DataTypes.STRING,
            validate: {
                len: [5, 100]
            }
        },
        url: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true
            }
        }
    }
)

FavouriteList.hasMany(Video, {foreignKey:'favListId', onDelete: 'CASCADE'} );
Video.belongsTo(FavouriteList,  {foreignKey:'favListId'} );

module.exports = Video;