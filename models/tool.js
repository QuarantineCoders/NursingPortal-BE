"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tool extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tool.belongsToMany(models.Service, {
        through: "ServiceTool",
        foreignKey: "toolId",
        as: "services",
      });
      Tool.belongsToMany(models.AppointmentService, {
        through: "AppointmentServiceTool",
        foreignKey: "toolId",
        as: "appointmentServices",
      });
    }
  }
  Tool.init(
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
      },
    },
    {
      sequelize,
      modelName: "Tool",
    }
  );
  return Tool;
};
