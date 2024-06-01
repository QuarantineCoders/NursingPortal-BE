"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AppointmentService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AppointmentService.belongsTo(models.Appointment, {
        foreignKey: "appointmentId",
        as: "appointment",
      });
      AppointmentService.belongsTo(models.Subservice, {
        foreignKey: "subserviceId",
        as: "subservice",
      });
      AppointmentService.belongsTo(models.Service, {
        foreignKey: "serviceId",
        as: "service",
      });
    }
  }
  AppointmentService.init(
    {
      appointmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subserviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subserviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "AppointmentService",
    }
  );
  return AppointmentService;
};
