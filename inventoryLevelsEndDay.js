const pool = require("./DB");
const getInventoryLevelsEndDayRecommended = (request, response) => {
    pool.query('SELECT * FROM inventory_item;', (error, results) => {
    if (error) {
        throw error;
    }
    let rows1 = results.rows;
    
    console.log(rows1[0].maxquantity - rows1[0].currentquantity);
    for(let i = 0; i < rows1.length; i++){
        let curr = rows1[i];
        console.log(curr);
        let recommended = curr.maxquantity - curr.currentquantity / curr.shipmentunit; 
        if(recommended == 0){
        recommended = curr.maxquantity/curr.shipmentunit;
        }else{
            /*let query = "UPDATE inventory_item set recommendedreorder =" +recommended +"WHERE itemName = '" +rows1[i].itemname+"';";
            pool.query(error, (error, results) => {
                if (error) {
                    throw error;
                }
            });*/
        }
    }    
    response.status(200).json(rows1);
    });
};


const getInventoryLevelsEndDayRecordArrival = (request, response) => {
    const restockOrderIdUsrInput = request.query.id;
    if(!id){
    response.status(400).json({error: 'ID not given'});
    }
    //get current date

    //send command to update the restock order with arrived 
    let updateRestockArrivedStr = "UPDATE restock_order SET arrived = '"+ date+ "' where id ="+ restockOrderIdUsrInput+"AND arrived IS NULL;";
    
    //send command to get information about the restock to inventory
    let selectSQLRestockToInventoryStr = "SELECT * from relationship_restocktoinventory where restockorder_key = (SELECT id from restock_order where id = "+restockOrderIdUsrInput+" AND arrived IS NULL);";
    
    //loop through restock to inventory 
    
    //send command to inventory table for a specific item 
    let selectInventoryConversionStr = "SELECT * FROM inventory_item WHERE itemname = '"+inventoryKey+"';";

    //initialize value with multiplied restock quantity (shipment units) and shipment unit (product units) conversion
    let restockQuantityAdjusted = restockQuantity * shipmentUnit;
    
    //send command update each inventory item based on restock quantity
    let updateInventoryStr =  "UPDATE inventory_item SET currentquantity = currentquantity + "+restockQuantityAdjusted +"WHERE itemname = '"+inventoryKey+"';";

    pool.query('SELECT * FROM inventory_item LIMIT 20', (error, results) => {
    if (error) {
        throw error;
    }
    response.status(200).json(results.rows);
    });
};


module.exports = {
    getInventoryLevelsEndDayRecommended,
    getInventoryLevelsEndDayRecordArrival,

};