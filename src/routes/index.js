const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const categories = require("./categories.js");
const products = require("./products.js")
const cart = require("./cart.js")





const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/categories', categories);
router.use('/products', products)
router.use('/cart', cart);


module.exports = router;