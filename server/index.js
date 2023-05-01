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

/*    -RESTOCK ORDER-     */
app.get('/inventoryLevelsEndDayArrive', dbInventoryLevels.getInventoryLevelsEndDayRecordArrival);
app.get('/inventoryLevelsEndDayCompletePlaceRestock', dbInventoryLevels.getInventoryLevelsEndDayCompletePlaceRestock);
app.get('/pendingRestock',dbInventoryLevels.getInventoryLevelsEndDayPendingRestock);

/*    -Z REPORT-     */
app.get('/inventoryLevelsEndDayCompleteDaySummary',dbInventoryLevels.getInventoryLevelsEndDayCompleteDaySummary);
app.get('/ZReport',dbInventoryLevels.getZReport);

/*    -ORDER FUNCTIONALITY-     */
const {addItemToOrder, storeOrder, removeItemFromOrder, getOrder, cancelOrder} = require('./OrderHandlers/orderController');
app.get('/addItem', addItemToOrder);
app.get('/removeItem', removeItemFromOrder);
app.get('/storeOrder', storeOrder);
app.get('/getOrder',getOrder);
app.get('/cancelOrder',cancelOrder);

/*    -X REPORT-     */
const getXreport = require('./Xreport');
app.get('/Xreport', getXreport);

/*    -QUERY MENU ITEMS FOR SERVER PAGE-     */
const {getMenu, getEntrees, getSides, getDesserts, getSomeMenuItems} = require('./queryMenu');
app.get('/ServerPage', getMenu);
app.get('/ServerPage/getEntrees', getEntrees);
app.get('/ServerPage/getSides', getSides);
app.get('/ServerPage/getDesserts', getDesserts);
app.get('/GetSomeMenuItems',getSomeMenuItems);

const dbExcessReport = require('./excessReport');
app.get('/excessReport',dbExcessReport.getExcessReport);

const dbZReport = require('./zReport');
app.get('/zReport',dbZReport.getZReport);

app.get('/getSalesReport', getsalesReport);
app.get('/menuCustomerView',getCustomerMenu);
app.get('/whatSalesTogether', getWhatSalesTogether);
app.get('/restockReport', getRestockReport);

/* MENU_ITEM CRUD TABLE */
const {readMenuItem, readMenuItems, readDietaryRestrictionNames, createOrUpdateMenuItem} = require('./changeMenu');
app.get('/readMenuItem', readMenuItem);
app.get('/readMenuItems', readMenuItems);
app.get('/readDietaryRestrictionNames', readDietaryRestrictionNames);
app.post('/createOrUpdateMenuItem', createOrUpdateMenuItem);

/* INVENTORY_ITEM CRUD TABLE */
const {readInventoryItem, readInventoryItems, createOrUpdateInventoryItem} = require('./changeInventory');
app.get('/readInventoryItem', readInventoryItem);
app.get('/readInventoryItems', readInventoryItems);
app.post('/createOrUpdateInventoryItem', createOrUpdateInventoryItem);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
