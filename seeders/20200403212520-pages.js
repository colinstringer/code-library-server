"use strict";

const Page = require("../models").page;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const pages = await Promise.all([
      Page.upsert({
        categoryId: 1,
        name: "booleans",
        sequence: 1
      }),
      Page.upsert({
        categoryId: 1,
        name: "arrays",
        sequence: 2,
      }),
      Page.upsert({
        categoryId: 2,
        name: "express",
        sequence: 1
      }),
      Page.upsert({
        categoryId: 2,
        name: "axios",
        sequence: 2,
      }),
    ]);

    console.log(`SEEDED: ${pages.length} pages`);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("pages", null, {});
  },
};
