const pool = require("../DB");

class Order {
    constructor() {
        this.itemsOrdered = [];
    }

    async addMenuItem(menuItemKey) {
        console.log(menuItemKey);
        let abletoMake = true;
        // Query all of the inventory items used by the menu item ordered
        let inventoryquantity_Query = "SELECT inventoryitemkey,unitquantity FROM relationship_menutoinventory_unitquantities WHERE menuitemkey = '" + menuItemKey + "';";
        let inventoryResults = await pool.query(inventoryquantity_Query);
        let InvQrows = inventoryResults.rows;

        // Check the current quantity of every inventory item to see if we can itemsOrdered the menu item
        for (let i = 0; i < InvQrows.length; i++) {
            let currquantity_Query = "SELECT currentquantity FROM inventory_item_test WHERE itemname = '" + InvQrows[i].inventoryitemkey +  "';";
            let currquantityResults = await pool.query(currquantity_Query);
            let currQuantity = currquantityResults.rows[0].currentquantity;

            if (currQuantity < InvQrows[i].unitquantity) {
                console.log("Menu item not available: ", menuItemKey);
                console.log("Inventory item out of stock: ", InvQrows[i].inventoryitemkey);
                abletoMake = false;
                return;
            }
        }

        // If we have all of the required inventory quantities add the menu item to itemsOrdered
        if (abletoMake == true) {
            console.log("Item added to itemsOrdered: ", menuItemKey);
            this.itemsOrdered.push(menuItemKey);
            console.log(this.itemsOrdered);

            for (let i = 0; i < InvQrows.length; i++) {
                let inventoryUpdate = "UPDATE inventory_item_test SET currentquantity = currentquantity - " + InvQrows[i].unitquantity + " WHERE itemname = '" + InvQrows[i].inventoryitemkey +  "';";
                await pool.query(inventoryUpdate);
            }
        }

        
    }

    async createOrder() {
        
    }
}

module.exports = Order;