"use strict";
module.exports = (sequelize, DataTypes) => {
  const example = sequelize.define(
    "example",
    {
      sequence: DataTypes.INTEGER,
      codeblock: {
        allowNull: false,
        type: DataTypes.STRING(2000),
      },
      output: {
        allowNull: false,
        type: DataTypes.STRING(2000),
      },
      codeWidth: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {}
  );
  example.associate = function (models) {
    example.belongsTo(models.page);
  };
  return example;
};
