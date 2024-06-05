"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Appointment.belongsTo(models.Address, {
        foreignKey: "addressId",
        as: "address",
      });
      Appointment.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      Appointment.hasOne(models.Payment, {
        foreignKey: "appointmentId",
        as: "payment",
      });
      Appointment.hasMany(models.AppointmentService, {
        foreignKey: "appointmentId",
        as: "appointmentServices",
      });
    }
  }
  Appointment.init(
    {
      appointmentDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      patientName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      patientAge: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      patientGender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      patientPhoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "upcoming",
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Appointment",
    }
  );
  return Appointment;
};
