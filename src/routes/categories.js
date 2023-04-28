const { Router } = require("express");
const { Category, Product } = require("../db");

const router = Router();


router.get("/", async (req, res) => {
  try {
    const allCategories = await Category.findAll({
        include: {
          model: Product,
          attributes: ['id', 'name', 'image', 'disponible', 'description', 'price'],
          include: {
            model: Category,
            attributes: ['name'],
          },
        },
      });
    res.status(200).json(allCategories);
  } catch (error) {
    res.status(400).json({ error: "No se encontró categoria" });
  }
});

module.exports = router;