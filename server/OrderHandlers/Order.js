const pool = require("../DB");

class Order {
    constructor() {
        this.itemsOrdered = [];
        this.totalprice = 0;
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
            console.log("Item added to order: ", menuItemKey);
            // this.itemsOrdered.push(menuItemKey);

            let priceQuery = "SELECT price FROM menu_item WHERE itemname = '" + menuItemKey + "';"; 
            let priceResult = await pool.query(priceQuery);
            this.itemsOrdered.push({
                itemname : menuItemKey,
                price: priceResult.rows[0].price/100.0
            })
            this.totalprice += priceResult.rows[0].price;
            console.log(this.itemsOrdered);

            for (let i = 0; i < InvQrows.length; i++) {
                let inventoryUpdate = "UPDATE inventory_item_test SET currentquantity = currentquantity - " + InvQrows[i].unitquantity + " WHERE itemname = '" + InvQrows[i].inventoryitemkey +  "';";
                await pool.query(inventoryUpdate);
            }
        } 
    }

    async removeItem(menuItemKey) {
        console.log("Item to be removed ", menuItemKey);

        let contains = false;
        for (let i = 0; i < this.itemsOrdered.length; i++) {
            if (this.itemsOrdered[i].itemname === menuItemKey) {
                console.log("Removed item: ", this.itemsOrdered[i]);
                this.itemsOrdered.splice(i, 1);
                contains = true;
                break;
            }
        }
        if (contains === false) {
            console.log("Order does not contain ", menuItemKey);
            return;
        }

        let inventoryquantity_Query = "SELECT inventoryitemkey,unitquantity FROM relationship_menutoinventory_unitquantities WHERE menuitemkey = '" + menuItemKey + "';";
        let inventoryResults = await pool.query(inventoryquantity_Query);
        let InvQrows = inventoryResults.rows;

        for (let i = 0; i < InvQrows.length; i++) {
            let inventoryUpdate = "UPDATE inventory_item_test SET currentquantity = currentquantity - " + InvQrows[i].unitquantity + " WHERE itemname = '" + InvQrows[i].inventoryitemkey +  "';";
            await pool.query(inventoryUpdate);
        }

        let priceQuery = "SELECT price FROM menu_item WHERE itemname = '" + menuItemKey + "';"; 
        let priceResult = await pool.query(priceQuery);
        this.totalprice -= priceResult.rows[0].price;
    }

    async createOrder() {
        if (this.itemsOrdered.length < 1) {
            return;
        }

        // Create a new ordertable entry
        let idQuery = "SELECT Id FROM ordertable_test WHERE id=(SELECT max(id) FROM ordertable_test)";
        let idResult = await pool.query(idQuery);
        let orderID = idResult.rows[0].id + 1;

        const newOrderQuery = {
            text: `INSERT INTO ordertable_test (id,ordertimestamp,totalprice) values ($1,(to_timestamp(${Date.now()} / 1000.0)), $2)`,
            values: [orderID, this.totalprice],
        }
        await pool.query(newOrderQuery);

        // Next create entries for every menu item ordered in order_to_menu table
        let orderIDQuery = "SELECT order_key FROM order_to_menu WHERE order_key=(SELECT max(order_key) FROM order_to_menu)";
        let orderIDResult = await pool.query(orderIDQuery);
        let newOrderID = orderIDResult.rows[0].order_key + 1;

        for (let i = 0; i < this.itemsOrdered.length; i++) {
            orderIDQuery = "SELECT id FROM order_to_menu WHERE id=(SELECT max(id) FROM order_to_menu)";
            orderIDResult = await pool.query(orderIDQuery);
            let newID = orderIDResult.rows[0].id + 1;

            const itemToOrderEntry = {
                text: 'INSERT INTO order_to_menu (id,order_key,menuitem_key,quantity) values ($1, $2, $3, $4)',
                values: [newID, newOrderID, this.itemsOrdered[i], 1],
            }

            await pool.query(itemToOrderEntry);
        }

        // Empty the order array
        this.itemsOrdered = [];
        this.totalprice = 0;
    }
}

module.exports = Order;