"use strict";

const Category = require("../models").category;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = await Promise.all([
      Category.upsert({
        libraryId: 1,
        name: "javascript",
        sequence: 1
      }),
      Category.upsert({
        libraryId: 2,
        name: "javascript",
        sequence: 1,
      }),
    ]);

    console.log(`SEEDED: ${categories.length} categories`);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("categories", null, {});
  },
};
