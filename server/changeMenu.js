const pool = require("./DB");

/* helper methods */

async function createMenuToInventoryRelationships(itemName, listRelationships) {
    // find insertion point as an index
        try{
            if (listRelationships==="" ){
                return;
            }

            let query_inspt = "SELECT id FROM relationship_menutoinventory_unitquantities ORDER BY id DESC LIMIT 1;"
            let result_inspt = await pool.query(query_inspt);
            if (parseInt(result_inspt.rows[0].id) == NaN || parseInt(result_inspt.rows[0].id) < 0){ /* TODO: add the ability to insert into an empty table */
                //console.log("Cannot insert in to menutoinventory unit quantity table; it is empty");
                throw Error("error in creating menu-to-inventory unit quantity relationships.");
            }
            h = 1 + result_inspt.rows[0].id;
        }
        catch (err) {
            //console.log(err.message);
            throw Error("error in creating menu-to-inventory unit quantity relationships.");
        }
    // parse tokens
        tokenArray = listRelationships.split(",");
    // make insertions
        for (let i in tokenArray){
            try{
                //console.log(tokenArray[i]);
                //console.log(tokenArray[i].split(":")[0]);
                //console.log(tokenArray[i].split(":")[1]);
                let query_ins = "INSERT INTO relationship_menutoinventory_unitquantities (id,menuitemkey,inventoryitemkey,unitquantity) VALUES("
                +"'"+ (h + i) + "', "
                +"'"+itemName+"', "
                +"'"+tokenArray[i].split(":")[0]+"', "
                +"'"+tokenArray[i].split(":")[1]+"'"
                +");";
                //console.log(query_ins);
                let result_ins = await pool.query(query_ins);
                i++;

            } catch (err) {
                console.error(err.message);
                throw Error("error in creating menu-to-inventory unit quantity relationships.");
            }
        }
};

async function createMenuToRestrictionsRelationships(itemName, listRelationships){
    // find insertion point as an index
        try{
            if (listRelationships==="" ){
                return;
            }

            let query_inspt = "SELECT id FROM relationship_menutodietaryrestriction ORDER BY id DESC LIMIT 1;"
            let result_inspt = await pool.query(query_inspt);
            if (parseInt(result_inspt.rows[0].id) == NaN || parseInt(result_inspt.rows[0].id) < 0){ /* TODO: test the case where table is empty */
                //console.log("Cannot insert into menu-to-dietary-restrictions table; it is empty.");
                throw Error("error in creating menu-to-dietary-restrictions relationships.");
            }
            h = 1 + result_inspt.rows[0].id;
        }
        catch (err) {
            console.error(err.message);
            throw Error("error in creating menu-to-dietary-restrictions relationships.");
        }
    // parse tokens
        tokenArray = listRelationships.split(",");
    // make insertions
        for (let i in tokenArray){
            try{
                let query_ins = "INSERT INTO relationship_menutodietaryrestriction (id,menuitemkey,dietaryrestrictionkey) VALUES("
                +"'"+ (h + i) + "', "
                +"'"+itemName+"', "
                +"'"+tokenArray[i]+"'"
                +");";
                //console.log(query_ins);
                //console.log(typeof listRelationships)
                let result_ins = await pool.query(query_ins);
                /* TODO: alert user when insertion fails */
                // console.log(result_ins.command);
                // console.log(result_ins.fields);
                // console.log(result_ins.oid);
                // console.log(result_ins.rowCount);
                // console.log(result_ins.rows);
            } catch (err) {
                console.error(err.message);
                throw Error("error in creating menu-to-dietary-restrictions relationships.");
            }
        }
};

