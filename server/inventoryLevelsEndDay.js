const pool = require("./DB");

/* 
    Functon to add a zero to single digit numbers to ensure the timestamp will be properly formatted
*/
const padInt = (num) => {
    if (num < 10) {
        return "0" + num;
    }
    return num;
    };

/*
    The following updates the recommended reorder quantities for all inventory items
    Example query: pern-project-3.onrender.com/inventoryLevelsEndDay
*/
const getInventoryLevelsEndDayRecommended = (request, response) => {
    pool.query('SELECT * FROM inventory_item;', (error, results) => {
    if (error) {
        throw error;
    }
    let rows1 = results.rows;

    for(let i = 0; i < rows1.length; i++){
        let curr = rows1[i];
        console.log("The current item whose recommended quantity is being calculated: \n",curr);
        let recommended = (curr.maxquantity - curr.currentquantity) / curr.shipmentunit; 
        if(recommended == 0){
        recommended = curr.maxquantity/curr.shipmentunit;
        }else{
            let queryLn = "UPDATE inventory_item set recommendedreorder =" +recommended +"WHERE itemName = '" +rows1[i].itemname+"';";
            pool.query(queryLn, (error, results) => {
                if (error) {
                    throw error;
                }
                
            });
        }
    }    
    console.log('All reorder quantities were appropriately updated');
    response.status(200).json(rows1);
    });
};

/*
    query the table to get the restock orders where there is no arrived value specified
*/
const getInventoryLevelsEndDayPendingRestock = (request, response) => {
    pool.query('SELECT * from restock_order where arrived IS NULL;', (error, results) => {
    if (error) {
        throw error;
    }
    response.status(200).json(results.rows);
    });
};

/*
    process arrival of restock order by incrementing the current quantity, setting the arrival date in the restock_order table
    Example: pern-project-3.onrender.com/inventoryLevelsEndDayArrive?id=75
*/
const getInventoryLevelsEndDayRecordArrival = (request, response) => {
    const restockOrderIdUsrInput = request.query.id;
    if(!restockOrderIdUsrInput){
    response.status(400).json({error: 'ID not given'});
    }
    //get and format current date
    const date = new Date();
    const year = date.getFullYear();
    const monthIndex = padInt(date.getMonth()+1);
    const day = padInt(date.getDate());
    const hour = padInt(date.getHours());
    const min = padInt(date.getMinutes());
    const seconds = padInt(date.getSeconds());
    const formatted = `${year}-${monthIndex}-${day} ${hour}:${min}:${seconds}`;
    
    //send command to get information about the restock to inventory AND get all relevant inventory items 
    let selectSQLRestockToInventoryStr = "SELECT * from relationship_restocktoinventory where restockorder_key = (SELECT id from restock_order where id = "+restockOrderIdUsrInput+" AND arrived IS NULL);";
    pool.query(selectSQLRestockToInventoryStr, (error, results) => {
        if (error) {
            throw error;
        }
        let rows1 = results.rows;
        for(let i = 0; i < rows1.length; i++){
            let item = rows1[i].inventory_key;
            let restockQ = rows1[i].quantity;
            let selectFromInventoryStr = "SELECT shipmentunit FROM inventory_item WHERE itemname = '"+item+"';";
            pool.query(selectFromInventoryStr, (error, results) => {
                if (error) {
                    throw error;
                }
                let rows2 = results.rows;
                //initialize value with multiplied restock quantity (shipment units) and shipment unit (product units) conversion
                let restockQuantityAdjusted = restockQ * rows2[0].shipmentunit;
                //send command update each inventory item based on restock quantity
                let updateInventoryStr =  "UPDATE inventory_item SET currentquantity = currentquantity + "+restockQuantityAdjusted +" WHERE itemname = '"+item+"';";
                pool.query(updateInventoryStr, (error, results) => {
                    if (error) {
                        throw error;
                    }    
                    console.log(item,'was updated');
                });
            });
        }
    });

    //send command to update the restock order with arrived 
    let updateRestockArrivedStr = "UPDATE restock_order SET arrived = '"+ formatted+ "' where id ="+ restockOrderIdUsrInput+" AND arrived IS NULL;";
    pool.query(updateRestockArrivedStr, (error, results) => {
        if (error) {
            throw error;
        }
        
    });
    console.log('Order',restockOrderIdUsrInput,'was marked arrived at', formatted);//'YYYY-MM-DD hh:mm:ss'
    console.log('The order arrival process is complete for order',restockOrderIdUsrInput);
    response.status(200).send('Restock Order Process Completed Successfully, see console for more details');
};

