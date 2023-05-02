const pool = require("./DB");

/* helper methods */

/* DB interaction methods */
/*
    Submit name of inventory item you would like to view in the table; get all columns for that row.
    EXAMPLE QUERY IN POSTMAN (ensure that "GET" method is selected):
        http://localhost:3000/readInventoryItem?name=Regular Chicken Patty
        http://localhost:3000/readInventoryItem?name= 
        (no name specified)
*/
async function readInventoryItem(request, response){
    try{
        console.log("The route is not broken.");
        // get parameters
        const itemname = request.query.name;
        // query inventory item table
        let query1 = "SELECT * FROM inventory_item WHERE itemname = '"+ itemname+"';";
        let result1= await pool.query(query1);
        if (result1.rowCount == '0'){
            response.status(500).json({message : ""+itemname+" is not an inventory item."});
            return;
        }
        // no relationship tables to query
        // construct response
        response.status(200).json({
            itemname : result1.rows[0].itemname,
            shipmentunit : result1.rows[0].shipmentunit,
            shipmentunitstring : result1.rows[0].shipmentunitstring,
            currentquantity : result1.rows[0].currentquantity,
            maxquantity: result1.rows[0].maxquantity,
            recommendedreorder: result1.rows[0].recommendedreorder
        });
    } catch (err) {
        console.error(err.message);
        response.status(500).json({message: "Could not read "+itemname});
    }
}

/* Get the entire inventory_item table.
    EXAMPLE QUERY IN POSTMAN (ensure that GET method is selected):
    http://https://pern-project-3.onrender.com/readInventoryItems
*/
const readInventoryItems =(request, response) => {
    // build query
        let query = "SELECT * FROM inventory_item;";
    // get query results
        try{
            pool.query(query, (error, results) => {
                if (error) {
                throw error;
                }
                response.status(200).json(results.rows);
            });
        } catch (err) {
            response.status(500).json({message : "Could not read menu item names"});
            return;
        }
};

