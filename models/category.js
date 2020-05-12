"use strict";
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define(
    "category",
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
  category.associate = function (models) {
    category.belongsTo(models.library);
    category.hasMany(models.page);
  };
  return category;
};
