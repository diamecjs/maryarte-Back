const { Router } = require("express");
const { Product, Cart } = require("../../db");


const router = Router();

router.post("/:idProduct", async (req, res) => {
  const productId = req.params.idProduct;
  const quantity = req.body.quantity;

  const product = await Product.findByPk(productId);

  if (!product) {
    return res.status(404).send("Product not found");
  }

  const cart = await Cart.findOrCreate({ where: {} });
  await cart.addProduct(product, { through: { quantity: 1 } })

  cart.totalPrice += product.price * quantity;
  await cart.save();

  return res.status(200).json({ 
    message: "Product added to cart",
    cart: cart,
  });
});


  router.get("/", async (req, res) => {
    const cart = await Cart.findOne({ include: Product });
  
    if (!cart) {
      return res.status(404).send("Cart not found");
    }
  
    const products = cart.products.map((product) => {
      const { id, name, price, quantity } = product;
      return {
        id,
        name,
        price,
        quantity,
      };
    });
  
    const total = products.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  
    return res.send({ products, total });
  });

  module.exports = router;