"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subservice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subservice.belongsTo(models.Service, {
        foreignKey: "serviceId",
        as: "service",
      });
      Subservice.belongsToMany(models.Appointment, {
        through: "AppointmentService",
        foreignKey: "subserviceId",
        as: "appointments",
      });
    }
  }
  Subservice.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Subservice",
    }
  );
  return Subservice;
};
