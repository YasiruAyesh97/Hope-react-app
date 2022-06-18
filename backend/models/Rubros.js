module.exports = (sequelize, DataTypes) => {
  const Rubros = sequelize.define("Rubros", {
    // id: {
    //   allowNull: false,
    //   primaryKey: true,
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV4
    // },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    }
  });

  // Rubros.belongsTo(Clientes, {
  //   foreignKey: 'ClienteId',
  //   targetId: 'id'
  // })

  return Rubros;
}