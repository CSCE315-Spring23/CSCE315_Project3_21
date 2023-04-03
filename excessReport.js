const pool = require("./DB");

/* full SQL command for inventory items (excludes calculation for multiple quantities per order)
    SELECT * from inventory_item where itemname in 
    (select inventoryitemkey from relationship_menutoinventory_unitquantities where menuitemkey in 
    (SELECT menuitem_key from relationship_ordertomenu where order_key in 
        (SELECT id from order_table where ordertimestamp >= '2023-02-28 22:50:00')));
    */

const getExcessReport = (request,response) => {
    const start = request.query.start;
    if(!start){
        response.status(400).json({error: 'Start timestamp not given'});
    }
    
    //send query to get all menuitems and their quantities for anything in the appropriate time range
    let query = "SELECT menuitem_key, quantity from relationship_ordertomenu where order_key in (SELECT id from order_table where ordertimestamp >= '";
    query += start;//"2023-02-28 22:50:00";
    query += "');";
    
    pool.query(query,(error,results) => {
    if(error) {
        throw error;
    }
    let rows = results.rows;
    
      pool.query('SELECT * from inventory_item;',(error,results) => {
            if(error) {
            throw error;
            }

        let rows2 = results.rows;
        let finalPairs = [];
        let inventoryItemArr = [];

        for(let i = 0; i <rows2.length; i++){
            let currInventory = rows2[i];
            let currObj = {
                inventoryItemKey: currInventory.itemname,
                tenPercent: currInventory.currentquantity * 0.1,
                currentCount: 0,
            }
            inventoryItemArr.push(currObj);
        }
        let rows3 = [];
        for(let i = 0;i<rows.length;i++){
            let currMenu = rows[i];
            let query = "SELECT * FROM relationship_menutoinventory_unitquantities where menuitemkey = '"+ currMenu.menuitem_key+"';";
            pool.query(query,(error,results) => {
            if(error) {
                throw error;
            }
            rows3 = results.rows;
                //find the appropriate inventory item 
                let index = inventoryItemArr.findIndex(x => x.inventoryItemKey == rows3[0].inventoryitemkey);
                let changeVal = rows3[0].unitquantity * currMenu.quantity +inventoryItemArr[index].currentCount;
                inventoryItemArr[index].currentCount = changeVal;

                //see if the inventory item already exists in final pairs 
                let indexFinal = finalPairs.findIndex(x => x.name == rows3[0].inventoryitemkey);

                //if does not exist and it is less than the ten percent
                if(indexFinal == -1 && inventoryItemArr[index].currentCount < inventoryItemArr[index].tenPercent){
                    finalPairs.push({
                        name: inventoryItemArr[index].inventoryItemKey,
                        valueUsed: inventoryItemArr[index].currentCount,
                    });
                }else {
                    //update the value if it has changed and is less than ten percent
                    if(inventoryItemArr[index].currentCount < inventoryItemArr[index].tenPercent && inventoryItemArr[index].currentCount != finalPairs[indexFinal].valueUsed){
                        finalPairs[indexFinal].valueUsed = inventoryItemArr[index].currentCount;
                    }
                }
                if(inventoryItemArr[index].currentCount > inventoryItemArr[index].tenPercent){
                    //remove 1 item from the final pairs
                    finalPairs.splice(indexFinal,1);
                }

                //execute only last time
                if(i == rows.length - 1){
                    response.status(200).json(finalPairs);
                }
            });
        }
        });
    });
};

module.exports = {
    getExcessReport,
};