/*
    create a new restock order 
    Example: pern-project-3.onrender.com/inventoryLevelsEndDayCompletePlaceRestock
*/
const getInventoryLevelsEndDayCompletePlaceRestock = (request, response) => {
    //see placeRestockOrderButton from project 2 for reference 
    //get and format todays date
    const date = new Date();
    const year = date.getFullYear();
    const monthIndex = padInt(date.getMonth()+1);
    const day = padInt(date.getDate());
    const hour = padInt(date.getHours());
    const min = padInt(date.getMinutes());
    const seconds = padInt(date.getSeconds());
    
    //create new order in restock_order with todays date
    let maxIdQuery = "SELECT Id FROM restock_order WHERE id=(SELECT max(id) FROM restock_order) LIMIT 1;";
    pool.query(maxIdQuery, (error, results) => {
        if (error) {
            throw error;
        }
        let id = (results.rows)[0].id+1;
        //console.log(id);

        const formatted = `${year}-${monthIndex}-${day} ${hour}:${min}:${seconds}`;
        let cmdStr = "INSERT INTO restock_order (id,created,arrived) VALUES ("+id+",'"+formatted+"',NULL);";
        pool.query(cmdStr, (error, results) => {
            if (error) {
                throw error;
            }
            console.log('Restock Order',id,'was created at', formatted);//'YYYY-MM-DD hh:mm:ss'

            //get the id for relationship_restock to inventory (because serial isn't working right)
            let maxIdQuery2 = "SELECT Id FROM relationship_restocktoinventory WHERE id=(SELECT max(id) FROM relationship_restocktoinventory) LIMIT 1;";
            pool.query(maxIdQuery2, (error, results) => {
                if (error) {
                    throw error;
                }
                //get all values from inventory_table table 
                let id2 = (results.rows)[0].id+1;
                //get all inventory items
                let inventoryQuery = "SElECT * FROM inventory_item;";
                pool.query(inventoryQuery,(error,results) => {
                    if(error){
                        throw error;
                    }
                    let inventoryRows = results.rows;
                    for(let i = 0; i < inventoryRows.length; i++){
                        //update the relationship table if there are any shipment units in the quantity
                        let updateRelationalTable = "INSERT INTO relationship_restocktoinventory (id, inventory_key, restockorder_key, quantity) VALUES("
                        +id2+",'"
                        +inventoryRows[i].itemname+"',"
                        +id+", '"
                        +inventoryRows[i].recommendedreorder
                        +"');";

                        if(inventoryRows[i].recommendedreorder > 0){
                            //console.log(updateRelationalTable);
                            id2++;
                            pool.query(updateRelationalTable,(error,results) =>{
                                if(error){
                                    throw error;
                                }
                                //insert into does not have any results to worry about
                                
                            });
                        }
                    }
                    console.log('All the appropriate inventory items were assosicated with the restock in the relationship table');
                });
            });
        });
    });
    response.status(200).send('InventoryLevelsEndDayCompletePlaceRestock Completed Successfully, see console for more details');
}

/*
    Generate Z report/ day summary and add it to the day_summary table
    Example: pern-project-3.onrender.com/inventoryLevelsEndDayCompleteDaySummary
*/
const getInventoryLevelsEndDayCompleteDaySummary = (request, response) => {
    //get and format todays date
    const date = new Date();
    const year = date.getFullYear();
    const monthIndex = padInt(date.getMonth()+1);
    const day = padInt(date.getDate());
    const hour = padInt(date.getHours());
    const min = padInt(date.getMinutes());
    const seconds = padInt(date.getSeconds());
    
    
    //send command to get the all orders after the last day summary was created
    let queryStr = "SELECT * from order_table where ordertimestamp > (SELECT max(daysumm_timestamp) from day_summary);";
    pool.query(queryStr, (error, results) => {
        if (error) {
            throw error;
        }
        let rows1 = results.rows;
        let totalDayPrice = 0;
        let totalNumOrders = rows1.length;
        for(let i = 0; i < rows1.length; i++){
            totalDayPrice+=rows1[i].totalprice;
        }
        const formatted = `${year}-${monthIndex}-${day} ${hour}:${min}:${seconds}`;
        let updateQueryStr = "INSERT INTO day_summary (daytotalsales, daytotalnumorders, daysumm_timestamp) VALUES ("+totalDayPrice+","+totalNumOrders+",'"+formatted+"');";
        console.log(updateQueryStr);
        pool.query(updateQueryStr, (error, results) => {
            if (error) {
                throw error;
            }
        });
    });

    response.status(200).send('InventoryLevelsEndDayCompleteDaySummary Completed Successfully, see console for more details');
}

/*
    Query the day summary table to get the most recent Z report
    Example: pern-project-3.onrender.com/ZReport
*/
const getZReport = (request, response) => {
    pool.query('SELECT * from day_summary where daysumm_timestamp = (SELECT max(daysumm_timestamp) from day_summary)', (error, results) => {
    if (error) {
        throw error;
    }
    response.status(200).json(results.rows);
    });
};



module.exports = {
    getInventoryLevelsEndDayRecommended,
    getInventoryLevelsEndDayPendingRestock,
    getInventoryLevelsEndDayRecordArrival,
    getInventoryLevelsEndDayCompletePlaceRestock,
    getInventoryLevelsEndDayCompleteDaySummary,
    getZReport,
};