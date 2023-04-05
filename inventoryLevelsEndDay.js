const pool = require("./DB");

const padInt = (num) => {
    if (num < 10) {
        return "0" + num;
    }
    return num;
    };

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


module.exports = {
    getInventoryLevelsEndDayRecommended,
    getInventoryLevelsEndDayRecordArrival,

};