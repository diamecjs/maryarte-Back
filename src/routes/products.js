const { Router } = require("express");
const { Product } = require("../db");



const router = Router();

router.post("/", async (req, res) => {
  const { name, image, description, disponible, category, price,quantity} = req.body;
  try {
    const product = await Product.create({
      name,
      image,
      description,
      disponible,
      category,
      price,
      quantity,
    });

    return res.status(200).send(product);
  } catch (error) {
    console.error("Error en POST /product:", error);
    return res.status(500).send({ message: "Error en el servidor" });
  }
});


router.get("/", async (req, res) => {
    
  try {
      const products = await Product.findAll();{
          where: { name: products }
      }

      if (!products) {
          return res.status(404).json({
              ok: false,
              msg: 'No se encontraron productos',
          });
      }

      res.status(200).json({
          ok: true,
          msg: 'Lista de productos',
          products,
      });

  } catch (error) {
      console.log(error);
      res.status(500).json({
          ok: false,
          msg: 'Por favor hable con el administrador',
      });
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontró el producto",
      });
    }

    res.status(200).json({
      ok: true,
      msg: "Producto encontrado",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
});


    router.delete("/:id", async (req, res) => {
        const { id } = req.params;
        try {
          await Product.destroy({
            where: { id },
          });
          res.send("Borrado.");
        } catch (error) {
          console.log("error en ruta delete product");
        }
      });

      router.put("/:id", async (req, res) => {
        const { id } = req.params;
        console.log("id received in the controller:", id);
        const datos = req.body;
        try {
          let change = await Product.update(datos, { where: { id } });
          return res.send(change);
        } catch (error) {
          console.log("Error en ruta put:", error);
          return res.status(500).send({ error: "Internal server error" });
        }
      });
      
    module.exports = router;