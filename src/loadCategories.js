const { Category } = require("../db");

const path = require("path");
const fs = require("fs");

const loadCategory = async () => {
    try {
      const categories2 = await Category.findAll();
      if (categories2.length) {
        console.log("ya hay categorias");
        return;
      }
      const categories = JSON.parse(
        fs.readFileSync(path.join(__dirname, "./categories.json"))
      );
      await Category.bulkCreate(categories);
      console.log("Categories cargados");
    } catch (error) {
      console.log(error);
    }
  };
  module.exports = {
      loadCategory,
  }