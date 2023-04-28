const { DataTypes, UUIDV4  } = require("sequelize");

module.exports = (sequelize) => {
  const Category = sequelize.define("category", {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Category.associate = (models) => {
    Category.belongsToMany(models.Product, { through: "category_product" });
  };

  return Category;
};