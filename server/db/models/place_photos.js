
const { Sequelize, DataTypes } = require('sequelize');;

const sequelize = require('../index');



const PlacePhoto = sequelize.define('PlacePhoto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    photo: {
        type: DataTypes.BLOB,
        allowNull: false
    },

});

module.exports = PlacePhoto