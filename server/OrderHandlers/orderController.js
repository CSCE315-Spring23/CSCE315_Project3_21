 
const Order = require("./Order.js");
let order = new Order();

/**
 * Function to add a menu item to the order. It reads the menu item name from the request
 * body and calls the addMenuItem function on the Order. Sends Order object as a json response
 * @param {*} request 
 * @param {*} response 
 * @returns none
 */
const addItemToOrder = async (request, response) => {
    const menuItem = request.query.menuitem;

    if (!menuItem) {
        response.status(200).json({error: "Please specify a menu item to add to order"});
        return;
    }

    await order.addMenuItem(menuItem);
    //const currentDate = new Date();
    //console.log(Date.now());
    response.status(200).json(order);
}

/**
 * Function to remove a menu item from the order. It reads the menu item name from the request
 * body and calls the addMenuItem function on the Order. Sends Order object as a json response.
 * @param {*} request 
 * @param {*} response 
 * @returns none
 */
const removeItemFromOrder = async(request, response) => {
    const menuItem = request.query.menuitem;

    if (!menuItem) {
        response.status(200).json({error: "Please specify a menu item to remove order"});
        return;
    }

    await order.removeItem(menuItem);
    response.status(200).json(order);
}

/**
 * Functiom to get the current order information. Sends Order object as a json response.
 * @param {*} request 
 * @param {*} response 
 * @returns none
 */
const getOrder = async(request, response) => {
    //console.log(order);
    response.status(200).json(order);
}

/**
 * Function to create an order. Sends Order object as a json response
 * @param {*} request 
 * @param {*} response 
 */
const storeOrder = async (request, response) => {
    console.log("Creating an order and updating DB");
    await order.createOrder();
    response.status(200).json(order);
}

/**
 * Function to cancel the current order. Sends Order object as a json response.
 * @param {*} request 
 * @param {*} response 
 */
const cancelOrder = async (request, response) => {
    console.log("Cancelling order and resetting any inventory item quantities.");
    await order.cancelOrder();
    response.status(200).json(order);
}

module.exports = {
    addItemToOrder,
    removeItemFromOrder,
    storeOrder,
    getOrder,
    cancelOrder,
}
