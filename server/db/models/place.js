const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../index');

const Place = sequelize.define('Place', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    coordinates: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Place;

