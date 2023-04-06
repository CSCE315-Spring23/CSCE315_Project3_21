 
const Order = require("./Order.js");
let order = new Order();

const addItemToOrder = async (request, response) => {
    const menuItem = request.query.menuitem;

    if (!menuItem) {
        response.status(400).json({error: "Please specify a menu item to add to order"});
        return;
    }

    await order.addMenuItem(menuItem);
    //const currentDate = new Date();
    //console.log(Date.now());
    response.status(200).json(order);
}

const removeItemFromOrder = async(request, response) => {
    const menuItem = request.query.menuitem;

    if (!menuItem) {
        response.status(400).json({error: "Please specify a menu item to remove order"});
        return;
    }

    await order.removeItem(menuItem);
    response.status(200).json(order);
}

const storeOrder = async (request, response) => {
    console.log("Creating an order and updating DB");
    response.status(200).json(order);
    await order.createOrder();
}

module.exports = {
    addItemToOrder,
    removeItemFromOrder,
    storeOrder
}
