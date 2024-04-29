
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../index')

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Category;