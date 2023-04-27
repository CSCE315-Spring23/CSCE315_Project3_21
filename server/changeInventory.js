const pool = require("./DB");

/* helper methods */

/* DB interaction methods */
/*
    Submit name of inventory item you would like to view in the table; get all columns for that row.
    EXAMPLE QUERY IN POSTMAN (ensure that "GET" method is selected):
        http://localhost:3000/inventory/readInventoryItem/Lettuce
        http://localhost:3000/inventory/readInventoryItem/Waffle Potato Chips
        http://localhost:3000/inventory/readInventoryItem/Not an Inventory Item
        (no request body)
*/
async function readInventoryItem(request, response){
    try{
        console.log("The route is not broken.");
        // get parameters
            const {itemname} = request.body;
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

module.exports = {
    readInventoryItem
};