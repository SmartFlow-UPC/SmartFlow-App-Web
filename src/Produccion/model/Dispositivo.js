// model/Dispositivo.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Asegúrate de que la ruta sea correcta

class Dispositivo extends Model {}

Dispositivo.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    consumo: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    tipoDeRecurso: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Dispositivo',
});

module.exports = Dispositivo;
