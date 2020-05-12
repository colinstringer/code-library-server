"use strict";

const Library = require("../models").library;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const libraries = await Promise.all([
      Library.upsert({
        userId: 1,
      }),
      Library.upsert({
        userId: 2,
      }),
    ]);

    console.log(`SEEDED: ${libraries.length} libraries`);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("libraries", null, {});
  },
};
