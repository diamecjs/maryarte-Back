const server = require('./src/app');
const { conn } = require('./src/db');
require("dotenv").config();


const {
    loadCategory,
   } = require("./src/loadCategories");
   

const port = process.env.PORT ;

conn.sync({ force: false}).then(async () => {
    loadCategory();
    server.listen(port, () => {
        console.log(`servidor corriendo en puerto: ${port}`); 
    });

});