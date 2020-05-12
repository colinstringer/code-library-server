"use strict";
module.exports = (sequelize, DataTypes) => {
  const library = sequelize.define("library", {}, {});
  library.associate = function (models) {
    library.belongsTo(models.user);
    library.hasMany(models.category);
  };
  return library;
};
