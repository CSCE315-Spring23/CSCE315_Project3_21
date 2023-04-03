const pool = require("./DB");
const getExcessReport = (request,response) => {
    const start = request.query.start;
    if(!start){
    response.status(400).json({error: 'Start timestamp not given'});
    }

    /* full SQL command for inventory items (excludes calculation for multiple quantities per order)
    SELECT * from inventory_item where itemname in 
    (select inventoryitemkey from relationship_menutoinventory_unitquantities where menuitemkey in 
    (SELECT menuitem_key from relationship_ordertomenu where order_key in 
        (SELECT id from order_table where ordertimestamp >= '2023-02-28 22:50:00')));
    */

    //send query to get all menuitems and their quantities for anything in the appropriate time range
    let query = "SELECT menuitem_key, quantity from relationship_ordertomenu where order_key in (SELECT id from order_table where ordertimestamp >= '";
    query += start;//"2023-02-28 22:50:00";
    query += "');";
    
    pool.query(query,(error,results) => {
    if(error) {
        throw error;
    }
    let rows1 = results.rows;
    
      pool.query('SELECT * from inventory_item;',(error,results) => {
            if(error) {
            throw error;
            }

        let rows2 = results.rows;
        let finalPairs = [];
          //put inventory items and 10% val in hashmap
        const inventoryItemMap = new Map();
        const inventoryItemPercent = new Map();
        for(let i = 0; i <rows2.length; i++){
            let currInventory = rows2[i];
            let currItem = currInventory.itemname;
            let tenPercent = currInventory.currentquantity * 0.1;
            
            inventoryItemMap.set(currItem, 0);
            inventoryItemPercent.set(currItem, tenPercent);
        }
        
        for(let i = 0;i<rows1.length;i++){
            let currMenu = rows1[i];
            let query = "SELECT * FROM relationship_menutoinventory_unitquantities where menuitemkey = '"+ currMenu.menuitem_key+"';";
            pool.query(query,(error,results) => {
            if(error) {
                throw error;
            }
            let rows3 = results.rows;
              let changeVal = rows3[0].unitquantity * currMenu.quantity +inventoryItemMap.get(rows3[0].inventoryitemkey);
              console.log(changeVal);

              //Map does not allow value overwriting so currently deleting to update the values
              //Probably need to just switch data type
            //inventoryItemMap.set(rows3[0].inventoryitemkey, changeVal);

            
                inventoryItemMap.delete(rows3[0].inventoryitemkey);
                inventoryItemMap.set(rows3[0].inventoryitemkey, changeVal);
                //console.log(inventoryItemMap.get(rows3[0].inventoryitemkey));
            
            });
        }
        console.log(inventoryItemMap);

        for(let key of inventoryItemMap.keys()){
            //console.log(inventoryItemMap.get("Cup"));
            if(inventoryItemMap.get(key) < inventoryItemPercent.get(key)){ //&& inventoryItemMap.get(key)!=0){
            finalPairs.push({
                name: key,
                valueUsed: inventoryItemMap.get(key)
            });
            }
            //console.log(inventoryItemMap.get(key))
        }
        response.status(200).json(finalPairs);
        });
        
    });

};

module.exports = {
    getExcessReport,
};