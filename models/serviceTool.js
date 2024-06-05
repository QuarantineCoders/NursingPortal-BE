"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ServiceTool extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ServiceTool.belongsTo(models.Service, {
        foreignKey: "serviceId",
        as: "service",
      });
      ServiceTool.belongsTo(models.Tool, {
        foreignKey: "toolId",
        as: "tool",
      });
    }
  }
  ServiceTool.init(
    {
      serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      toolId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ServiceTool",
    }
  );
  return ServiceTool;
};
