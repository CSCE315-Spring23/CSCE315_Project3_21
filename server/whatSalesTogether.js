const pool = require("./DB");

/**
 *
 * @param {Number} num
 * @returns a string that is the number padded with a 0 if the number is less than 10
 */
const padInt = (num) => {
  if (num < 10) {
    return "0" + num;
  }
  return num;
};

/**
 *
 * @param {Object} item1 A menuItem object from menu_item table
 * @param {Object} item2 A menuItem object from menu_item table
 * @returns a string that by concatenating the two menu item names in alphabetical order
 */
const getKey = (item1, item2) => {
  let key1 = item1.menuitem_key;
  let key2 = item2.menuitem_key;

  if (key1.localeCompare(key2) < 0) {
    return key1 + "_" + key2;
  }
  return key2 + "_" + key1;
};

/**
 * The request body should be an object with the following properties:
 *
 * @param {Object} request- request object
 * @param {Object} request.body - request body
 * {
 *  start: int, *  0-23
 *  end: int, *  0-23
 *  salesWith: "menu_item_id" , * optional (default null)
 *  limit: int * optional number of results to return (default 100)
 * }
 *
 * @param {Object} response - response object
 */
const getWhatSalesTogether = (request, response) => {
  const body = request.query;
  //console.log(body);

  /**
   * Check if the request body has the required properties
   */
  if (!body.start || !body.end) {
    response.status(400).json({ error: "start and end are required" });
    return;
  }

  const start = parseInt(body.start);
  const end = parseInt(body.end);
  const salesWith = body.salesWith;
  let limit = body.limit || 100;
  limit = parseInt(limit);

  /**
  * the query is a bit complicated because we need to find the pairs of items
  * that are sold together in the same order
  
  * we have to understand the data model first
  * we have 2 tables: order_table, relationship_ordertomenu
  
  * order_table looks like this: (we only show the columns of our interest)
  *  id (order id) | ordertimestamp 
  *  1             | 2020-04-01 12:02:28
  *  2             | 2020-05-01 14:32:28
  *  3             | 2020-04-01 12:22:20

  * relationship_ordertomenu looks like this:
  *  order_key | menuitem_key
  *  1         | food item name 3
  *  1         | drink item name2
  *  2         | food item name2
  *  2         | Dessert item name
  *  3         | food item name3
  *  3         | Dessert item name
  *  3         | drink item name
  *  3         | drink item name2

  * from this relationship table, we can see that the order with id 1 has 2 items
  * these two items are `food item name 3` and `drink item name2` were sold together
  * similarly, the order with id 3 has 4 items that were sold together

  * so we have to extract the time range information from the order_table
  * and then we have to extract the menuitem_key information from the relationship table to find the pairs of items that were sold together
  * in that time range

  * To get the order id in the time range, we can use the following query:
  * 
  *     select id from order_table where 
  *               TO_CHAR(ordertimestamp,'HH24:MI:SS') >= '12:00:00' and TO_CHAR(ordertimestamp,'HH24:MI:SS')<='13:00:00'
  * 
  * This query will return the order id that are in the time range of 12:00:00 to 13:00:00
  * Here TO_CHAR(ordertimestamp,'HH24:MI:SS') is a function that converts the timestamp to a string with the format of HH24:MI:SS
  * HH24 means the hour in 24 hour format, MI means the minute, SS means the second
  * Because the original timestamp is in the format of YYYY-MM-DD HH24:MI:SS, we can use this function to format the timestamp to the format we want
  


  * With that query, we have a list of order id that are in the time range
  * Then we can use the following query to get the menuitem_key(the name of the food ite,) information from the relationship table
  * 
  *     select * from relationship_ordertomenu where order_key in (1,2,3) order by order_key
  * 
  * This query will return all the menuitem_key information for the orders with id 1,2,3

  * we combine the two queries together to get the menuitem_key information for the orders in the time range
  * 
  *     select * from relationship_ordertomenu where order_key in 
  *         (select id from order_table where 
  *             TO_CHAR(ordertimestamp,'HH24:MI:SS') >= '12:00:00' and TO_CHAR(ordertimestamp,'HH24:MI:SS')<='13:00:00')
  *         order by order_key
  * 
  * for the above mentioned  data, this query will return the following result:
  * 
  *     order_key | menuitem_key
  *     1         | food item name 3
  *     1         | drink item name2
  *     3         | food item name3
  *     3         | Dessert item name
  *     3         | drink item name
  *     3         | drink item name2

  * if we are interested for a particular food name that was included in the order we can further modify the query.
  * let's say we want the order items between 12:00:00 and 13:00:00 and we only want such orders that included `Dessert item name`
  * To do so we add another query
  * 
  *     select * from relationship_ordertomenu where order_key in 
  *         (
  *           (
  *             select id from order_table where 
  *             TO_CHAR(ordertimestamp,'HH24:MI:SS') >= '12:00:00' and TO_CHAR(ordertimestamp,'HH24:MI:SS')<='13:00:00'
  *           )
  *           INTERSECT 
  *           select order_key from relationship_ordertomenu where menuitem_key = `Dessert item name`
  *         )
  *         order by order_key
  * 

  * Now we have the menuitem_key information for the orders in the time range
  * now using the result from the above query, we can find the pairs of items that were sold together
  * we will use javascript to do this
  * We first iterate through the result and create pairs of items that has the same order_key
  * for example, for the above mentioned data, we will have the following pairs:
  *     1: [food item name 3, drink item name2]
  *     2: [food item name3, Dessert item name]
  *     3: [food item name3, drink item name]
  *     4: [food item name3, drink item name2]
  *     5: [Dessert item name, drink item name]
  *     6: [Dessert item name, drink item name2]
  *     7: [drink item name, drink item name2]

  * we then use a map to count the number of times each pair appears
  * for example, for the above mentioned data, we will have the following map:

  *     [food item name 3, drink item name2]: 2
  *     [food item name3, Dessert item name]: 1
  *     [food item name3, drink item name]: 1
  *     [Dessert item name, drink item name]: 1
  *     [Dessert item name, drink item name2]: 1
  *     [drink item name, drink item name2]: 1

  * we return the map as the result
  */

  /**
   * Query to get the pairs of items that were sold together
   */
  let query =
    "select * from relationship_ordertomenu where order_key in\n" + "(";

  let timeFilter =
    "select id from order_table where\n" +
    "TO_CHAR(ordertimestamp,'HH24:MI:SS') >= '" +
    padInt(start) +
    ":00:00'\n" +
    "and\n" +
    "TO_CHAR(ordertimestamp,'HH24:MI:SS')<='" +
    padInt(end) +
    ":00:00'\n";

  let menuFilter = "";


  /**
   * If salesWith is not null, we add another query to the timeFilter
   * The new query will return the order_key that has the menuitem_key == salesWith
   */ 
  if (salesWith) {
    timeFilter = "(" + timeFilter + ")";
    let menuFilterBase =
      " INTERSECT select order_key from relationship_ordertomenu where menuitem_key = ";

    menuFilter = menuFilterBase + "'" + salesWith + "'";
  }

  query += timeFilter + menuFilter + ")\norder by order_key\n;";

  /**
   * Execute the query
   */
  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }

    let rows = results.rows;
    //console.log({ln:rows.length, sd:rows.splice(0, 10),query});

    let pairs = {};

    /**
     * The query result is a list of order_key and menuitem_key 
     * Build the pairs with the same order_key
     */ 
    for (let i = 0; i < rows.length; i++) {
      for (let j = i + 1; j < rows.length; j++) {
        
        /**
         *only make pairs for the same order key items
         */ 

        if (rows[i].order_key != rows[j].order_key) {
          break;
        }

        /**
         * getKey is a function that returns a string that is used as the key for the map
         */
        let key = getKey(rows[i], rows[j]);

        /**
         * if the key already exists in the map, increment the count
         */
        if (pairs[key]) {
          pairs[key][0]++;
        } else {
          pairs[key] = [1, rows[i], rows[j]];
        }
      }
    }

    /**
     * sort the pairs by the count
     * the pairs with the highest count will be at the top
     */ 
    let sortedPairs = Object.keys(pairs).sort((a, b) => {
      return pairs[b][0] - pairs[a][0];
    });

    /**
     * limit the number of pairs to return
     */
    sortedPairs = sortedPairs.slice(0, limit);

    /**
     * create the final result
     * the final result is a list of objects
     * each object has the following properties:
     * count: the number of times the pair appeared
     * item1: the first item in the pair
     * item2: the second item in the pair
     */ 
    let finalPairs = [];
    for (let i = 0; i < sortedPairs.length; i++) {
      let pair = pairs[sortedPairs[i]];

      finalPairs.push({
        count: pair[0],
        item1: pair[1].menuitem_key,
        item2: pair[2].menuitem_key,
      });
    }

    response.status(200).json(finalPairs);
  });
};

module.exports = getWhatSalesTogether;
