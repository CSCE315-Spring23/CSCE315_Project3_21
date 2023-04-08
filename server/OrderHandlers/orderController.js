 
const Order = require("./Order.js");
let order = new Order();

const addItemToOrder = async (request, response) => {
    const menuItem = request.query.menuitem || "Chick-fil-A Chicken Sandwich";
    await order.addMenuItem(menuItem);

    //const currentDate = new Date();
    //console.log(Date.now());
    response.status(200).json(order);
}


const storeOrder = async (request, response) => {
    response.status(200).json(order);

    await order.createOrder();
}

module.exports = {
    addItemToOrder,
    storeOrder
}
