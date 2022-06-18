module.exports = (sequelize, DataTypes) => {
  const Evidencias = sequelize.define("Evidencias", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    }
  });

  return Evidencias;
}