/* DB interaction methods */
/*
    Submit name of menu item you would like to view in the table; get all columns for that row.
    EXAMPLE QUERY IN POSTMAN (ensure that "GET" method is selected):
        http://localhost:3000/changeMenu/readMenuItem/Chicken Tortilla Soup
        http://localhost:3000/changeMenu/readMenuItem/Waffle Potato Chips
        http://localhost:3000/changeMenu/readMenuItem/Not a Menu Item
        (no request body)
*/
async function readMenuItem(request, response){
    try {
        //console.log("The route is not broken.");
        // get parameters
            const itemname = request.query.name;
        // queries
            let query1 = "SELECT * FROM menu_item WHERE itemname = '"+ itemname+"';";
            let result1 = await pool.query(query1);
            if (result1.rowCount == '0'){
                response.status(500).json({message : ""+itemname+" is not a menu item."});
                return;
            }
            let price = result1.rows[0].price.toString();
            price = "$" + price.substring(0, price.length-2) + "." + price.substring(price.length-2);
        
            let query2 = "SELECT inventoryitemkey,unitquantity FROM relationship_menutoinventory_unitquantities WHERE menuitemkey = '"+ itemname+"';";
            let result2 = await pool.query(query2);
            let menutoinventory = "";
            for (let i = 0; i < result2.rowCount-1; i++){
                menutoinventory += result2.rows[i].inventoryitemkey + " : " + result2.rows[i].unitquantity + " , ";
            }
            if (result2.rowCount > 0){
                menutoinventory += result2.rows[result2.rowCount-1].inventoryitemkey + " : " + result2.rows[result2.rowCount-1].unitquantity;
            }

            let query3 = "SELECT dietaryrestrictionkey FROM relationship_menutodietaryrestriction WHERE menuitemkey = '"+ itemname+"';";
            let result3 = await pool.query(query3);
            let menutodietaryrestriction = "";
            for (let i = 0; i < result3.rowCount - 1; i++){
                menutodietaryrestriction += result3.rows[i].dietaryrestrictionkey + " , ";
            }
            if (result3.rowCount > 0){
                menutodietaryrestriction += result3.rows[result3.rowCount-1].dietaryrestrictionkey;
            }

            response.status(200).json({
                itemname : result1.rows[0].itemname,
                price : price,
                category : result1.rows[0].category,
                imagelink : result1.rows[0].imagelink,
                menutoinventory: menutoinventory,
                menutodietaryrestriction: menutodietaryrestriction
            });
    } catch (err) {
        console.error(err.message);
        response.status(500).json({message : "Could not read "+itemname});
        return;
    }
};
/* Get the entire menu_item table.
    EXAMPLE QUERY IN POSTMAN (ensure that GET method is selected):
    http://localhost:3000/changeMenu/readMenuItems // TODO: replace changeMenu part of all routes with the menu page name "menu"
    (no request body)  
*/
const readMenuItems =(request, response) => {
    // build query
        let query = "SELECT * FROM menu_item;";
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

/* Get the restrictionname column of the dietary_restriction table.
    EXAMPLE QUERY IN POSTMAN (ensure that "GET" method is selected):
    http://localhost:3000/changeMenu/readDietaryRestrictionNames
    (no request body)  
*/
const readDietaryRestrictionNames =(request, response) => {
    // build query
        let query = "SELECT restrictionname FROM dietary_restriction;";
    // get query results
    try{
        pool.query(query, (error, results) => {
            if (error) {
            throw error;
            }
            response.status(200).json(results.rows);
        });
    } catch (err){
        response.status(500).json({message : "Could not read dietary restriction names"});
        return;
    }
};

/*
    If itemname is in menu item table, then update the entry.
    Else, create a new entry.

    EXAMPLE QUERIES IN POSTMAN (ensure that POST method is selected):
        - create/update menu item with empty string name field (should return error)
            http://localhost:3000/changeMenu/createOrUpdateMenuItem
            request body (make sure to select "x-www-form-urlencoded"):
                {
                    price: $4.99
                }
        - check:
                http://localhost:3000/changeMenu/readMenuItem (request body : {itemname=Side Salad}
        - create menu item with name field specified but other fields are empty strings (should return error)
            http://localhost:3000/changeMenu/createOrUpdateMenuItem
            request body (make sure to select "x-www-form-urlencoded"):
                {
                    itemname: Side Salad
                }
        - check:
                http://localhost:3000/changeMenu/readMenuItem (request body : {itemname=Side Salad}
        -create new menu item:
            http://localhost:3000/changeMenu/createOrUpdateMenuItem
            request body (make sure to select "x-www-form-urlencoded"):
                {
                    itemname: Side Salad,
                    price: $4.99,
                    category: sides,
                    imagelink: https://www.chewboom.com/wp-content/uploads/2023/04/Chick-fil-A-Reverses-Course-Decides-To-Keep-Side-Salad-On-Menu-678x381.jpg,
                    menutoinventory: Lettuce: 20, Tomato: 6
                    menutodietaryrestriction: vegan, vegetarian, gluten-free, dairy-free, nut-free
                }
        - check:
                http://localhost:3000/changeMenu/readMenuItem (request body : {itemname=Side Salad}
        - update menu item with name field specified but other fields are empty strings
            http://localhost:3000/changeMenu/createOrUpdateMenuItem
            request body (make sure to select "x-www-form-urlencoded"):
                {
                    itemname: Side Salad
                }
        - check:
                http://localhost:3000/changeMenu/readMenuItem (request body : {itemname=Side Salad}
        - update menu item (only select field - price)
            http://localhost:3000/changeMenu/createOrUpdateMenuItem
            request body (make sure to select "x-www-form-urlencoded"):
            {
                itemname: Side Salad,
                price: $99.99,
            }
        - check:
                http://localhost:3000/changeMenu/readMenuItem (request body : {itemname=Side Salad}
        - update menu item (only select field - price, category)
            http://localhost:3000/changeMenu/createOrUpdateMenuItem
            request body (make sure to select "x-www-form-urlencoded"):
            {
                itemname: Side Salad,
                price: $4.99,
                category: desserts
            }
        - check:
                http://localhost:3000/changeMenu/readMenuItem (request body : {itemname=Side Salad}
        - update menu item (only select field - menutoinventory)
            http://localhost:3000/changeMenu/createOrUpdateMenuItem
                request body (make sure to select "x-www-form-urlencoded"):
                {
                    menutoinventory: Lettuce: 21, Tomato: 6
                }
            - check:
                    http://localhost:3000/changeMenu/readMenuItem (request body : {itemname=Side Salad}
        -update menu item
            http://localhost:3000/changeMenu/createOrUpdateMenuItem
            request body (make sure to select "x-www-form-urlencoded"):
            {
                itemname: Side Salad,
                price: $2.25,
                category: dessert,
                imagelink: "https://www.cfacdn.com/img/order/COM/Menu_Refresh/Treats/Treats%20PDP/031717_FudgeChunkBrownie_PDP.png",
                menutoinventory: ""
                menutodietaryrestriction: ""
            }
        - check:
                http://localhost:3000/changeMenu/readMenuItem (request body : {itemname=Side Salad}
        -update menu item
            http://localhost:3000/changeMenu/createOrUpdateMenuItem
            request body (make sure to select "x-www-form-urlencoded"):
            {
                itemname: Side Salad,
                price: $100.00
                category: ""
                imagelink: ""
                menutoinventory: ""
                menutodietaryrestriction: ""
            }
        - check:
                http://localhost:3000/changeMenu/readMenuItem (request body : {itemname=Side Salad}
        -update menu item
            http://localhost:3000/changeMenu/createOrUpdateMenuItem
            request body (make sure to select "x-www-form-urlencoded"):
            {
                itemname: Side Salad,
                price: ""
                category: ""
                imagelink: ""
                menutoinventory: ""
                menutodietaryrestriction: ""
            }
        - check:
                http://localhost:3000/changeMenu/readMenuItem (request body : {itemname=Side Salad}
        -update menu item
            http://localhost:3000/changeMenu/createOrUpdateMenuItem
            request body (make sure to select "x-www-form-urlencoded"):
            {
                itemname: Side Salad,
                price: $2.25,
                category: dessert,
                imagelink: "https://www.cfacdn.com/img/order/COM/Menu_Refresh/Treats/Treats%20PDP/031717_FudgeChunkBrownie_PDP.png",
                menutoinventory: "Lettuce: 20"
                menutodietaryrestriction: "vegan"
            }
        - check:
                http://localhost:3000/changeMenu/readMenuItem (request body : {itemname=Side Salad}
        -update menu item
            http://localhost:3000/changeMenu/createOrUpdateMenuItem
            request body (make sure to select "x-www-form-urlencoded"):
            {
                itemname: Side Salad,
                price: $2.25,
                category: dessert,
                imagelink: "https://www.cfacdn.com/img/order/COM/Menu_Refresh/Treats/Treats%20PDP/031717_FudgeChunkBrownie_PDP.png",
                menutoinventory: "Lettuce: 20, Tomato: 6, typo: 0, Chocolate Fudge Brownie: 0"
                menutodietaryrestriction: "vegan"
            }
        - check:
                http://localhost:3000/changeMenu/readMenuItem (request body : {itemname=Side Salad}
        -update menu item
            http://localhost:3000/changeMenu/createOrUpdateMenuItem
            request body (make sure to select "x-www-form-urlencoded"):
            {
                itemname: Side Salad,
                price: $2.25,
                category: dessert,
                imagelink: "https://www.cfacdn.com/img/order/COM/Menu_Refresh/Treats/Treats%20PDP/031717_FudgeChunkBrownie_PDP.png",
                menutoinventory: "Lettuce: 20, Tomato: 6, Chocolate Fudge Brownie: 0"
                menutodietaryrestriction: "typo"
            }
        - check:
                http://localhost:3000/changeMenu/readMenuItem (request body : {itemname=Side Salad}
        -erase new menu item through command-line (undo the effects of the test):
            DELETE FROM menu_item WHERE itemname='Side Salad';
            DELETE FROM relationship_menutoinventory_unitquantities WHERE menuitemkey = 'Side Salad';
            DELETE FROM relationship_menutodietaryrestriction WHERE menuitemkey = 'Side Salad';

*/
async function createOrUpdateMenuItem(request, response){   
    try{
        //console.log("The route is not broken.");
        const {itemname, price, category, imagelink, menutoinventory, menutodietaryrestriction} = request.body;
        let priceStr = String(price);
        priceStr = priceStr.substring(1,price.length-3) + priceStr.substring(price.length-2);
        if (itemname==="" ){
            //console.log('Please specify menu item name.');
            throw Error('Please specify menu item name.');
        }
        // build first query
            let query = "SELECT COUNT(itemname) FROM menu_item WHERE itemname = '"+ itemname +"';";
        // execute first query, store results.
            let result = await pool.query(query);
        if( result.rows[0].count == '0'){
            if (price===""  ||
                category===""  ||
                imagelink===""  ||
                menutoinventory===""  ||
                menutodietaryrestriction==="" 
                ){
                //console.log("Cannot create a new menu item with empty fields.");
                throw Error("Cannot create a new menu item with empty fields.");
            }
            //console.log(""+itemname+" does not exist. It will be created.");
            // create an entry in menu_item
                let query1 = "INSERT INTO menu_item (itemname, price, category, imagelink) VALUES ("
                +"'"+itemname+"',"
                +priceStr+","
                +"'"+category+"',"
                +"'"+imagelink+"'"
                +");";
                await pool.query(query1);

            // create entries in relationship_menutoinventory_unitquantities
                await createMenuToInventoryRelationships(itemname, menutoinventory);
            // create entries in relationship_menutodietaryrestriction
                 await createMenuToRestrictionsRelationships(itemname, menutodietaryrestriction);
            // return status
                response.status(200).json({message: "Successfully added "+ itemname});
        }
        else if (result.rows[0].count == '1'){
            //console.log(""+itemname+" exists. Nonempty fields will be updated.");

            // update the entry in menu_item if applicable
                if ((!(price==="")) ||
                (!(category==="")) ||
                (!(imagelink===""))){
                    let query_upd = "UPDATE menu_item SET ";
                    if (!(price==="")){
                        query_upd = query_upd + "price = "+ priceStr +",";
                    }
                    if (!(category==="")){
                        query_upd = query_upd +"category = "+"'"+category+"'"+",";
                    }
                    if (!(imagelink==="")){
                        query_upd = query_upd +"imagelink = "+"'"+imagelink+"'"+",";
                    }
                    // remove final comma
                        query_upd = query_upd.substring(0,query_upd.length-1);
                    query_upd = query_upd +" WHERE itemname = '"+ itemname +"';";
                    await pool.query(query_upd);
                }
            if (!(menutoinventory==="")){
                // delete entries in relationship_menutoinventory_unitquantities
                    let query_del1 = "DELETE FROM relationship_menutoinventory_unitquantities WHERE menuitemkey = '"
                    + itemname +"';"
                    await pool.query(query_del1);
                // create entries in relationship_menutoinventory_unitquantities
                    await createMenuToInventoryRelationships(itemname, menutoinventory);
            }
            if (!(menutodietaryrestriction==="")){
                // delete entries in relationship_menutodietaryrestriction
                    let query_del2 = "DELETE FROM relationship_menutodietaryrestriction WHERE menuitemkey = '"
                    + itemname +"';"
                    await pool.query(query_del2);
                // create entries in relationship_menutodietaryrestriction
                    await createMenuToRestrictionsRelationships(itemname, menutodietaryrestriction);
            }    
            // return status
                response.status(200).json({message: "updated "+itemname});
        }
        else{
            //console.log('COUNT sql command returned unexpected result');
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
    readMenuItem,
    readMenuItems,
    readDietaryRestrictionNames,
    createOrUpdateMenuItem
};