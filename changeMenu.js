const pool = require("./DB");

/* helper methods */

/* GUI navigation methods */
/*
    switchtoManagerView() ("Back" button)
*/
/* DB interaction methods */
/*
    Submit name of menu item you would like to view in the table; get all columns for that row.
    EXAMPLE QUERY IN POSTMAN:
        http://localhost:3000/changeMenu/readMenuItem/Chicken Tortilla Soup
        http://localhost:3000/changeMenu/readMenuItem/Waffle Potato Chips
        http://localhost:3000/changeMenu/readMenuItem/Not a Menu Item
        (no request body)
*/
async function readMenuItem(request, response){
    try {
        // get parameters
            const {itemname} = request.params;
        // queries
            let query1 = "SELECT * FROM menu_item WHERE itemname = '"+ itemname+"';";
            let result1 = await pool.query(query1);
            if (result1.rowCount == '0'){
                response.status(200).json({message : ""+itemname+" is not a menu item."});
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
    }
};
/* Get the itemnames column of the menu_item table.
    EXAMPLE QUERY IN POSTMAN:
    http://localhost:3000/changeMenu/readitemnames
    (no request body)  
*/
const readMenuItemNames =(request, response) => {
    // build query
        let query = "SELECT itemname FROM menu_item;";
    // get query results
        pool.query(query, (error, results) => {
            if (error) {
            throw error;
            }
            response.status(200).json(results.rows);
        });
};
/* Get the restrictionname column of the dietary_restriction table.
    EXAMPLE QUERY IN POSTMAN:
    http://localhost:3000/changeMenu/readDietaryRestrictionNames
    (no request body)  
*/
const readDietaryRestrictionNames =(request, response) => {
    // build query
        let query = "SELECT restrictionname FROM dietary_restriction;";
    // get query results
        pool.query(query, (error, results) => {
            if (error) {
            throw error;
            }
            response.status(200).json(results.rows);
        });
};

/*
    If itemname is in menu item table, then update the entry.
    Else, create a new entry.

    EXAMPLE QUERIES IN POSTMAN:
        -create new menu item:
            http://localhost:3000/changeMenu/createOrUpdateMenuItem/Side Salad
            request body:
                {
                    "price": "499",
                    "category": "sides",
                    "imagelink": "https://www.chewboom.com/wp-content/uploads/2023/04/Chick-fil-A-Reverses-Course-Decides-To-Keep-Side-Salad-On-Menu-678x381.jpg",
                    "menutoinventory": "Lettuce: 20, Tomato: 6",
                    "menutodietaryrestriction": "vegan, vegetarian, gluten-free, dairy-free, nut-free"
                }
        -erase new menu item through command-line (undo the effects of the test):
            DELETE FROM menu_item WHERE itemname='Side Salad';
        -update menu item
            http://localhost:3000/changeMenu/createOrUpdateMenuItem/Chocolate Fudge Brownie
            request body:
            {
                "price": "225",
                "category": "dessert",
                "imagelink": "https://www.cfacdn.com/img/order/COM/Menu_Refresh/Treats/Treats%20PDP/031717_FudgeChunkBrownie_PDP.png",
                "menutoinventory": "
                "menutodietaryrestriction": "
            }
*/
async function createOrUpdateMenuItem(request, response){
    try{
        const {itemname} = request.params;
        const {price, category, imagelink, menutoinventory, menutodietaryrestriction} = request.body;
        // build first query
            let query = "SELECT COUNT(itemname) FROM menu_item WHERE itemname = '"+ itemname +"';";
        // execute first query, store results.
            let result = await pool.query(query);
        if( result.rows[0].count == '0'){
            // console.log("This item does not exist. It will be created.");
        }
        else if (result.rows[0].count == '1'){
            // console.log("This item exists. It will be updated.");
        }
        else{
            // throw Error('COUNT sql command returned unexpected result');
            console.log('COUNT sql command returned unexpected result');
        }
    }
    catch (err){
        console.error(err.message);
    }
};

module.exports = {
    readMenuItem,
    readMenuItemNames,
    readDietaryRestrictionNames,
    createOrUpdateMenuItem
};