const server = require('./src/app');
const { conn } = require('./src/db');
require("dotenv").config();

const { loadCategory } = require("./src/loadCategories");

const port = process.env.PORT || 3000;

conn.sync({ force: false })
    .then(async () => {
        try {
            await loadCategory();
            server.listen(port, () => {
                console.log(`Servidor corriendo en puerto: ${port}`);
            });
        } catch (error) {
            console.error('Error durante la carga de categorías:', error);
        }
    })
    .catch((error) => {
        console.error('Error durante la sincronización de la base de datos:', error);
    });
