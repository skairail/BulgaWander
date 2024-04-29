
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../index');



const UserSavedLocation = sequelize.define('UserSavedLocation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});