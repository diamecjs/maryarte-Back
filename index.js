const server = require('./src/app');
const { conn } = require('./src/db');
require("dotenv").config();


const port = process.env.PORT ;
// Syncing all the models at once
conn.sync({ force: false}).then(async () => {
  
    server.listen(port, () => {
        console.log(`servidor corriendo en puerto: ${port}`); // eslint-disable-line no-console
    });

});