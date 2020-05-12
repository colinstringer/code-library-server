"use strict";
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");

const User = require("../models").user;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await Promise.all([
      User.upsert({
        username: "admin",
        password: bcrypt.hashSync("356de4", SALT_ROUNDS),
      }),
      User.upsert({
        username: "colin",
        password: bcrypt.hashSync("356de4", SALT_ROUNDS),
      }),
    ]);

    console.log(`SEEDED: ${users.length} users`);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
