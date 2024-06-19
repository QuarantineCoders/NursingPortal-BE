"use strict";

const { User, Address } = require("../models"); // Import your Sequelize models

module.exports = {
  async up(queryInterface, Sequelize) {
    // Fetch user IDs from Users table
    const users = await User.findAll({ attributes: ["id"] });

    const userIds = users.map((user) => user.id);

    await queryInterface.bulkInsert("Addresses", [
      {
        street: "123 Main St",
        city: "New York",
        province: "New York",
        district: "Manhattan",
        latitude: "40.7128",
        longitude: "-74.0060",
        label: "Home Address for User 1",
        userId: userIds[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        street: "456 Elm St",
        city: "Los Angeles",
        province: "California",
        district: "Downtown",
        latitude: "34.0522",
        longitude: "-118.2437",
        label: "Home Address for User 2",
        userId: userIds[1],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        street: "789 Pine St",
        city: "Chicago",
        province: "Illinois",
        district: "Loop",
        latitude: "41.8781",
        longitude: "-87.6298",
        label: "Home Address for User 3",
        userId: userIds[2],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        street: "1011 Oak St",
        city: "Houston",
        province: "Texas",
        district: "Downtown",
        latitude: "29.7604",
        longitude: "-95.3698",
        label: "Home Address for User 4",
        userId: userIds[3],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        street: "1213 Maple St",
        city: "San Francisco",
        province: "California",
        district: "Financial District",
        latitude: "37.7749",
        longitude: "-122.4194",
        label: "Home Address for User 5",
        userId: userIds[4],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        street: "1415 Cedar St",
        city: "Seattle",
        province: "Washington",
        district: "Downtown",
        latitude: "47.6062",
        longitude: "-122.3321",
        label: "Home Address for User 6",
        userId: userIds[5],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        street: "1617 Birch St",
        city: "Miami",
        province: "Florida",
        district: "South Beach",
        latitude: "25.7617",
        longitude: "-80.1918",
        label: "Home Address for User 7",
        userId: userIds[6],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        street: "1819 Pine St",
        city: "Boston",
        province: "Massachusetts",
        district: "Back Bay",
        latitude: "42.3601",
        longitude: "-71.0589",
        label: "Home Address for User 8",
        userId: userIds[7],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        street: "2021 Elm St",
        city: "Denver",
        province: "Colorado",
        district: "Downtown",
        latitude: "39.7392",
        longitude: "-104.9903",
        label: "Home Address for User 9",
        userId: userIds[8],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        street: "2223 Oak St",
        city: "Portland",
        province: "Oregon",
        district: "Pearl District",
        latitude: "45.5051",
        longitude: "-122.6750",
        label: "Home Address for User 10",
        userId: userIds[9],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Addresses", null, {});
  },
};
