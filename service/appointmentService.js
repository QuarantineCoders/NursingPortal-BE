const e = require("express");
const {
  Appointment,
  Service,
  AppointmentServiceTool,
  AppointmentService,
  Tool,
  User,
  Address,
  sequelize,
} = require("../models");
const { getAppointments } = require("../utils/appointmentHelper");
const CustomError = require("../utils/customError");

const createAppointmentService = async (userId, appointmentData) => {
  const {
    appointmentTime,
    appointmentDate,
    patientName,
    patientAge,
    patientGender,
    patientPhoneNumber,
    status,
    description,
    addressId,
    services,
  } = appointmentData;

  if (userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
  }

  if (addressId) {
    const address = await Address.findByPk(addressId);
    if (!address) {
      throw new CustomError("Address not found", 404);
    }

    if (address.userId !== userId) {
      throw new CustomError("Address does not belong to user", 400);
    }
  }

  const transaction = await sequelize.transaction();

  try {
    const newAppointment = await Appointment.create(
      {
        appointmentTime,
        appointmentDate,
        patientName,
        patientAge,
        patientGender,
        patientPhoneNumber,
        status,
        description,
        addressId,
        userId,
      },
      { transaction }
    );

    if (!newAppointment) {
      await transaction.rollback();
      throw new CustomError("Failed to create appointment", 500);
    }

    for (const service of services) {
      const { serviceId, tools } = service;

      const foundService = await Service.findByPk(serviceId, { transaction });
      if (!foundService) {
        await transaction.rollback();
        throw new CustomError("Invalid service ID", 400);
      }

      const newAppointmentService = await AppointmentService.create(
        {
          appointmentId: newAppointment.id,
          serviceId: foundService.id,
        },
        { transaction }
      );

      if (!newAppointmentService) {
        await transaction.rollback();
        throw new CustomError("Failed to create appointment service", 500);
      }

      for (const tool of tools) {
        const { toolId, quantity } = tool;

        const foundTool = await Tool.findByPk(toolId, { transaction });
        if (!foundTool) {
          await transaction.rollback();
          throw new CustomError("Invalid tool ID", 400);
        }
        // check if the tool belongs to the service
        const toolService = await foundTool.getServices({ transaction });
        if (!toolService.find((service) => service.id === foundService.id)) {
          await transaction.rollback();
          throw new CustomError(
            `Tool ID: ${toolId} does not belong to service ID: ${serviceId}`,
            400
          );
        }

        await AppointmentServiceTool.create(
          {
            appointmentServiceId: newAppointmentService.id,
            toolId: foundTool.id,
            quantity: quantity,
          },
          { transaction }
        );
      }
    }

    await transaction.commit();
    return newAppointment;
  } catch (error) {
    if (transaction.finished) {
      throw error;
    } else {
      await transaction.rollback();
      throw error;
    }
  }
};

const getAllAppointmentService = async () => {
  return await getAppointments();
};

const getUserAppointmentsService = async (userId) => {
  return await getAppointments({ userId });
};

const getAppointmentByIdService = async (appointmentId) => {
  const appointments = await getAppointments({ id: appointmentId });

  if (appointments.length === 0) {
    throw new CustomError("No appointments found", 404);
  }

  return appointments[0];
};

const updateAppointmentService = async (appointmentId, appointmentData) => {
  const {
    appointmentTime,
    appointmentDate,
    patientName,
    patientAge,
    patientGender,
    patientPhoneNumber,
    status,
    description,
    services,
  } = appointmentData;

  const appointment = await Appointment.findByPk(appointmentId);

  if (!appointment) {
    throw new CustomError("Appointment not found", 404);
  }

  const transaction = await sequelize.transaction();

  try {
    await appointment.update(
      {
        appointmentTime,
        appointmentDate,
        patientName,
        patientAge,
        patientGender,
        patientPhoneNumber,
        status,
        description,
      },
      { transaction }
    );

    if (services && services.length > 0) {
      for (const service of services) {
        const { serviceId, tools } = service;

        // Validate service ID
        const foundService = await Service.findByPk(serviceId, { transaction });
        if (!foundService) {
          await transaction.rollback();
          throw new CustomError(`Invalid service ID: ${serviceId}`, 400);
        }

        let appointmentService = await AppointmentService.findOne({
          where: {
            appointmentId: appointment.id,
            serviceId: serviceId,
          },
          transaction,
        });

        if (!appointmentService) {
          appointmentService = await AppointmentService.create(
            {
              appointmentId: appointment.id,
              serviceId: serviceId,
            },
            { transaction }
          );
        }

        if (tools && tools.length > 0) {
          for (const tool of tools) {
            const { toolId, quantity } = tool;

            // Validate tool ID
            const foundTool = await Tool.findByPk(toolId, { transaction });
            if (!foundTool) {
              await transaction.rollback();
              throw new CustomError(`Invalid tool ID: ${toolId}`, 400);
            }

            // check if the tool belongs to the service
            const toolService = await foundTool.getServices({ transaction });
            if (
              !toolService.find((service) => service.id === foundService.id)
            ) {
              await transaction.rollback();
              throw new CustomError(
                `Tool ID: ${toolId} does not belong to service ID: ${serviceId}`,
                400
              );
            }

            let appointmentServiceTool = await AppointmentServiceTool.findOne({
              where: {
                appointmentServiceId: appointmentService.id,
                toolId: toolId,
              },
              transaction,
            });

            if (appointmentServiceTool) {
              await appointmentServiceTool.update(
                { quantity: quantity },
                { transaction }
              );
            } else {
              await AppointmentServiceTool.create(
                {
                  appointmentServiceId: appointmentService.id,
                  toolId: toolId,
                  quantity: quantity,
                },
                { transaction }
              );
            }
          }
        }
      }
    }

    await transaction.commit();
    return appointment;
  } catch (error) {
    if (transaction.finished) {
      throw error;
    } else {
      await transaction.rollback();
      throw error;
    }
  }
};

const deleteAppointmentService = async (appointmentId) => {
  const transaction = await sequelize.transaction();
  try {
    const appointment = await Appointment.findByPk(appointmentId, {
      include: [{ association: "appointmentServices" }],
      transaction,
    });

    if (!appointment) {
      await transaction.rollback();
      throw new CustomError("Appointment not found", 404);
    }

    for (const appointmentService of appointment.appointmentServices) {
      await AppointmentServiceTool.destroy({
        where: { appointmentServiceId: appointmentService.id },
        transaction,
      });
      await appointmentService.destroy({ transaction });
    }

    await appointment.destroy({ transaction });

    await transaction.commit();
    return appointment;
  } catch (error) {
    if (transaction.finished) {
      throw error;
    } else {
      await transaction.rollback();
      throw error;
    }
  }
};

module.exports = {
  createAppointmentService,
  getAllAppointmentService,
  getUserAppointmentsService,
  getAppointmentByIdService,
  updateAppointmentService,
  deleteAppointmentService,
};