/*
Pseudocode for the function below
If itemname is in menu item table, then update the entry.
Else, create a new entry.

EXAMPLE QUERIES IN POSTMAN (ensure that POST method is selected):
- create/update menu item with empty string name field (should return error)
http://localhost:3000/createOrUpdateInventoryItem
    request body (make sure to select "x-www-form-urlencoded"):
        {
        }
- check:
        http://localhost:3000/inventory/readInventoryItem (request body : {itemname=Soup Cracker Packet}
- create inventory item with name field specified but other fields are empty strings (should return error)
    http://localhost:3000/inventory/createOrUpdateInventoryItem
    request body (make sure to select "x-www-form-urlencoded"):
        {
            itemname: Soup Cracker Packet
        }
- check:
        http://localhost:3000/inventory/readInventoryItem (request body : {itemname=Soup Cracker Packet}
- create new inventory item
    http://localhost:3000/inventory/createOrUpdateInventoryItem
    request body (make sure to select "x-www-form-urlencoded"):
        {
            itemname: Soup Cracker Packet
            shipmentunit: 50
            shipmentunitstring: 1 box of 50 packets
            currentquantity: 2
            maxquantity: 2
            recommendedreorder: 0
        }
- check:
        http://localhost:3000/inventory/readInventoryItem (request body : {itemname=Soup Cracker Packet}
- update menu item with name field specified but other fields are empty strings
    http://localhost:3000/inventory/createOrUpdateInventoryItem
    request body (make sure to select "x-www-form-urlencoded"):
        {
            itemname: Soup Cracker Packet
        }
- check:
        http://localhost:3000/inventory/readInventoryItem (request body : {itemname=Soup Cracker Packet}
- update menu item (only select fields)
    http://localhost:3000/inventory/createOrUpdateInventoryItem
    request body (make sure to select "x-www-form-urlencoded"):
        {
            itemname: Soup Cracker Packet
            shipmentunit: 100
            shipmentunitstring: 1 box of 100 packets
        }
- check:
        http://localhost:3000/inventory/readInventoryItem (request body : {itemname=Soup Cracker Packet}
- update menu item (all fields)
    http://localhost:3000/inventory/createOrUpdateInventoryItem
    request body (make sure to select "x-www-form-urlencoded"):
        {
            itemname: Soup Cracker Packet
            shipmentunit: 50
            shipmentunitstring: 1 box of 50 packets
            currentquantity: 2
            maxquantity: 2
            recommendedreorder: 0
        }
- check:
        http://localhost:3000/inventory/readInventoryItem (request body : {itemname=Soup Cracker Packet}
- erase new inventory item through command-line (undo the effects of the test)
        DELETE FROM inventory_item WHERE itemname='Soup Cracker Packet';
*/
async function createOrUpdateInventoryItem(request, response){
    try{
        console.log("The route is not broken");
        const {itemname, shipmentunit, shipmentunitstring, currentquantity, maxquantity, recommendedreorder} = request.body;
        
        // if itemname is not specified, return error.
            if (itemname==="" ){
                throw Error('Please specify inventory item name.');
            }
        // determine whether inventory item exists
            // build first query
                let query = "SELECT COUNT(itemname) FROM inventory_item WHERE itemname = '"+ itemname +"';";
            // execute first query, store results.
                let result = await pool.query(query);
        // if inventory item name does not exist
        if( result.rows[0].count == '0'){
            // if there is an empty field, return error.
                if (shipmentunit===""  ||
                    shipmentunitstring===""  ||
                    currentquantity===""  ||
                    maxquantity===""  ||
                    recommendedreorder==="" ){
                    throw Error("Cannot create a new menu item with empty fields.");
                }
            console.log(""+itemname+" does not exist. It will be created.");
            // else
                // create an entry in inventory_item
                    let query1 = "INSERT INTO inventory_item (itemname, shipmentunit, shipmentunitstring, currentquantity, maxquantity, recommendedreorder) VALUES ("
                    +"'"+itemname+"',"
                    +shipmentunit+","
                    +"'"+shipmentunitstring+"',"
                    +currentquantity+","
                    +maxquantity+","
                    +recommendedreorder
                    +");";
                    console.log(query1); // TODO: remove
                    await pool.query(query1);
                // return status
                response.status(200).json({message: "Successfully added "+ itemname});
        }
        // if inventory item name does exist
        else if (result.rows[0].count == '1'){
            console.log(""+itemname+" exists. Nonempty fields will be updated.");
            // if at least one field will be updated
                if (
                    !(shipmentunit==="") ||
                    !(shipmentunitstring==="") ||
                    !(currentquantity==="") ||
                    !(maxquantity==="") ||
                    !(recommendedreorder==="")
                ){
                    // build update query one field at a time.
                        let query_upd = "UPDATE inventory_item SET ";
                        if (!(shipmentunit==="")){
                            query_upd = query_upd + "shipmentunit = "+ shipmentunit +",";
                        }
                        if (!(shipmentunitstring==="")){
                            query_upd = query_upd +"shipmentunitstring = "+"'"+shipmentunitstring+"'"+",";
                        }
                        if (!(currentquantity==="")){
                            query_upd = query_upd + "currentquantity = "+ currentquantity +",";
                        }
                        if (!(maxquantity==="")){
                            query_upd = query_upd + "maxquantity = "+ maxquantity +",";
                        }
                        if (!(recommendedreorder==="")){
                            query_upd = query_upd + "recommendedreorder = "+ recommendedreorder +",";
                        }
                        // remove final comma
                            query_upd = query_upd.substring(0,query_upd.length-1);
                        query_upd = query_upd +" WHERE itemname = '"+ itemname +"';";
                    // execute update query
                        await pool.query(query_upd);
                }
                // return status
                response.status(200).json({message: "updated "+itemname});
        }
        else{
            throw Error('COUNT sql command returned unexpected result');
        }
    }
    catch (err){
        console.error(err.message);
        response.status(500).json({message: err.message});
        return;
    }
};

module.exports = {
    readInventoryItem,
    readInventoryItems,
    createOrUpdateInventoryItem
};