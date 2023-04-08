const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
var cors = require('cors');
const app = express();
const port = 3001;

const db = require('./queries');
const getWhatSalesTogether = require('./whatSalesTogether');
const getsalesReport = require('./salesReport');
const getCustomerMenu = require('./menuCustomerView');
const getRestockReport = require('./restockReport');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const options = {
  origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(options));

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

//app.get('/employees', db.getEmployees);
//app.get('/employee', db.getEmployeeByPin);
/*
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);
*/
//app.get('/inventory_items', db.getInventoryItems);

const dbInventoryLevels = require('./inventoryLevelsEndDay');
app.get('/inventoryLevelsEndDay', dbInventoryLevels.getInventoryLevelsEndDayRecommended);
app.get('/inventoryLevelsEndDayArrive', dbInventoryLevels.getInventoryLevelsEndDayRecordArrival);

const dbExcessReport = require('./excessReport');
const {addItemToOrder} = require('./OrderHandlers/orderController');
const {storeOrder} = require('./OrderHandlers/orderController');
app.get('/excessReport',dbExcessReport.getExcessReport);


app.get('/salesReport', getsalesReport);
app.get('/menuCustomerView',getCustomerMenu);
app.get('/whatSalesTogether', getWhatSalesTogether);
app.get('/restockReport', getRestockReport);
app.get('/addItemToOrder', addItemToOrder);
app.get('/storeOrder', storeOrder);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
