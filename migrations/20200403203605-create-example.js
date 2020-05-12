"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("examples", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sequence: {
        type: Sequelize.INTEGER,
      },
      codeblock: {
        allowNull: false,
        type: Sequelize.STRING(2000),
      },
      output: {
        allowNull: false,
        type: Sequelize.STRING(2000),
      },
      codeWidth: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("examples");
  },
};
