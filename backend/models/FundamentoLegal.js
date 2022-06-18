module.exports = (sequelize, DataTypes) => {
  const FundamentoLegal = sequelize.define("FundamentoLegal", {
    articulo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    }
  });

  return FundamentoLegal;
}