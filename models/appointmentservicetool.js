"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AppointmentServiceTool extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AppointmentServiceTool.belongsTo(models.AppointmentService, {
        foreignKey: "appointmentServiceId",
        as: "appointmentService",
      });
      AppointmentServiceTool.belongsTo(models.Tool, {
        foreignKey: "toolId",
        as: "tool",
      });
    }
  }
  AppointmentServiceTool.init(
    {
      appointmentServiceId: {
        type: DataTypes.INTEGER,
        references: {
          model: "AppointmentServices",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      toolId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Tools",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "AppointmentServiceTool",
    }
  );
  return AppointmentServiceTool;
};
