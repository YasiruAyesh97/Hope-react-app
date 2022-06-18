module.exports = (sequelize, DataTypes) => {
  const Competencia = sequelize.define("Competencia", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    }
  });

  return Competencia;
}