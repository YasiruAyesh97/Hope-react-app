module.exports = (sequelize, DataTypes) => {
  const Dependencia = sequelize.define("Dependencia", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    }
  });

  return Dependencia;
}