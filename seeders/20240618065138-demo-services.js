"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Services", [
      {
        name: "Basic Nursing Care",
        description:
          "Includes basic patient care activities like bathing, feeding, and assistance with daily activities.",
        price: 50.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Medication Administration",
        description:
          "Includes administering medications as prescribed by healthcare providers.",
        price: 30.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Wound Care",
        description:
          "Includes cleaning and dressing wounds to promote healing and prevent infection.",
        price: 40.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Physical Therapy",
        description:
          "Includes therapeutic exercises and activities to improve mobility and strength.",
        price: 60.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Occupational Therapy",
        description:
          "Includes activities to help individuals with daily living skills and tasks.",
        price: 55.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Speech Therapy",
        description:
          "Includes exercises to improve communication and swallowing abilities.",
        price: 50.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Palliative Care",
        description:
          "Includes specialized care for patients with serious illnesses to improve quality of life.",
        price: 70.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hospice Care",
        description:
          "Includes compassionate care for terminally ill patients and support for their families.",
        price: 75.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Companionship Services",
        description:
          "Includes providing companionship and emotional support to patients.",
        price: 25.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Home Health Aide Services",
        description:
          "Includes assistance with personal care and household tasks in the patient's home.",
        price: 45.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Services", null, {});
  },
};
