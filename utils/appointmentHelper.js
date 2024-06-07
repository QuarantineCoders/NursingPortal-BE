const {
  Appointment,
  Service,
  AppointmentServiceTool,
  AppointmentService,
  Tool,
  sequelize,
} = require("../models");
const CustomError = require("../utils/customError");

const getAppointments = async (conditions = {}) => {
  const whereClause = Object.keys(conditions).length
    ? { where: conditions }
    : {};
  const appointments = await Appointment.findAll({
    ...whereClause,
    include: [
      {
        association: "user",
        attributes: [
          "id",
          "username",
          "email",
          "phone",
          "profileImage",
          "gender",
        ],
      },
      { association: "address" },
      {
        association: "appointmentServices", // Assuming 'appointmentServices' is the alias
        include: [
          {
            association: "service",
            attributes: ["id", "name", "description", "price"],
          },
          {
            association: "tools",
            attributes: ["id", "name", "price"],
            through: { attributes: ["quantity"] },
          },
        ],
      },
    ],
  });
  if (!appointments) {
    throw new CustomError("No appointments found", 404);
  }

  return appointments.map((appointment) => ({
    appointmentId: appointment.id,
    appointmentDate: appointment.appointmentDate,
    patientName: appointment.patientName,
    patientAge: appointment.patientAge,
    patientGender: appointment.patientGender,
    patientPhone: appointment.patientPhoneNumber,
    status: appointment.status,
    description: appointment.description,
    user: appointment.user,
    address: appointment.address,
    payment: appointment.payment,
    services: appointment.appointmentServices.map((appointmentService) => ({
      id: appointmentService.service.id,
      name: appointmentService.service.name,
      description: appointmentService.service.description,
      price: appointmentService.service.price,
      tools: appointmentService.tools.map((tool) => ({
        id: tool.id,
        name: tool.name,
        price: tool.price,
        quantity: tool.AppointmentServiceTool.quantity,
      })),
    })),
  }));
};

module.exports = {
  getAppointments,
};
