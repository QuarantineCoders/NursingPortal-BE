"use strict";

const bcrypt = require("bcrypt");
const saltRounds = 10;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Hash passwords before bulk inserting
    const hashedPassword = await bcrypt.hash("12345678", saltRounds);

    await queryInterface.bulkInsert("Users", [
      {
        username: "johndoe",
        email: "johndoe@example.com",
        phone: "1234567890",
        password: hashedPassword,
        profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
        gender: "male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "janedoe",
        email: "janedoe@example.com",
        phone: "9876543210",
        password: hashedPassword,
        profileImage: "https://randomuser.me/api/portraits/women/1.jpg",
        gender: "female",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "alice",
        email: "alice@example.com",
        phone: "1112223333",
        password: hashedPassword,
        profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
        gender: "female",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "bob",
        email: "bob@example.com",
        phone: "4445556666",
        password: hashedPassword,
        profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
        gender: "male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "charlie",
        email: "charlie@example.com",
        phone: "7778889999",
        password: hashedPassword,
        profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
        gender: "male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "dave",
        email: "dave@example.com",
        phone: "2223334444",
        password: hashedPassword,
        profileImage: "https://randomuser.me/api/portraits/men/4.jpg",
        gender: "male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "eve",
        email: "eve@example.com",
        phone: "5556667777",
        password: hashedPassword,
        profileImage: "https://randomuser.me/api/portraits/women/3.jpg",
        gender: "female",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "frank",
        email: "frank@example.com",
        phone: "8889990000",
        password: hashedPassword,
        profileImage: "https://randomuser.me/api/portraits/men/5.jpg",
        gender: "male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "grace",
        email: "grace@example.com",
        phone: "0001112222",
        password: hashedPassword,
        profileImage: "https://randomuser.me/api/portraits/women/4.jpg",
        gender: "female",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "hank",
        email: "hank@example.com",
        phone: "3334445555",
        password: hashedPassword,
        profileImage: "https://randomuser.me/api/portraits/men/6.jpg",
        gender: "male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
