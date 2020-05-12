"use strict";
module.exports = (sequelize, DataTypes) => {
  const page = sequelize.define(
    "page",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      sequence: {
        type: DataTypes.INTEGER,
      },
    },
    {}
  );
  page.associate = function (models) {
    page.belongsTo(models.category);
    page.hasMany(models.example);
  };
  return page;
};
