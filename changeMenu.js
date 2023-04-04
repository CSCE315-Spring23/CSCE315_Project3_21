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
/*
    createOrUpdateMenuItem()
*/
const createOrUpdateMenuItem =(request, response) => {
    
};

module.exports = {
    readMenuItem,
    readMenuItemNames,
    createOrUpdateMenuItem
};