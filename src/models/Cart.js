const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  const Cart = sequelize.define("cart", {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true 
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  });
  Cart.associate = (models) => {
    Cart.belongsToMany(models.Product, { through: "product_cart" });
  };

  return Cart;
};
