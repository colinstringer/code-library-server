"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("examples", "pageId", {
      type: Sequelize.INTEGER,
      references: {
        model: "pages",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("examples", "pageId");
  }
};
