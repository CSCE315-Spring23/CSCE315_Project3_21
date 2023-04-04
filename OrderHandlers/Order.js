const pool = require("../DB");

class Order {
    constructor() {
        this.itemsOrdered = [];
        this.totalprice = 0;
    }

    async addMenuItem(menuItemKey) {
        //console.log(menuItemKey);
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

            let priceQuery = "SELECT price FROM menu_item WHERE itemname = '" + menuItemKey + "';"; 
            let priceResult = await pool.query(priceQuery);
            this.totalprice += priceResult.rows[0].price;

            for (let i = 0; i < InvQrows.length; i++) {
                let inventoryUpdate = "UPDATE inventory_item_test SET currentquantity = currentquantity - " + InvQrows[i].unitquantity + " WHERE itemname = '" + InvQrows[i].inventoryitemkey +  "';";
                await pool.query(inventoryUpdate);
            }
        }

        
    }

    async createOrder() {
        if (this.itemsOrdered.length < 1) {
            return;
        }
        let idQuery = "SELECT Id FROM ordertable_test WHERE id=(SELECT max(id) FROM ordertable_test)";
        let idResult = await pool.query(idQuery);
        let orderID = idResult.rows[0].id + 1;

        const newOrderQuery = {
            text: `INSERT INTO ordertable_test (id,ordertimestamp,totalprice) values ($1,(to_timestamp(${Date.now()} / 1000.0)), $2)`,
            //text: 'INSERT INTO ordertable_test (Id,ordertimestamp,totalprice) VALUES ($1, $2, $3)',
            values: [orderID,this.totalprice],
        }
        
        await pool.query(newOrderQuery);
    }
}

module.exports = Order;