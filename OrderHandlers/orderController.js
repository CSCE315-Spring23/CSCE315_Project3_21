 
const Order = require("./Order.js");
let order = new Order();

const addItemToOrder = async (request, response) => {
    const menuItem = request.query.menuitem || "Chick-Fil-A Chicken Sandwich";
    await order.addMenuItem(menuItem);

    response.status(200).json(order);
}


const storeOrder = async (request, response) => {
    
}
module.exports = addItemToOrder;