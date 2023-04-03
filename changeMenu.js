const pool = require("./DB");

/* helper methods */

/* GUI navigation methods */
/*
    switchtoManagerView() ("Back" button)
*/
/* DB interaction methods */
/*
    submit name of menu item you would like to view in the table; get all columns for that row.
    EXAMPLE QUERY IN POSTMAN: http://localhost:3000/changeMenu?menuItemName=Chicken Tortilla Soup
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
        // let query = 'SELECT * FROM menu_item WHERE itemname = $1', [menuItemName]; 
    // build / execute query, get results
    let query = "SELECT * FROM menu_item WHERE itemname = '"+ menuItemName+"';";
        pool.query(query, (error, results) => {
            if (error) {
            throw error;
            }
            response.status(200).json(results.rows);
        });
};
/*
    menuItemNamesTable() (get the itemnames column of the menu_item table)
    createOrUpdateMenuItem()
*/

module.exports = {
    readMenuItem
};
// module.exports = menuItemNamesTable;
// module.exports = createOrUpdateMenuItem;