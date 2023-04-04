const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
var cors = require('cors');
const app = express();
const port = 3000;

const db = require('./queries');
const getWhatSalesTogether = require('./whatSalesTogether');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const options = {
  origin: 'https://localhost:3000',
}
app.use(cors(options));

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/employees', db.getEmployees);
app.get('/employee', db.getEmployeeByPin);
/*
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);
*/
app.get('/inventory_items', db.getInventoryItems);


const dbExcessReport = require('./excessReport');
app.get('/excessReport',dbExcessReport.getExcessReport);


app.get('/whatSalesTogether', getWhatSalesTogether);

const changeMenu = require('./changeMenu');
app.get('/changeMenu/readMenuItem/:itemname', changeMenu.readMenuItem);
app.get('/changeMenu/readMenuItemNames', changeMenu.readMenuItemNames);
app.get('/changeMenu/readDietaryRestrictionNames', changeMenu.readDietaryRestrictionNames);
app.put('/changeMenu/createOrUpdateMenuItem/:itemname', changeMenu.createOrUpdateMenuItem);


app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
