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
        http://localhost:3000/changeMenu/readMenuItem?menuItemName=Chicken Tortilla Soup
        (no request body)
*/
const readMenuItem = (request, response) => {
    // get parameters
        const menuItemName = request.query.menuItemName;
        console.log(menuItemName);
        
        if (!request.query.menuItemName) {
            response.status(400).json({ error: "menu item name is required" });
            return;
        }
    // build query
        let query = "SELECT * FROM menu_item WHERE itemname = '"+ menuItemName+"';";
    // get query results
        pool.query(query, (error, results) => {
            if (error) {
            throw error;
            }
            response.status(200).json(results.rows);
        });
};
/* Get the itemnames column of the menu_item table.
    EXAMPLE QUERY IN POSTMAN:
    http://localhost:3000/changeMenu/readMenuItemNames
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

        const searchMenuItem = await pool.query("SELECT COUNT(itemname) FROM menu_item WHERE itemname = '$1';", [itemname]);
        console.log(searchMenuItem);
        response.status(200).json(results.rows);

        
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