const Rubros = require("./Rubros");
// import { Rubros } from "./Rubros.js";

module.exports = (sequelize, DataTypes) => {
  const Clientes = sequelize.define("Clientes", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rfc: {
      type: DataTypes.STRING,
    },
    razon_social: {
      type: DataTypes.STRING,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    }
  });

  // Clientes.associate = (models) => {
  //   Clientes.hasMany(models.Rubros, {
  //     onDelete: "cascade",
  //   })
  // }

  //TODO Arreglar el JOIN de sequelize

  // Clientes.hasMany(Rubros, {
  //   foreignKey: 'ClienteId',
  //   sourceKey: 'id'
  // })

  return Clientes;
}