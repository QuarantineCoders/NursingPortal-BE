"use strict";

const { User, Address } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Fetch users and their addresses
      const users = await User.findAll({ attributes: ["id"] });
      const addresses = await Address.findAll({ attributes: ["id", "userId"] });

      // Define appointments data
      const appointments = [
        {
          appointmentDate: new Date("2024-06-19"),
          appointmentTime: "10:00:00",
          patientName: "John Doe",
          patientAge: 30,
          patientGender: "male",
          patientPhoneNumber: "1234567890",
          status: "upcoming",
          description: "Regular check-up",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          appointmentDate: new Date("2024-06-20"),
          appointmentTime: "14:00:00",
          patientName: "Jane Doe",
          patientAge: 25,
          patientGender: "female",
          patientPhoneNumber: "9876543210",
          status: "upcoming",
          description: "Dental cleaning",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          appointmentDate: new Date("2024-06-21"),
          appointmentTime: "11:30:00",
          patientName: "Alice Smith",
          patientAge: 45,
          patientGender: "female",
          patientPhoneNumber: "5556667777",
          status: "upcoming",
          description: "Physical examination",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          appointmentDate: new Date("2024-06-22"),
          appointmentTime: "09:00:00",
          patientName: "Bob Johnson",
          patientAge: 50,
          patientGender: "male",
          patientPhoneNumber: "4445556666",
          status: "upcoming",
          description: "Blood test",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          appointmentDate: new Date("2024-06-23"),
          appointmentTime: "15:30:00",
          patientName: "Eve Brown",
          patientAge: 35,
          patientGender: "female",
          patientPhoneNumber: "2223334444",
          status: "upcoming",
          description: "Dermatology consultation",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          appointmentDate: new Date("2024-06-24"),
          appointmentTime: "12:00:00",
          patientName: "Charlie Wilson",
          patientAge: 40,
          patientGender: "male",
          patientPhoneNumber: "7778889999",
          status: "upcoming",
          description: "MRI scan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          appointmentDate: new Date("2024-06-25"),
          appointmentTime: "16:00:00",
          patientName: "Grace Lee",
          patientAge: 28,
          patientGender: "female",
          patientPhoneNumber: "0001112222",
          status: "upcoming",
          description: "Eye check-up",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          appointmentDate: new Date("2024-06-26"),
          appointmentTime: "13:45:00",
          patientName: "Frank Harris",
          patientAge: 55,
          patientGender: "male",
          patientPhoneNumber: "8889990000",
          status: "upcoming",
          description: "Cardiology consultation",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          appointmentDate: new Date("2024-06-27"),
          appointmentTime: "17:30:00",
          patientName: "Hank Green",
          patientAge: 33,
          patientGender: "male",
          patientPhoneNumber: "3334445555",
          status: "upcoming",
          description: "Physical therapy session",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          appointmentDate: new Date("2024-06-28"),
          appointmentTime: "08:30:00",
          patientName: "Sarah Miller",
          patientAge: 42,
          patientGender: "female",
          patientPhoneNumber: "6667778888",
          status: "upcoming",
          description: "Nutrition counseling",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      // Bulk insert appointments
      await queryInterface.bulkInsert(
        "Appointments",
        appointments.map((appointment, index) => ({
          ...appointment,
          userId: addresses.find(
            (address) => address.userId === users[index].id
          ).userId,
          addressId: addresses.find(
            (address) => address.userId === users[index].id
          ).id,
        }))
      );
    } catch (error) {
      console.error("Error seeding appointments:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    // Delete all appointments
    await queryInterface.bulkDelete("Appointments", null, {});
  },
};
